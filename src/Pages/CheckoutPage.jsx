import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// DUMMY CART DATA (Replace this with your actual cart state logic later)
const DUMMY_CART_ITEMS = [
    { id: 1, title: 'Classic Crewneck T-shirt', size: 'M', quantity: 1, price: 29.99, image: '/path/to/tshirt.jpg', cartId: '1-M' },
    { id: 2, title: 'Slim Fit Denim Jeans', size: 'L', quantity: 2, price: 79.99, image: '/path/to/jeans.jpg', cartId: '2-L' },
];

// =========================================================================
// 1. HELPER COMPONENTS (Nested within the file for access)
// =========================================================================

// --- InputField Helper ---
function InputField({ label, name, type = 'text', value, onChange, required = true }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#6A0DAD] focus:border-[#6A0DAD] outline-none"
            />
        </div>
    );
}

// --- OrderSummary Component ---
function OrderSummary({ cartItems, shippingFee, handleMakePayment }) {
    // Utility function to calculate subtotal
    const calculateSubtotal = (items) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const subtotal = calculateSubtotal(cartItems);
    const total = subtotal + shippingFee;

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Your Order</h2>

            {/* Product List */}
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {cartItems.map(item => (
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

            {/* Pricing Breakdown */}
            <div className="border-t pt-4 space-y-2 text-gray-700">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <span className="font-medium">
                        {shippingFee === 0.00 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                    </span>
                </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-2xl text-[#6A0DAD]">${total.toFixed(2)}</span>
            </div>
            
            {/* Make Payment Button */}
            <button 
                onClick={handleMakePayment}
                className="w-full bg-[#6A0DAD] font-nunito hover:bg-[#5a0ca0] text-white font-bold text-lg py-2 transition mt-6 disabled:bg-gray-400"
                disabled={!cartItems.length}
            >
                Make Payment
            </button>
            <button 
                onClick={handleMakePayment}
                className="w-full bg-[#ffffff] font-nunito text-[#6A0DAD] border-1 border-[#6A0DAD]  font-bold text-lg py-2 transition mt-6 disabled:bg-gray-400"
                disabled={!cartItems.length}
            >
                Buy Now Pay Later
            </button>
        </div>
    );
}

// =========================================================================
// 2. MAIN CheckoutPage Component (Handles all state and layout)
// =========================================================================

function CheckoutPage() {
    
    // State to hold form data
    const [formData, setFormData] = useState({
        deliveryOption: 'shipping', // 'shipping' or 'pickup'
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        country: '',
        city: '',
        state: '',
    });

    // State to hold cart items
    const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS);
    const [shippingFee, setShippingFee] = useState(15.00); // Default shipping fee

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDeliveryOptionChange = (option) => {
        setFormData(prev => ({ ...prev, deliveryOption: option }));
        // Recalculate shipping fee based on delivery option
        setShippingFee(option === 'shipping' ? 15.00 : 0.00);
    };

    const handleMakePayment = () => {
        // Validation logic should go here (e.g., check if required fields are filled)
        if (!formData.fullName || !formData.email || (formData.deliveryOption === 'shipping' && !formData.address)) {
            alert("Please fill in all required contact and delivery details.");
            return;
        }

        // Implement payment gateway integration and order finalization here
        console.log("Processing payment for order:", { formData, cartItems });
        alert("Payment initiated! (Check console for data)"); 
    };
    
    // --- Contact and Delivery Details Section JSX (formerly ContactShippingForm) ---
    const ContactShippingFormJSX = (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact and Delivery Details</h2>

            {/* Shipping/Pick Up Toggle */}
            <div className="flex space-x-4 mb-8">
                {['shipping', 'pickup'].map(option => (
                    <button
                        key={option}
                        onClick={() => handleDeliveryOptionChange(option)}
                        className={`px-6 py-2 text-lg font-bold transition rounded-full border-2 
                            ${formData.deliveryOption === option
                                ? 'bg-[#6A0DAD] border-[#6A0DAD] text-white'
                                : 'border-gray-300 text-gray-700 hover:border-[#6A0DAD]'
                            }`}
                    >
                        {option === 'shipping' ? 'Shipping' : 'Pick Up'}
                    </button>
                ))}
            </div>

            {/* Input Fields */}
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <InputField 
                        label="Full Name" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleFormChange} 
                    />
                    <InputField 
                        label="Email Address" 
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleFormChange} 
                    />
                </div>
                
                {formData.deliveryOption === 'shipping' && (
                    <>
                        <InputField 
                            label="Shipping Address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleFormChange} 
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <InputField 
                                label="Country" 
                                name="country" 
                                value={formData.country} 
                                onChange={handleFormChange} 
                            />
                            <InputField 
                                label="Phone Number" 
                                name="phoneNumber" 
                                type="tel"
                                value={formData.phoneNumber} 
                                onChange={handleFormChange} 
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <InputField 
                                label="City" 
                                name="city" 
                                value={formData.city} 
                                onChange={handleFormChange} 
                            />
                            <InputField 
                                label="State/Province" 
                                name="state" 
                                value={formData.state} 
                                onChange={handleFormChange} 
                            />
                        </div>
                    </>
                )}

                {formData.deliveryOption === 'pickup' && (
                    <p className="mt-4 text-gray-600">
                        * Pick up location details will be sent to your email after payment confirmation.
                    </p>
                )}
                
            </form>
        </div>
    );

    // --- Main Layout Render ---
    return (
        <main className="py-6 px-4 sm:px-6 lg:px-[6%] max-w-7xl mx-auto font-nunito">
            {/* Divider Line (Faint line just like the one under the header) */}
            <div className="h-px bg-gray-200 mb-8"></div> 

            <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                Checkout
            </h1>

            {/* Content Divider Line (Another faint line) */}
            <div className="h-px bg-gray-200 mb-8"></div> 

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                
                {/* ==================== LEFT COLUMN: CONTACT & DELIVERY DETAILS (60%) ==================== */}
                <div className="lg:col-span-3">
                    {ContactShippingFormJSX}
                </div>

                {/* ==================== RIGHT COLUMN: ORDER SUMMARY (40%) ==================== */}
                <div className="lg:col-span-2">
                    <OrderSummary 
                        cartItems={cartItems} 
                        shippingFee={shippingFee} 
                        handleMakePayment={handleMakePayment}
                    />
                </div>
            </div>

            {/* Footer Navigation (optional) */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-start">
                <Link to="/product/2" className="text-sm text-gray-600 hover:text-[#6A0DAD]">
                    ← Return to Cart
                </Link>
            </div>
        </main>
    );
}

export default CheckoutPage;