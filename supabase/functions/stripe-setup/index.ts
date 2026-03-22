import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { cartItems, email, orderId, shippingFee, shippingAddress, deliveryOption } = await req.json();
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2022-11-15",
      httpClient: Stripe.createFetchHttpClient(),
    });

    let line_items = [];
    let customer_email = email;
    let metadata = {};

    if (orderId) {
      // Securely fetch order details from DB
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error || !order) {
        throw new Error("Order not found or invalid.");
      }

      line_items = [{
        price_data: {
          currency: "usd",
          product_data: { name: `Custom Order #${order.id}` },
          unit_amount: Math.round(order.total_amount * 100),
        },
        quantity: 1,
      }];
      customer_email = order.email;
      metadata = { orderId: orderId.toString(), type: "custom_order" };
    } else if (cartItems && cartItems.length > 0) {
      // Standard Cart Checkout
      // Standard Cart Checkout
      line_items = cartItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            metadata: {
              size: item.size || "N/A",
              image_url: item.image || "",
              product_id: item.id
            }
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      // Add Shipping Fee if applicable
      if (typeof shippingFee === 'number' && shippingFee > 0) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: { name: "Shipping Fee" },
            unit_amount: Math.round(shippingFee * 100),
          },
          quantity: 1,
        });
      }

      metadata = {
        type: "cart_checkout",
        shipping_name: shippingAddress?.fullName || "",
        shipping_street: shippingAddress?.street || "",
        shipping_city: shippingAddress?.city || "",
        shipping_state: shippingAddress?.state || "",
        shipping_zip: shippingAddress?.zipCode || "",
        shipping_country: shippingAddress?.country || "",
        shipping_phone: shippingAddress?.phone || "",
        delivery_option: deliveryOption || "shipping"
      };
    } else {
      throw new Error("Invalid request: No items or order ID provided.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/#/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#/checkout`, // Or back to order page
      customer_email,
      metadata,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
