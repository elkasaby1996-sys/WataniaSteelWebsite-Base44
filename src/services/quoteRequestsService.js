import { supabase } from '@/lib/supabaseClient';

const generateQuoteRequestNumber = () => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `QR-${datePart}-${randomPart}`;
};

export const createQuoteRequest = async ({ formData, files }) => {
  const requestNumber = generateQuoteRequestNumber();
  const payload = {
    request_number: requestNumber,
    customer_name: formData.customer_name,
    customer_email: formData.customer_email || null,
    customer_phone: formData.customer_phone,
    company_name: formData.company_name || null,
    project_name: formData.project_name || null,
    service_type: formData.service_type || null,
    description: formData.description || null,
    quantity_estimate: formData.quantity_estimate || null,
    urgency: formData.urgency || 'standard',
    status: 'new',
  };

  const insertQuote = async () =>
    supabase
      .from('quote_requests')
      .insert(payload)
      .select('id, request_number')
      .single();

  let { data: quoteRequest, error: quoteError } = await insertQuote();

  if (quoteError) {
    const message = quoteError.message?.toLowerCase() ?? '';
    if (message.includes('row-level security')) {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        const { error: anonError } = await supabase.auth.signInAnonymously();
        if (!anonError) {
          ({ data: quoteRequest, error: quoteError } = await insertQuote());
        }
      }
    }
  }

  if (quoteError) {
    const message = quoteError.message?.toLowerCase() ?? '';
    if (message.includes('row-level security')) {
      throw new Error(
        'Quote submission is blocked by database security rules. Please enable anonymous sign-in or update the quote_requests RLS policy.'
      );
    }
    throw new Error(quoteError.message);
  }

  const uploadErrors = [];

  if (files?.length) {
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${quoteRequest.id}/${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('quote-request-files')
        .upload(filePath, file);

      if (uploadError) {
        uploadErrors.push(`Failed to upload ${file.name}`);
        continue;
      }

      const { error: fileRowError } = await supabase.from('quote_request_files').insert({
        quote_request_id: quoteRequest.id,
        file_path: filePath,
        file_name: file.name,
        mime_type: file.type,
      });
      if (fileRowError) {
        uploadErrors.push(`Failed to save ${file.name}`);
      }
    }
  }

  return { quoteRequest, uploadErrors };
};

export const fetchQuoteRequests = async () => {
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*, quote_request_files(*)')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const getQuoteRequestFileUrl = async (filePath, expiresIn = 3600) => {
  const { data, error } = await supabase.storage
    .from('quote-request-files')
    .createSignedUrl(filePath, expiresIn);
  if (error) {
    throw new Error(error.message);
  }
  return data?.signedUrl || null;
};
