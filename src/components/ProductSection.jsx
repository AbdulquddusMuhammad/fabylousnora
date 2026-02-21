import React from "react";
import ProductCard from "./ProductCard";
import { useContext } from "react";
import { AppContext } from "../context/context";
import { Link } from "react-router-dom";

const ProductSection = ({ title, products }) => {
  const { setType } = useContext(AppContext);
  return (
    <section className="py-3 md:py-8 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* === HEADER – identical to your very first version === */}
        <div className="flex items-center justify-between mb-2 md:mb-10 flex-wrap gap-3">
          <h2 className="text-l md:text-2xl font-bold leading-tight" style={{ fontFamily: '"Libre Baskerville", serif' }}>
            {title}
            {/* {alert(title)} */}
          </h2>

          {/* This is your original "Shop Now →" – visible only on desktop */}
          <Link
            onClick={() => {
              setType(title === "Complete Your Look" ? "Accessories" : title);
              setTimeout(() => {
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 500);
              }, 500);
            }}
            to={`/category/${title === "Complete Your Look" ? "Accessories" : title === "Kings Collection" ? "men" : title === "The Queens Collection" ? "women" : title}`}
            className="group">
            <button className="hidden md:block text-[#BD007C] font-bold text-base md:text-lg tracking-wider hover:underline whitespace-nowrap" style={{ fontFamily: "Nunito, sans-serif" }}>
              Shop Now →
            </button>
          </Link>
        </div>

        {/* === GRID – 100% your original spacing === */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* === MOBILE-ONLY BIG PINK BUTTON (centered below the grid) === */}
        <div className="md:hidden flex justify-center mt-2">
          <button className="bg-[#BD007C] text-white font-bold py-2 px-6 text-lg tracking-wider hover:bg-[#a0006e] transition w-full max-w-sm" style={{ fontFamily: "Nunito, sans-serif" }}>
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
