import { supabase } from '@/lib/supabaseClient';

export const fetchProductsWithVariants = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*)')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((product) => ({
    ...product,
    product_variants: (product.product_variants || []).filter((variant) => variant.active),
    product_images: product.product_images || [],
  }));
};
