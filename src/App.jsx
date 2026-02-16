import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./Pages/Index";
import AboutUs from "./Pages/Aboutus";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ShopMen from "./Pages/ShopForMen";
import ShopWomen from "./Pages/ShopForWomen";
import ShopChildren from "./Pages/ShopForChildren";
import ShopAccessories from "./Pages/ShopForAccessories";
import ProductPage from "./Pages/ProductPage";
import CheckoutPage from "./Pages/CheckoutPage";
import CustomOrder from "./Pages/CustomOrder";
import RefundPolicy from "./Pages/RefundPolicy";
import AdminDashboard from "./Pages/AdminDashboard";
import Events from "./Pages/Events";
import EventShowCase from "./components/EventShowCase";
import EventItem from "./components/EventItemShowCase";
import CartOverlay from "./Pages/CartOverlay";
import LoginPage from "./Pages/LoginPage.jsx";
import { useContext } from "react";
import { AppContext } from "./context/context.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import SuccessPopUp from "./components/SuccessPopUp.jsx";
function App() {
  const { showCart, setShowCart, cartItems, setCartItems } = useContext(AppContext);
  const location = useLocation();

  return (
    <>
      <Header />
      <SuccessPopUp />
      <CartOverlay isOpen={showCart} onClose={() => setShowCart(false)} cartItems={cartItems} setCartItems={setCartItems} />
      {/* <LoginPage /> */}
      <Routes>
        {/* Public / Store pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/" element={<Index />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/custom" element={<CustomOrder />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/events" element={<Events />}>
          <Route path="" element={<EventShowCase />} />
          <Route path="eventitem" element={<EventItem />} />
        </Route>

        {/* Category / Shop pages */}
        <Route path="/category/men" element={<ShopMen />} />
        <Route path="/category/women" element={<ShopWomen />} />
        <Route path="/category/children" element={<ShopChildren />} />
        <Route path="/category/accessories" element={<ShopAccessories />} />

        {/* Product detail page */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Checkout */}
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
