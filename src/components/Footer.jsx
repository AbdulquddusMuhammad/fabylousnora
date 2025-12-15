import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full bg-[#4A1F8C] text-white pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 text-sm opacity-80 mb-12">

          {/* ABOUT SECTION 1: About + Social */}
          <div className="sm:col-span-1 lg:col-span-5 space-y-7">
            <h2
              className="text-3xl md:text-4xl font-bold opacity-100"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              FabulouslyNora
            </h2>

            <p
              className="leading-relaxed text-sm md:text-base"
              style={{ fontFamily: "Nunito, sans-serif", lineHeight: "160%" }}
            >
              From luxury outfits to well-crafted accessories, we bring you the finest
              fashion items for women and children. Shop top-notch quality at affordable
              prices and enjoy a seamless shopping experience.
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

          {/* SECTION 2: Categories + Quick Links – 2 columns on mobile/tablet */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:col-span-1 lg:col-span-4">
            {/* Categories */}
            <div>
              <h3
                className="mb-5 font-medium text-base tracking-wider"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Categories
              </h3>
              <ul className="space-y-3">
                {["Men", "Women", "Children", "Accessories", "Jewelry"].map((item) => (
                  <li
                    key={item}
                    className="hover:text-[#BD007C] transition duration-300 text-sm cursor-pointer"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="mb-5 font-medium text-base tracking-wider"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Privacy Policy",
                  "Shipping Policy",
                  "Terms & Condition",
                  "Refund Policy",
                ].map((item) => (
                  <li
                    key={item}
                    className="hover:text-[#BD007C] transition duration-300 text-sm cursor-pointer"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 3: Newsletter */}
          <div className="lg:col-span-3">
            <h3
              className="mb-6 font-medium text-base tracking-wider"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Newsletter
            </h3>
            <p className="mb-6" style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px" }}>
              Subscribe to get latest offers
            </p>

            <div className="relative max-w-xs">
              <input
                type="email"
                placeholder="Your email"
                className="w-full pb-3 pr-14 bg-transparent border-b-2 border-white/40 focus:border-white outline-none transition-all duration-300 text-white placeholder-white/60"
                style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px" }}
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl hover:text-[#BD007C] transition duration-300"
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-white/10 my-12" />

        {/* Big Background Text */}
        <div className="relative overflow-hidden text-center -mt-6">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(343.25deg, rgba(255, 255, 255, 0.15) -25.18%, rgba(189, 0, 124, 0.15) 86.16%)",
            }}
          />
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;