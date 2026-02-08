import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import AboutUs from "./Pages/Aboutus";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ShopWomen from "./Pages/ShopForWomen";
import ShopMen from "./Pages/ShopForMen";
import ShopChildren from "./Pages/ShopForChildren";
import ShopAccessories from "./Pages/ShopForAccessories";
import ProductPage from "./Pages/ProductPage";
import CheckoutPage from "./Pages/CheckoutPage";
import CustomOrder from './Pages/CustomOrder';
import RefundPolicy from './Pages/RefundPolicy';
import AdminDashboard from './Pages/AdminDashboard';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public / Store pages */}
        <Route path="/" element={<Index />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/custom" element={<CustomOrder />} />
        <Route path="/refund" element={<RefundPolicy />} />

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
    </BrowserRouter>
  );
}

export default App;