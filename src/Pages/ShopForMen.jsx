import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Don't forget this import!

import Heroimg from "../components/IMG/abouthero.png";
import newArrival1 from "../components/IMG/newarrival1.jpg";
import newArrival2 from "../components/IMG/newarrival2.jpg";
import newArrival3 from "../components/IMG/newarrival3.jpg";
import newArrival4 from "../components/IMG/newarrival4.jpg";
import Jewelry1 from "../components/IMG/jewelry1.jpg";
import Jewelry2 from "../components/IMG/jewelry2.jpg";
import Jewelry3 from "../components/IMG/jewelry3.jpg";
import Jewelry4 from "../components/IMG/jewelry4.jpg";

// ==========================
// DUMMY PRODUCTS (MOVED & EXPORTED for ProductPage access)
// ==========================
export const DUMMY_PRODUCTS = [
  { id: 1, title: "African Suit Set", price: 189.99, image: newArrival1, category: "Agbada" },
  { id: 2, title: "Ankara Shirt & Trousers", price: 125.50, image: newArrival2, category: "Shirts" },
  { id: 3, title: "Dashiki Robe", price: 210.00, image: newArrival3, category: "Kaftan" },
  { id: 4, title: "Brocade Agbada", price: 350.00, image: newArrival4, category: "Agbada" },
  { id: 5, title: "Woven Fedora Hat", price: 45.00, image: Jewelry1, category: "Footwear" },
  { id: 6, title: "Leather Sandals", price: 85.00, image: Jewelry2, category: "Footwear" },
  { id: 7, title: "Casual Kaftan", price: 95.00, image: Jewelry3, category: "Kaftan" },
  { id: 8, title: "Designer Print Shirt", price: 155.00, image: Jewelry4, category: "Shirts" },
];

// ==========================
// 1. Product Card (UPDATED to use Link and accept ID)
// ==========================
const ProductCard = ({ id, image, title, price }) => { // Added 'id' prop
  return (
    // Wrapped the card content in a Link component
    <Link to={`/product/${id}`} className="flex flex-col items-center group">
      <div className="w-full aspect-square overflow-hidden mb-4 shadow-sm">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
        />
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
        }}
      >
        ${typeof price === "number" ? price.toFixed(2) : price}
      </p>
    </Link>
  );
};

// ==========================
// 2. Filter Sidebar (No Change)
// ==========================
const FilterSidebar = ({ onApply, onClose }) => {
  const categories = ["Kaftan", "Shirts", "Agbada", "Footwear", "Trousers"];
  const [selectedCats, setSelectedCats] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const MAX_RANGE = 1000;

  const toggleCategory = (cat) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleRange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") setMinPrice(Number(value));
    if (name === "maxPrice") setMaxPrice(Number(value));
  };

  const displayedMin = Math.min(minPrice, maxPrice);
  const displayedMax = Math.max(minPrice, maxPrice);

  const trackLeft = (displayedMin / MAX_RANGE) * 100;
  const trackWidth = ((displayedMax - displayedMin) / MAX_RANGE) * 100;

  const applyFilters = () => {
    onApply({
      categories: selectedCats,
      priceRange: [displayedMin, displayedMax],
    });
    onClose?.();
  };

  return (
    <div className="w-[80%] h-full p-5 bg-white-500 overflow-y-auto relative">
      {/* Close Button - visible on mobile drawer */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-4xl text-gray-500 hover:text-gray-800 z-10"
        >
          &times;
        </button>
      )}

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#BD007C]"
        />
      </div>

      <h3
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily: "Nunito",
          fontWeight: 700,
          fontStyle: "normal",
          fontSize: "24px",
          lineHeight: "150%",
          letterSpacing: "0px",
          verticalAlign: "middle",
        }}
      >
        Men Filter
      </h3>

      {/* Categories */}
      <div className="mb-10">
        <h4
          className="text-lg font-semibold text-gray-800 mb-4"
          style={{
            fontFamily: "Nunito",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0px",
          }}
        >
          Types
        </h4>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-5 h-5 text-[#BD007C] rounded focus:ring-[#BD007C]"
              />
              <span className="ml-3 text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-12">
        <h3
          className="text-xl font-bold mb-4"
          style={{
            fontFamily: "Nunito",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0px",
          }}
        >
          Price
        </h3>

        <p
          className="text-sm text-gray-700 mb-4"
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0px",
          }}
        >
          Range: ${displayedMin} – ${displayedMax}
        </p>

        {/* PRICE RANGE CONTROLS AREA */}
        <div className="relative h-6 pt-2">
          {/* Hidden Sliders (z-indexes are key here) */}
          <input
            type="range"
            name="minPrice"
            min="0"
            max={MAX_RANGE}
            value={minPrice}
            onChange={handleRange}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-10 top-2"
          />
          <input
            type="range"
            name="maxPrice"
            min="0"
            max={MAX_RANGE}
            value={maxPrice}
            onChange={handleRange}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-20 top-2"
          />

          {/* Track */}
          <div className="relative h-2 bg-gray-300 rounded-full">
            <div
              className="absolute h-2 bg-[#BD007C] rounded-full"
              style={{ left: `${trackLeft}%`, width: `${trackWidth}%` }}
            />
          </div>

          {/* Knobs - Using absolute positioning relative to the 'h-6 pt-2' parent */}
          <div
            className="absolute w-6 h-6 bg-white border-4 border-[#BD007C] rounded-full top-0 shadow-lg"
            style={{ left: `calc(${(minPrice / MAX_RANGE) * 100}% - 12px)` }}
          />
          <div
            className="absolute w-6 h-6 bg-white border-4 border-[#BD007C] rounded-full top-0 shadow-lg"
            style={{ left: `calc(${(maxPrice / MAX_RANGE) * 100}% - 12px)` }}
          />
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-[#BD007C] hover:bg-[#9b0066] text-white font-semibold py-2 rounded-md transition shadow-lg"
      >
        Apply Filters
      </button>
    </div>
  );
};


