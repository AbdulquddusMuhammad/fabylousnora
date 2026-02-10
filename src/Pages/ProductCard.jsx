import React from "react";
import { Link } from "react-router-dom";

// ==========================
// 1. Product Card (UPDATED to use Link and accept ID)
// ==========================
const ProductCard = ({ id, image, title, price }) => {
  // Added 'id' prop
  return (
    // Wrapped the card content in a Link component
    <Link
      to={`/product/${id}`}
      onClick={() => {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);
      }}
      className="flex flex-col items-center group">
      <div className="w-full aspect-square overflow-hidden mb-4 shadow-sm">
        <img src={image} alt={title} className="object-cover w-full h-full transition duration-500 group-hover:scale-110" />
      </div>
      <h3
        className="text-center truncate px-2 w-[180px] sm:w-[230px] md:w-[300px] lg:w-[350px]"
        style={{
          fontFamily: "Nunito",
          fontWeight: 700,
          fontStyle: "normal",
          lineHeight: "100%",
          letterSpacing: "0px",
        }}
        title={title} // shows full text on hover
      >
        {title}
      </h3>
      <p
        className="text-gray-800 font-semibold w-auto text-[12px] sm:text-[14px] md:text-[16px] mt-1"
        style={{
          fontFamily: "Nunito",
          fontWeight: 600,
          fontStyle: "normal",
          lineHeight: "100%",
          letterSpacing: "0px",
        }}>
        ${typeof price === "number" ? price.toFixed(2) : price}
      </p>
    </Link>
  );
};

export default ProductCard;
