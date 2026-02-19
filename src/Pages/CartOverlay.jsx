import React from "react";
import { Link } from "react-router-dom";

/**
 * CartItem component to display an individual product in the cart.
 */
function CartItem({ item, setCartItems }) {
  console.log(item);

  // Function to remove the item from the cart
  const handleRemove = () => {
    setCartItems((prevItems) => prevItems.filter((i) => i.cartId !== item.cartId));
  };

  // Function to update item quantity
  const handleQuantityChange = (delta) => {
    setCartItems((prevItems) =>
      prevItems.map((i) => {
        if (i.cartId === item.cartId) {
          const newQuantity = i.quantity + delta;
          // Ensure quantity is never less than 1
          return { ...i, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return i;
      })
    );
  };

  return (
    <div className="flex border-b border-gray-200 py-4 last:border-b-0">
      <div className="w-20 h-20 flex-shrink-0 mr-4">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
        {item.size && <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>}

        <div className="flex items-center justify-between mt-2">
          {/* Quantity Control */}
          <div className="flex items-center border border-gray-300 w-max">
            <button onClick={() => handleQuantityChange(-1)} className="px-2 py-1 text-[12px]  text-sm text-gray-700 hover:bg-gray-100">
              -
            </button>
            <span className="px-3 py-1 text-sm border-x border-gray-300">{item.quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 text-sm text-[12px]  text-gray-700 hover:bg-gray-100">
              +
            </button>
          </div>

          <p className=" text-[#6A0DAD]">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        <button onClick={handleRemove} className="text-xs text-red-500 text-[12px] hover:text-red-700 mt-1">
          Remove
        </button>
      </div>
    </div>
  );
}

/**
 * CartOverlay component for the slide-in shopping cart drawer.
 */
function CartOverlay({ isOpen, onClose, cartItems, setCartItems }) {
  // console.log("first");
  // console.log(cartItems);
  const drawerTransitionClasses = isOpen ? "translate-x-0" : "translate-x-full";
  const backdropOpacityClasses = isOpen ? "opacity-100" : "opacity-0 pointer-events-none";

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen && backdropOpacityClasses === "opacity-0 pointer-events-none") return null;

  return (
    <>
      {/* 1. DARK BACKDROP */}
      <div onClick={onClose} className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${backdropOpacityClasses}`} style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}></div>

      {/* 2. WHITE CART SLIDER */}
      <div
        // *** UPDATED RESPONSIVE CLASSES ***
        // w-full on mobile
        // md:w-96 (384px) on tablets/mid-size
        // lg:w-[480px] on large desktops
        className={`fixed top-0 right-0 w-full md:w-96 lg:w-[480px] h-full bg-white shadow-2xl z-[60] transition-transform duration-300 ease-in-out ${drawerTransitionClasses} flex flex-col font-nunito`}>
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">
            My Shopping Cart <span className="text-gray-500 text-base">({totalItems})</span>
          </h3>
          {/* Close Button (X) */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items List - Scrollable */}
        <div className="flex-1 overflow-y-auto px-5">{cartItems.length > 0 ? cartItems.map((item) => <CartItem key={item.cartId} item={item} setCartItems={setCartItems} />) : <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>}</div>

        {/* Footer: Subtotal and Action Buttons */}
        <div className="p-5 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <p className="text-l font-semibold">Subtotal:</p>
            <p className="text-l text-[#6A0DAD]">${subtotal.toFixed(2)}</p>
          </div>

          {/* Checkout Button: Correctly links to the /checkout page */}
          <Link to="/checkout" className="block w-full text-center bg-[#6A0DAD] hover:bg-[#5a0ca0] text-white text-[12px]  font-bold text-lg py-2 transition mb-3" onClick={onClose}>
            Proceed to Checkout
          </Link>

          {/* Continue Shopping Button */}
          <button onClick={onClose} className="w-full text-center text-[12px]  border-2 border-[#6A0DAD] hover:border-[#5a0ca0] text-[#6A0DAD] font-bold text-lg py-2 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default CartOverlay;
