import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/context";
import { useContext } from "react";
import { subscribe } from "../lib/supabaseClient";

const Footer = () => {
  const { setType, newLetterReg, setNewLetterReg, fromNewLetter, setFromNewLetter } = useContext(AppContext);

  const location = useLocation();

  // Navigation items using IDs to match your header logic
  const categories = [
    { name: "Men", id: "men" },
    { name: "Women", id: "women" },
    { name: "Children", id: "children" },
    { name: "Accessories", id: "accessories" },
  ];

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  const quickLinks = [
    { name: "About Us", id: "aboutus" },
    { name: "Privacy Policy", id: "privacy-policy" },
    { name: "Shipping Policy", id: "shipping-policy" },
    { name: "Terms & Condition", id: "terms-and-conditions" },
    { name: "Refund Policy", id: "refund-policy" },
  ];

  return location.pathname === "/success" || location.pathname === "/login" ? (
    <></>
  ) : (
    <footer className="w-full bg-[#4A1F8C] text-white pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 text-sm opacity-80 mb-12">
          {/* SECTION 1: Brand Info */}
          <div className="sm:col-span-1 lg:col-span-5 space-y-7">
            <h2 className="text-3xl md:text-4xl font-bold opacity-100" style={{ fontFamily: '"Playfair Display", serif' }}>
              Fabulous by Nora
            </h2>

            <p className="leading-relaxed text-sm md:text-base" style={{ fontFamily: "Nunito, sans-serif", lineHeight: "160%" }}>
              From luxury outfits to well-crafted accessories, we bring you the finest fashion items for women, Men and Kids. Shop top-notch quality at affordable prices and enjoy a seamless shopping experience.
            </p>

            {/* Social Icons */}
            <div className="flex gap-7 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} className="hover:text-[#BD007C] transition duration-300" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="hover:text-[#BD007C] transition duration-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} className="hover:text-[#BD007C] transition duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} className="hover:text-[#BD007C] transition duration-300" />
              </a>
            </div>
          </div>

          {/* SECTION 2: Categories + Quick Links (Using Navbar Logic) */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:col-span-1 lg:col-span-4">
            {/* Categories Mapping */}
            <div>
              <h3 className="mb-5 font-medium text-base tracking-wider opacity-100 uppercase" style={{ fontFamily: "Nunito, sans-serif" }}>
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((item) => (
                  <li key={item.name}>
                    <Link
                      onClick={() => {
                        scrollToTop();
                        setType(item.name);
                      }}
                      to={`category/${item.id}`}
                      className="hover:text-[#BD007C] transition duration-300 text-sm block cursor-pointer"
                      style={{ fontFamily: "Nunito, sans-serif" }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Mapping */}
            <div>
              <h3 className="mb-5 font-medium text-base tracking-wider opacity-100 uppercase" style={{ fontFamily: "Nunito, sans-serif" }}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link to={`${item.id}`} className="hover:text-[#BD007C] transition duration-300 text-sm block cursor-pointer" style={{ fontFamily: "Nunito, sans-serif" }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 3: Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 font-medium text-base tracking-wider opacity-100 uppercase" style={{ fontFamily: "Nunito, sans-serif" }}>
              Newsletter
            </h3>
            <p className="mb-6" style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px" }}>
              Subscribe to get latest offers
            </p>

            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 my-12" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>© {new Date().getFullYear()} FabulousbyNora. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Secure Payments: Visa, Mastercard, PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-component for form logic to keep Footer clean
const NewsletterForm = () => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle, loading, success, error
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      // Using Supabase client found in context or creating a direct fetch to the function URL
      // Since we might not have supabase client in Footer scope easily without import, let's assume we can fetch directly or use the one from context if available.
      // Better: Import supabase client directly.

      // Dynamic import to avoid top-level dependency issues if any, or just fetch if we know the URL structure.
      // But standard way is sending to the function.
      const { supabase } = await import("../lib/supabaseClient");

      const { data, error } = await supabase.functions.invoke('mailerlite-newsletter', {
        body: { email }
      });

      if (error) throw error;

      setStatus("success");
      setMessage(data?.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Failed to subscribe.");
    }
  };

  return (
    <div>
      <form className="relative max-w-xs" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          className="w-full py-3 pr-14 bg-transparent border-b-2 border-white/40 focus:border-white outline-none transition-all duration-300 text-white placeholder-white/60 disabled:opacity-50"
          style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px" }}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl hover:text-[#BD007C] transition duration-300 disabled:opacity-50">
          {status === 'loading' ? '...' : '→'}
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-xs ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Footer;
