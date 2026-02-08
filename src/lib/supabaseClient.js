import { createClient } from '@supabase/supabase-js';

// These will come from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Basic check — remove this in production
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key! Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,     // keeps login state across refreshes
    autoRefreshToken: true,
  },
});

// Helper: Get all products
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  return data || [];
}

// Helper: Get products by category
export async function getProductsByCategory(category) {
  if (category === 'all' || !category) return getAllProducts();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Helper: Upload image and return public URL
export async function uploadProductImage(file) {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')           // ← your bucket name
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw uploadError;
  }

  // Get public URL (since bucket is public)
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Helper: Add new product
export async function addProduct(productData, imageFile) {
  let imageUrl = null;
  if (imageFile) {
    imageUrl = await uploadProductImage(imageFile);
  }

  const { data, error } = await supabase
    .from('products')
    .insert([{ ...productData, image_url: imageUrl }])
    .select();

  if (error) throw error;
  return data[0];
}

// Helper: Update product
export async function updateProduct(id, productData, imageFile) {
  let imageUrl = productData.image_url; // keep old if no new file

  if (imageFile) {
    imageUrl = await uploadProductImage(imageFile);
  }

  const { data, error } = await supabase
    .from('products')
    .update({ ...productData, image_url: imageUrl })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}

// Helper: Delete product
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}