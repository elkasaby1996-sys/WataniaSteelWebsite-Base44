import { supabase } from '@/lib/supabaseClient';

export const createContactRequest = async (formData) => {
  const payload = {
    contact_name: formData.name,
    contact_email: formData.email || null,
    contact_phone: formData.phone,
    company_name: formData.company || null,
    subject: formData.subject || null,
    message: formData.message,
    status: 'new',
  };

  const insertContactRequest = async () =>
    supabase
      .from('contact_requests')
      .insert(payload)
      .select('id')
      .single();

  let { data: contactRequest, error } = await insertContactRequest();

  if (error) {
    const message = error.message?.toLowerCase() ?? '';
    if (message.includes('row-level security')) {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        const { error: anonError } = await supabase.auth.signInAnonymously();
        if (!anonError) {
          ({ data: contactRequest, error } = await insertContactRequest());
        }
      }
    }
  }

  if (error) {
    const message = error.message?.toLowerCase() ?? '';
    if (message.includes('row-level security')) {
      throw new Error(
        'Contact submission is blocked by database security rules. Please enable anonymous sign-in or update the contact_requests RLS policy.'
      );
    }
    throw new Error(error.message);
  }

  return contactRequest;
};

export const fetchContactRequests = async () => {
  const { data, error } = await supabase
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};
