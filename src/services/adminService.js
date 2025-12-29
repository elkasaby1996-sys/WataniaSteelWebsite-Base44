import { supabase } from '@/lib/supabaseClient';

export const signInAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(error.message);
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (profile?.role !== 'admin') {
    await supabase.auth.signOut();
    throw new Error('Your account does not have admin access.');
  }

  return { user: data.user, profile };
};

export const signOutAdmin = async () => {
  await supabase.auth.signOut();
};

export const fetchAdminProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single();
  if (!data || data.role !== 'admin') return null;
  return { user, profile: data };
};

export const fetchAdminProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*)')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const saveProduct = async (payload) => {
  const { data, error } = await supabase
    .from('products')
    .upsert(payload)
    .select('*')
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const removeProduct = async (productId) => {
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (error) {
    throw new Error(error.message);
  }
};

export const saveVariant = async (payload) => {
  const { data, error } = await supabase
    .from('product_variants')
    .upsert(payload)
    .select('*')
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const removeVariant = async (variantId) => {
  const { error } = await supabase.from('product_variants').delete().eq('id', variantId);
  if (error) {
    throw new Error(error.message);
  }
};

export const uploadProductImage = async (productId, file) => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${productId}/${crypto.randomUUID()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);
  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(filePath);
  const { data, error } = await supabase
    .from('product_images')
    .insert({ product_id: productId, image_url: publicUrl.publicUrl })
    .select('*')
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const setPrimaryImage = async (productId, imageUrl) => {
  const { error } = await supabase.from('products').update({ primary_image_url: imageUrl }).eq('id', productId);
  if (error) {
    throw new Error(error.message);
  }
};

export const removeProductImage = async (imageId, imageUrl) => {
  const filePath = imageUrl.split('/product-images/')[1];
  if (filePath) {
    await supabase.storage.from('product-images').remove([filePath]);
  }
  const { error } = await supabase.from('product_images').delete().eq('id', imageId);
  if (error) {
    throw new Error(error.message);
  }
};

export const seedSampleProducts = async () => {
  const { data: existing, error } = await supabase
    .from('products')
    .select('id')
    .limit(1);
  if (error) {
    throw new Error(error.message);
  }
  if (existing?.length) {
    return { created: false };
  }

  const { data: rebar, error: rebarError } = await supabase
    .from('products')
    .insert({
      name: 'Rebar B500B',
      slug: 'rebar-b500b',
      category: 'rebar',
      description: 'Standard B500B reinforcement bars in multiple diameters.',
      active: true,
    })
    .select('*')
    .single();
  if (rebarError) {
    throw new Error(rebarError.message);
  }

  const diameters = [8, 10, 12, 14, 16, 18, 20, 22, 25, 32];
  const variants = diameters.map((diameter, index) => ({
    product_id: rebar.id,
    diameter_mm: diameter,
    unit_type: 'ton',
    price_qr: 2350 + index * 25,
    stock_qty: 25,
    grade: 'B500B',
    active: true,
  }));
  const { error: variantError } = await supabase.from('product_variants').insert(variants);
  if (variantError) {
    throw new Error(variantError.message);
  }

  return { created: true };
};
