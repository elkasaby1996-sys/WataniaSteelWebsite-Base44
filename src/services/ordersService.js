import { supabase } from '@/lib/supabaseClient';

const generateOrderNumber = () => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `WS-${datePart}-${randomPart}`;
};

export const createManualOrder = async ({
  formData,
  items,
  orderType,
  deliveryFee,
  expressFee,
  cutAndBendFee,
  totalWeightKg,
  boqFile,
}) => {
  const orderNumber = generateOrderNumber();
  let boqUploadError = null;
  const orderPayload = {
    order_number: orderNumber,
    source: 'manual',
    customer_email: formData.customer_email || null,
    company_name: formData.company_name || null,
    contact_name: formData.customer_name,
    phone: formData.customer_phone,
    delivery_type: formData.delivery_method,
    delivery_address: formData.delivery_address || null,
    preferred_delivery_date: formData.delivery_date || null,
    payment_method: formData.payment_method,
    express: formData.is_express,
    notes: formData.notes || null,
    status: 'pending_review',
    total_weight_kg: totalWeightKg,
    subtotal_qr: 0,
    delivery_fee_qr: deliveryFee,
    express_fee_qr: expressFee,
    grand_total_qr: deliveryFee + expressFee + cutAndBendFee,
  };

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderPayload)
    .select('id, order_number')
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  const itemType = orderType === 'straight' ? 'straight_bar' : 'custom';
  const orderItemsPayload = items.map((item) => ({
    order_id: order.id,
    item_type: itemType,
    diameter_mm: item.diameter,
    length_m: item.length,
    qty: item.quantity,
    weight_kg: item.weightKg,
    notes: item.shape || null,
  }));

  if (orderItemsPayload.length > 0) {
    const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);
    if (itemsError) {
      throw new Error(itemsError.message);
    }
  }

  if (boqFile) {
    const fileExt = boqFile.name.split('.').pop();
    const filePath = `${order.id}/${crypto.randomUUID()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('order-files')
      .upload(filePath, boqFile);
    if (uploadError) {
      boqUploadError = 'BOQ upload failed due to storage permissions. The order was submitted without the file.';
    } else {
      const { error: fileRowError } = await supabase.from('order_files').insert({
        order_id: order.id,
        file_path: filePath,
        file_name: boqFile.name,
        mime_type: boqFile.type,
      });
      if (fileRowError) {
        boqUploadError = 'BOQ upload failed to save the file record. The order was submitted without the file.';
      }
    }
  }

  return { order, boqUploadError };
};

export const fetchOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const fetchOrderDetails = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), order_files(*)')
    .eq('id', orderId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateOrderStatus = async (orderId, status) => {
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
  if (error) {
    throw new Error(error.message);
  }
};
