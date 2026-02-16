import { createClient } from "@supabase/supabase-js";

// These will come from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Basic check — remove this in production
if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key! Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // keeps login state across refreshes
    autoRefreshToken: true,
  },
});

// Helper: Get all products
export async function getAllProducts() {
  const { data, error } = await supabase.from("products_v_2").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  return data || [];
}

// Helper: Get products by category
export async function getProductsByCategory(category) {
  if (category === "all" || !category) return getAllProducts();

  const { data, error } = await supabase.from("products_v_2").select("*").eq("category", category).order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Helper: Upload image and return public URL
export async function uploadProductImage(file) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images") // ← your bucket name
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw uploadError;
  }

  // Get public URL (since bucket is public)
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return publicUrl;
}

//////////////////////////////////////add image for custom order table
//////////////////////////////////////add image for custom order table
//////////////////////////////////////add image for custom order table

// Helper: Upload image and return public URL
export async function uploadCustomImage(file) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images") // ← your bucket name
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw uploadError;
  }

  // Get public URL (since bucket is public)
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return publicUrl;
}

//////////////////////////////////////add image for custom order table
//////////////////////////////////////add image for custom order table
//////////////////////////////////////add image for custom order table

// Helper: Add new product
export async function addProduct(productData, imageFile) {
  let imageUrl = null;
  if (imageFile) {
    imageUrl = await uploadProductImage(imageFile);
  }

  const { data, error } = await supabase
    .from("products_v_2")
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
    .from("products_v_2")
    .update({ ...productData, image_url: imageUrl })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

// Helper: Delete product
export async function deleteProduct(id) {
  const { error } = await supabase.from("products_v_2").delete().eq("id", id);

  if (error) throw error;
}

///////////////////////////////Newletter
///////////////////////////////Newletter
///////////////////////////////Newletter

export async function subscribe(user_email) {
  const { data, error } = await supabase.from("newsletter_subscribers").insert([{ user_email }]);

  if (error) {
    console.error(error.message);
  } else {
    console.log("Subscribed successfully");
  }
}

///////////////////////////////Newletter
///////////////////////////////Newletter
///////////////////////////////Newletter
//
//
//
//
//
//
//
//
//
//
//
////////////////////////////////////Custom Order
////////////////////////////////////Custom Order
////////////////////////////////////Custom Order

export async function customOrder(details, image) {
  let image_url = await uploadCustomImage(image);

  const { data, error } = await supabase.from("custom_orders").insert([{ ...details, image_url }]);

  if (error) {
    console.error(error.message);
  } else {
    console.log("Custom Order Sent Successfullly");
  }
}

////////////////////////////////////Custom Order
////////////////////////////////////Custom Order
////////////////////////////////////Custom Order

// ///////////////////////////////////Check Out///////////////////////////////
// ///////////////////////////////////Check Out///////////////////////////////
// ///////////////////////////////////Check Out///////////////////////////////
// // supabase/functions/create-checkout-session/index.ts
// import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// import Stripe from "stripe";

// const stripeSecret = Deno.env.get(import.meta.env.STRIPE_SECRET_KEY);
// if (!stripeSecret) throw new Error("STRIPE_SECRET_KEY is not set");

// const stripe = new Stripe(stripeSecret, {
//   apiVersion: "2022-11-15",
// });

// serve(async (req) => {
//   try {
//     const { cartItems, email } = await req.json();

//     const line_items = cartItems.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: { name: item.title },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: "https://your-frontend.com/success",
//       cancel_url: "https://your-frontend.com/cancel",
//       customer_email: email,
//     });

//     return new Response(JSON.stringify({ id: session.id }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       headers: { "Content-Type": "application/json" },
//       status: 500,
//     });
//   }
// });

// ///////////////////////////////////Check Out///////////////////////////////
// ///////////////////////////////////Check Out///////////////////////////////
// ///////////////////////////////////Check Out///////////////////////////////
