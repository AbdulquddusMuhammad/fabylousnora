import React from "react";
import { motion } from "framer-motion";
import HeroImg from "../components/IMG_WEBP/heroimg.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-screen mt-4 flex items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: "easeOut" }}>
        <img src={HeroImg} alt="Fabulous by Nora" className="w-full h-full object-cover brightness-[0.65]" />
      </motion.div>

      {/* Content — safe container */}
      <div className="relative z-10 w-full px-8 md:px-16">
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut", delay: 0.8 }} className="max-w-full">
          {/* FABULOUS BY NORA — NO CUT OFF, PERFECT ON MOBILE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="font-bold text-white drop-shadow-2xl whitespace-nowrap mx-auto"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(2.2rem, 7.8vw, 4.5rem)",
              lineHeight: "1.1",
              textShadow: "0 4px 12px rgba(0,0,0,0.6)",
              maxWidth: "84vw", // ← Safe width
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            FABULOUS BY NORA
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="text-white font-bold drop-shadow-xl mt-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(1.6rem, 6vw, 3rem)",
              lineHeight: "1.2",
              textShadow: "0 3px 10px rgba(0,0,0,0.5)",
              maxWidth: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            Where Heritage Meets Modern Style
          </motion.p>

          {/* Button */}
          <Link to={"/category/women"}>
            <motion.button initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }} className="mt-12 px-10 sm:px-16 py-4 bg-white text-[#BD007C] font-medium text-lg sm:text-xl rounded-lg shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 block mx-auto min-w-[200px]" style={{ fontFamily: "Nunito, sans-serif" }}>
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator — FIXED */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }} // ← Fixed: was "Apollo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
        <svg className="w-6 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 36">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v18m-6-6l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
