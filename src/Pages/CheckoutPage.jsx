import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "../context/ToastContext";
import countriesData from "../../data/countries.json";
import countryDialInfo from "../../data/country_dail_info.json";
import { AppContext } from "../context/context";
import { useContext } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useEffect } from "react";

// Replace with your real Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// --- FlagSelect Component ---
function FlagSelect({ selectedCode, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);

  // Find selected option
  const selectedOption = options.find((o) => o.dial_code === selectedCode);

  return (
    <div className="relative border-r border-gray-300">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 bg-gray-50 text-gray-900 text-sm focus:bg-white h-full px-3 py-3 min-w-[110px] outline-none">
        {selectedOption ? (
          <>
            <img src={`https://flagcdn.com/w40/${selectedOption.code.toLowerCase()}.png`} alt={selectedOption.name} className="w-6 h-auto object-contain" />
            <span>{selectedOption.dial_code}</span>
          </>
        ) : (
          <span>+1</span>
        )}
        <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close on click outside */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

          <div className="absolute top-full left-0 mt-1 w-[300px] max-h-[300px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl z-20">
            {options.map((country) => (
              <div
                key={country.code}
                onClick={() => {
                  onChange(country.dial_code);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 ${selectedCode === country.dial_code ? "bg-pink-50" : ""}`}>
                <img src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} className="w-6 h-auto shadow-sm" />
                <span className="text-gray-900 font-medium w-12">{country.dial_code}</span>
                <span className="text-gray-600 text-xs truncate flex-1">{country.name}</span>
                {selectedCode === country.dial_code && <Check className="w-4 h-4 text-[#EC4899]" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- PhoneInputField Helper ---
function PhoneInputField({ label, name, value, onChange, dialCode, onDialCodeChange, required = true }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex rounded-lg border border-gray-300 relative focus-within:ring-1 focus-within:ring-[#EC4899] focus-within:border-[#EC4899] bg-white">
        <FlagSelect
          selectedCode={dialCode}
          onChange={(code) => onDialCodeChange({ target: { value: code } })} // Mock event for compatibility
          options={countryDialInfo}
        />
        <input type="tel" name={name} id={name} value={value} onChange={onChange} required={required} placeholder="Phone number" className="flex-1 px-3 py-3 outline-none text-gray-900 rounded-r-lg" />
      </div>
    </div>
  );
}

// --- InputField Helper ---
function InputField({ label, name, type = "text", value, onChange, required = true }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} name={name} id={name} value={value} onChange={onChange} required={required} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#EC4899] focus:border-[#EC4899] outline-none" />
    </div>
  );
}

// --- SelectField Helper ---
function SelectField({ label, name, value, onChange, options, required = true, disabled = false, placeholder = "Select..." }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select name={name} id={name} value={value} onChange={onChange} required={required} disabled={disabled} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#EC4899] focus:border-[#EC4899] outline-none bg-white disabled:bg-gray-100 disabled:text-gray-400">
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// --- OrderSummary Component ---
const OrderSummary = ({ cartItems, shippingFee, handleMakePayment, isProcessing, deliveryOption }) => {
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
          <span className="font-medium">{deliveryOption === "pickup" ? "Free" : shippingFee === 0 ? <span className="text-gray-500 italic text-sm">Enter address</span> : `$${shippingFee.toFixed(2)}`}</span>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">Total:</span>
        <span className="text-xl text-[#EC4899] font-bold">${total.toFixed(2)}</span>
      </div>

      <button onClick={handleMakePayment} className="w-full bg-[#EC4899] font-nunito hover:bg-[#db2777] text-[12px] text-white font-bold py-3 transition mt-6 disabled:bg-gray-400  flex justify-center items-center" disabled={!cartItems.length || isProcessing}>
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </div>
        ) : (
          "Make Payment"
        )}
      </button>
      {/* <button className="w-full bg-[#ffffff] font-nunito text-[#6A0DAD] text-[12px] border border-[#6A0DAD] font-bold py-3 transition mt-4 disabled:bg-gray-400 " disabled={!cartItems.length || isProcessing}>
        Buy Now Pay Later
      </button> */}
    </div>
  );
};

// --- MAIN Component ---
function CheckoutPage() {
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);

  const [formData, setFormData] = useState({
    deliveryOption: "shipping",
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    dialCode: "+1", // Default to US
    country: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const { cartItems, user } = useContext(AppContext);

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <main className="py-20 px-6 max-w-7xl mx-auto font-nunito text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="inline-block bg-[#EC4899] text-white font-bold py-3 px-8 rounded-full hover:bg-[#db2777] transition">
          Start Shopping
        </Link>
      </main>
    );
  }
  // Default shipping fee is 0 until rate is selected for shipping
  const [shippingFee, setShippingFee] = useState(0.0);

  // --- Derived State for Location Dropdowns ---
  const countryOptions = useMemo(() => {
    return countriesData.map((c) => ({ label: c.name, value: c.name }));
  }, []);

  const stateOptions = useMemo(() => {
    const selectedCountry = countriesData.find((c) => c.name === formData.country);
    if (!selectedCountry || !selectedCountry.states) return [];
    return selectedCountry.states.map((s) => ({ label: s.name, value: s.name }));
  }, [formData.country]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updates = { [name]: value };

      // Dependent Dropdown Logic
      if (name === "country") {
        updates.state = ""; // Reset state when country changes
        updates.city = ""; // Reset city when country changes

        // Auto-select dial code based on country name
        const matchedCountry = countryDialInfo.find((c) => c.name === value);
        if (matchedCountry) {
          updates.dialCode = matchedCountry.dial_code;
        }
      }
      // Note: Since we don't have a curated city list in the JSON, city is manual text
      // but if we did, we would reset city when state changes here.

      return { ...prev, ...updates };
    });

    // Reset verification if address fields change
    if (["address", "city", "state", "zipCode", "country"].includes(name)) {
      // Added country
      setAddressVerified(false);
      setShippingRates([]);
      setSelectedRate(null);
      setShippingFee(0.0);
    }
  };

  const handleDialCodeChange = (e) => {
    setFormData((prev) => ({ ...prev, dialCode: e.target.value }));
  };

  const handleDeliveryOptionChange = (option) => {
    setFormData((prev) => ({ ...prev, deliveryOption: option }));
    setShippingFee(0.0); // Reset fee
    if (option === "pickup") {
      setAddressVerified(true); // No validation needed for pickup
    } else {
      setAddressVerified(false);
    }
  };

  const validateAddress = async () => {
    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      addToast("Please fill in all address fields first.", "error");
      return;
    }

    setIsValidating(true);
    try {
      const { data, error } = await supabase.functions.invoke("shippo-service", {
        body: {
          action: "validate",
          address: {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      // Shippo returns { isValid: boolean, messages: [], normalizedAddress: {}, raw: {} }
      if (!data.isValid) {
        throw new Error("Address is invalid. Please check your details.");
      }

      // Update form with normalized address if available (Optional, sometimes distracting)
      // Keeping it as is for now
      if (data.normalizedAddress) {
        setFormData((prev) => ({
          ...prev,
          address: data.normalizedAddress.street,
          city: data.normalizedAddress.city,
          state: data.normalizedAddress.state,
          zipCode: data.normalizedAddress.zipCode,
        }));
      }

      setAddressVerified(true);
      addToast("Address successfully verified!", "success");
      fetchShippingRates(); // Auto-fetch rates if valid
    } catch (err) {
      console.error("Address Validation Error:", err);
      addToast(err.message || "Address Validation Failed", "error");
      setAddressVerified(false);
    } finally {
      setIsValidating(false);
    }
  };

  const fetchShippingRates = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("shippo-service", {
        body: {
          action: "rates",
          address: {
            name: formData.fullName,
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
          packageDetails: { weight: 16 }, // Approximate weight
        },
      });

      if (error) throw error;

      if (data.error) {
        // Handle specific "No rates" or carrier error
        addToast(data.error, "error");
        setShippingRates([]);
        return;
      }

      setShippingRates(data.rates || []);
    } catch (err) {
      console.error("Error fetching rates:", err);
      // Only show toast if it's a network/unexpected error, as specific errors are handled above
      if (!data?.error) {
        addToast("Could not fetch shipping rates. Please try again.", "error");
      }
    }
  };

  const handleRateSelect = (rate) => {
    setSelectedRate(rate);
    setShippingFee(Number(rate.amount));
  };

  // THE PAYMENT LOGIC
  const handleMakePayment = async () => {
    if (!formData.fullName || !formData.email) {
      addToast("Please fill in contact details.", "error");
      return;
    }
    if (formData.deliveryOption === "shipping" && !addressVerified) {
      addToast("Please verify your shipping address first.", "error");
      return;
    }
    if (formData.deliveryOption === "shipping" && !selectedRate) {
      addToast("Please select a shipping method.", "error");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-setup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          email: formData.email,
          shippingFee,
          deliveryOption: formData.deliveryOption,
          shippingAddress: {
            fullName: formData.fullName,
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            phone: formData.phoneNumber,
          },
          userId: user?.id, // From AppContext -> user
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      console.log("Stripe Session:", session); // DEBUG

      if (!session?.id) {
        throw new Error("Invalid session response from server");
      }

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe Checkout Error:", error);
        throw new Error(error.message);
      }
    } catch (err) {
      console.error("Payment Process Error:", err);
      addToast("Payment Error: " + err.message, "error");
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
                            ${formData.deliveryOption === option ? "bg-[#EC4899] border-[#EC4899] text-white" : "border-gray-300 text-gray-700 hover:border-[#EC4899]"}`}>
            {option === "shipping" ? "Shipping" : "Pick Up"}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleFormChange} />
          <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleFormChange} />
        </div>

        {formData.deliveryOption === "shipping" && (
          <>
            {/* Reordered: Country First */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <SelectField label="Country" name="country" value={formData.country} onChange={handleFormChange} options={countryOptions} placeholder="Select Country" />

              {stateOptions.length > 0 ? <SelectField label="State / Province" name="state" value={formData.state} onChange={handleFormChange} options={stateOptions} placeholder="Select State" disabled={!formData.country} /> : <InputField label="State / Province" name="state" value={formData.state} onChange={handleFormChange} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField label="City" name="city" value={formData.city} onChange={handleFormChange} />
              <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleFormChange} />
            </div>

            <InputField label="Shipping Address" name="address" value={formData.address} onChange={handleFormChange} />

            <div className="mt-4 mb-6">
              <button onClick={validateAddress} disabled={isValidating || addressVerified} className={`px-4 py-2 rounded text-white font-bold text-sm ${addressVerified ? "bg-green-600" : "bg-blue-600"}`}>
                {isValidating ? "Validating..." : addressVerified ? "✓ Verified" : "Verify Address"}
              </button>
              {addressVerified && <p className="text-green-600 text-xs mt-1">Address confirmed via USPS</p>}
            </div>

            {/* Shipping Rates Selection */}
            {shippingRates.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2">Select Shipping Method</h3>
                <div className="space-y-2">
                  {shippingRates.map((rate) => (
                    <div key={rate.id} onClick={() => handleRateSelect(rate)} className={`p-3 border rounded cursor-pointer flex justify-between items-center ${selectedRate?.id === rate.id ? "border-[#EC4899] bg-pink-50" : "border-gray-300"}`}>
                      <div>
                        <p className="font-semibold text-sm">
                          {rate.provider} {rate.servicelevel}
                        </p>
                        <p className="text-xs text-gray-500">{rate.duration_terms}</p>
                      </div>
                      <span className="font-bold">${rate.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <PhoneInputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} dialCode={formData.dialCode} onDialCodeChange={handleDialCodeChange} />
          </>
        )}

        {formData.deliveryOption === "pickup" && <p className="mt-4 text-gray-600 italic font-nunito text-sm">* Pick up location: 13629 Alief Clodine Rd, Suite C, Houston TX 77082 (Behind Now And Forever Gas Station)</p>}
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
          <OrderSummary cartItems={cartItems} shippingFee={shippingFee} handleMakePayment={handleMakePayment} isProcessing={isProcessing} deliveryOption={formData.deliveryOption} />
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 flex justify-start">
        <Link to="/" className="text-sm text-gray-600 hover:text-[#EC4899]">
          ← Return to Home
        </Link>
      </div>
    </main>
  );
}

export default CheckoutPage;