// ==========================
// 4. Main ShopForMen Component (UPDATED gridClasses definition)
// ==========================
const ShopForMen = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [sortOption, setSortOption] = useState("default"); // New state for sorting

  const applySorting = (currentProducts, option) => {
    const sortedProducts = [...currentProducts];

    if (option === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts;
  };

  const handleApplyFilters = ({ categories, priceRange }) => {
    const filtered = DUMMY_PRODUCTS.filter((p) => {
      const catOk = categories.length === 0 || categories.includes(p.category);
      const priceOk = p.price >= priceRange[0] && p.price <= priceRange[1];
      return catOk && priceOk;
    });
    setProducts(applySorting(filtered, sortOption));
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setProducts(applySorting(products, newSortOption));
  };

  // CORRECTED: Define gridColumnClasses to ONLY contain the column definitions
  const gridColumnClasses = isFilterOpen
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4";

  return (
    <>
      <section className="relative w-full h-[45vh] md:h-[52vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src={Heroimg}
          alt="Shop For Men"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center px-4 leading-tight"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
           Men
        </motion.h1>
      </section>

      <main className="py-8 px-4 sm:px-6 lg:px-[6%] max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-6 w-full sm:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-[#BD007C] font-semibold hover:text-[#9b0066] transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-4 8h4m-8-8h8m-8 8h4m-8 8h8" />
              </svg>
              Filters {isFilterOpen ? "(Hide)" : "(Show)"}
            </button>

            <p className="text-gray-600 font-medium">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <select
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#BD007C]"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option
              value="default"
              style={{
                fontFamily: "Nunito Sans",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              Sort By:
            </option>
            <option
              value="price-asc"
              style={{
                fontFamily: "Nunito Sans",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              Price: Low to High
            </option>
            <option
              value="price-desc"
              style={{
                fontFamily: "Nunito Sans",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              Price: High to Low
            </option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
          <motion.aside
            initial={false}
            animate={{
              width: isFilterOpen ? "320px" : "0px",
              opacity: isFilterOpen ? 1 : 0,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="hidden lg:block flex-shrink-0 overflow-hidden"
          >
            <div className="w-80 xl:w-96 bg-white h-full">
              <FilterSidebar onApply={handleApplyFilters} />
            </div>
          </motion.aside>

          <div className="flex-1">
            {/* CORRECTED LINE: Combine static grid/gap with dynamic column classes */}
            <div className={`grid gap-6 md:gap-8 ${gridColumnClasses}`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              ))}
            </div>

            {products.length === 0 && (
              <p className="text-center text-gray-500 py-20 text-xl font-medium">
                No products match your filters. Try adjusting them!
              </p>
            )}
          </div>
        </div>

        {isFilterOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-[88%] bg-white z-50 shadow-2xl lg:hidden"
            >
              <FilterSidebar
                onApply={handleApplyFilters}
                onClose={() => setIsFilterOpen(false)}
              />
            </motion.div>
          </>
        )}
      </main>
    </>
  );
};

export default ShopForMen;