import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your real Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// DUMMY CART DATA
const DUMMY_CART_ITEMS = [
  { id: 1, title: "Classic Crewneck T-shirt", size: "M", quantity: 1, price: 29.99, image: "https://placehold.co/400", cartId: "1-M" },
  { id: 2, title: "Slim Fit Denim Jeans", size: "L", quantity: 2, price: 79.99, image: "https://placehold.co/400", cartId: "2-L" },
];

// --- InputField Helper ---
function InputField({ label, name, type = "text", value, onChange, required = true }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} name={name} id={name} value={value} onChange={onChange} required={required} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#6A0DAD] focus:border-[#6A0DAD] outline-none" />
    </div>
  );
}

// --- OrderSummary Component ---
function OrderSummary({ cartItems, shippingFee, handleMakePayment, isProcessing }) {
  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal(cartItems);
  const total = subtotal + shippingFee;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Your Order</h2>

      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <div key={item.cartId} className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500">
                Qty: {item.quantity} | Size: {item.size}
              </p>
            </div>
            <p className=" text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee:</span>
          <span className="font-medium">{shippingFee === 0.0 ? "Free" : `$${shippingFee.toFixed(2)}`}</span>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">Total:</span>
        <span className="text-xl text-[#6A0DAD] font-bold">${total.toFixed(2)}</span>
      </div>

      <button onClick={handleMakePayment} className="w-full bg-[#6A0DAD] font-nunito hover:bg-[#5a0ca0] text-[12px] text-white font-bold py-3 transition mt-6 disabled:bg-gray-400  flex justify-center items-center" disabled={!cartItems.length || isProcessing}>
        {isProcessing ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          "Make Payment"
        )}
      </button>
      <button className="w-full bg-[#ffffff] font-nunito text-[#6A0DAD] text-[12px] border border-[#6A0DAD] font-bold py-3 transition mt-4 disabled:bg-gray-400 " disabled={!cartItems.length || isProcessing}>
        Buy Now Pay Later
      </button>
    </div>
  );
}

// --- MAIN Component ---
function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    deliveryOption: "shipping",
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    country: "",
    city: "",
    state: "",
  });

  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS);
  const [shippingFee, setShippingFee] = useState(15.0);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryOptionChange = (option) => {
    setFormData((prev) => ({ ...prev, deliveryOption: option }));
    setShippingFee(option === "shipping" ? 15.0 : 0.0);
  };

  // THE PAYMENT LOGIC
  const handleMakePayment = async () => {
    if (!formData.fullName || !formData.email || (formData.deliveryOption === "shipping" && !formData.address)) {
      alert("Please fill in all required contact and delivery details.");
      return;
    }

    setIsProcessing(true);

    try {
      const YOUR_SUPABASE_PROJECT = import.meta.env.VITE_SUPABASE_URL;
      // .split("https://")[1].split(".")[0]; // Extract project name from URL
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-setup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          email: formData.email,
        }),
      });

      const session = await response.json();
      if (session.error) throw new Error(session.error);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) throw new Error(error.message);
    } catch (err) {
      alert("Payment Error: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const ContactShippingFormJSX = (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Contact and Delivery Details</h2>

      <div className="flex space-x-4 mb-8">
        {["shipping", "pickup"].map((option) => (
          <button
            key={option}
            onClick={() => handleDeliveryOptionChange(option)}
            className={`px-6 py-2 text-[12px] font-bold transition rounded-full border-2 
                            ${formData.deliveryOption === option ? "bg-[#6A0DAD] border-[#6A0DAD] text-white" : "border-gray-300 text-gray-700 hover:border-[#6A0DAD]"}`}>
            {option === "shipping" ? "Shipping" : "Pick Up"}
          </button>
        ))}
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleFormChange} />
          <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleFormChange} />
        </div>

        {formData.deliveryOption === "shipping" && (
          <>
            <InputField label="Shipping Address" name="address" value={formData.address} onChange={handleFormChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField label="Country" name="country" value={formData.country} onChange={handleFormChange} />
              <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleFormChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField label="City" name="city" value={formData.city} onChange={handleFormChange} />
              <InputField label="State/Province" name="state" value={formData.state} onChange={handleFormChange} />
            </div>
          </>
        )}

        {formData.deliveryOption === "pickup" && <p className="mt-4 text-gray-600 italic font-nunito text-sm">* Pick up location details will be sent to your email after payment confirmation.</p>}
      </form>
    </div>
  );

  return (
    <main className="py-6 px-4 sm:px-6 lg:px-[6%] max-w-7xl mx-auto font-nunito">
      <div className="h-px bg-gray-200 mb-8"></div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
        Checkout
      </h1>
      <div className="h-px bg-gray-200 mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">{ContactShippingFormJSX}</div>
        <div className="lg:col-span-2">
          <OrderSummary cartItems={cartItems} shippingFee={shippingFee} handleMakePayment={handleMakePayment} isProcessing={isProcessing} />
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 flex justify-start">
        <Link to="/" className="text-sm text-gray-600 hover:text-[#6A0DAD]">
          ← Return to Home
        </Link>
      </div>
    </main>
  );
}

export default CheckoutPage;
