import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/context";

// ==========================
// 2. Filter Sidebar (No Change)
// ==========================
const FilterSidebar = ({ onApply, onClose }) => {
  const { type } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const menCategories = ["Kaftan", "Shirts", "Agbada", "Footwear", "Trousers"];
  const womenCategories = ["Dresses", "Tops", "Pants", "Skirts", "Boubous"];
  const accessoriesCategories = ["Caps", "Geles/headties", "Shoes and purses", "Jewelry", "Handbags"];
  const kidsCategories = ["Tops", "Pants", "2pc sets", "Dresses", "Skirts", "Tops", "Pants"];
  const [selectedCats, setSelectedCats] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const MAX_RANGE = 1000;

  const toggleCategory = (cat) => {
    setSelectedCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
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

  useEffect(() => {
    if (type === "Men") {
      setSelectedCats(menCategories);
      setCategories(menCategories);
    } else if (type === "Women") {
      setSelectedCats(womenCategories);
      setCategories(womenCategories);
    } else if (type === "Accessories") {
      setSelectedCats(accessoriesCategories);
      setCategories(accessoriesCategories);
    } else if (type === "Children") {
      setSelectedCats(kidsCategories);
      setCategories(kidsCategories);
    }
  }, [type]);

  return (
    <div className="w-[80%] h-full p-5 bg-white-500 overflow-y-auto relative">
      {/* Close Button - visible on mobile drawer */}
      {onClose && (
        <button onClick={onClose} className="absolute top-5 right-5 text-4xl text-gray-500 hover:text-gray-800 z-10">
          &times;
        </button>
      )}

      {/* Search */}
      <div className="mb-8">
        <input type="text" placeholder="Search products..." className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#BD007C]" />
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
        }}>
        {type} Filter
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
          }}>
          Types
        </h4>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer">
              <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCategory(cat)} className="w-5 h-5 text-[#BD007C] rounded focus:ring-[#BD007C]" />
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
          }}>
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
          }}>
          Range: ${displayedMin} – ${displayedMax}
        </p>

        {/* PRICE RANGE CONTROLS AREA */}
        <div className="relative h-6 pt-2">
          {/* Hidden Sliders (z-indexes are key here) */}
          <input type="range" name="minPrice" min="0" max={MAX_RANGE} value={minPrice} onChange={handleRange} className="absolute w-full h-2 opacity-0 cursor-pointer z-10 top-2" />
          <input type="range" name="maxPrice" min="0" max={MAX_RANGE} value={maxPrice} onChange={handleRange} className="absolute w-full h-2 opacity-0 cursor-pointer z-20 top-2" />

          {/* Track */}
          <div className="relative h-2 bg-gray-300 rounded-full">
            <div className="absolute h-2 bg-[#BD007C] rounded-full" style={{ left: `${trackLeft}%`, width: `${trackWidth}%` }} />
          </div>

          {/* Knobs - Using absolute positioning relative to the 'h-6 pt-2' parent */}
          <div className="absolute w-6 h-6 bg-white border-4 border-[#BD007C] rounded-full top-0 shadow-lg" style={{ left: `calc(${(minPrice / MAX_RANGE) * 100}% - 12px)` }} />
          <div className="absolute w-6 h-6 bg-white border-4 border-[#BD007C] rounded-full top-0 shadow-lg" style={{ left: `calc(${(maxPrice / MAX_RANGE) * 100}% - 12px)` }} />
        </div>
      </div>

      <button onClick={applyFilters} className="w-full bg-[#BD007C] hover:bg-[#9b0066] text-white font-semibold text-[12px]  py-2  transition shadow-lg">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
