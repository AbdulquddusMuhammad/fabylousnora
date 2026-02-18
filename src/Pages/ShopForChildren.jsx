import React from "react";

import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/context";
import { motion } from "framer-motion";
import Heroimg from "../components/IMG_WEBP/abouthero.webp";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard.jsx"; // Adjust the path as needed
import childrenHeroImg from "../components/IMG_WEBP/childrenhero.webp"; // Assuming this is the correct path for the hero image

import Pagination from "../components/Pagination";
import ProductSkeleton from "../components/ProductSkeleton";

const ShopForChildren = () => {
  const { productsData, type, loading } = useContext(AppContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState("default"); // New state for sorting

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Update local products when context data changes
  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

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
    const filtered = productsData.filter((p) => {
      const catOk = categories.length === 0 || categories.includes(p.category);
      const priceOk = p.price >= priceRange[0] && p.price <= priceRange[1];
      return catOk && priceOk;
    });
    setProducts(applySorting(filtered, sortOption));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setProducts(applySorting(products, newSortOption));
  };

  const typeFiltered = products.filter((product) => product.type === "Children");
  const totalItems = typeFiltered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentProducts = typeFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CORRECTED: Define gridColumnClasses to ONLY contain the column definitions
  const gridColumnClasses = isFilterOpen ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4";

  return (
    <>
      <section className="relative w-full h-[45vh] md:h-[52vh] flex items-center justify-center overflow-hidden">
        <motion.img src={childrenHeroImg} alt="Shop For Children" className="absolute inset-0 w-full h-full object-cover object-center" style={{ objectPosition: "0 -110px" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
        <div className="absolute inset-0 bg-black/50" />
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative z-10 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center px-4 leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
          Children
        </motion.h1>
      </section>

      <main className="py-8 px-4 sm:px-6 lg:px-[6%] max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-6 w-full sm:w-auto">
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 text-[#BD007C] font-semibold hover:text-[#9b0066] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-4 8h4m-8-8h8m-8 8h4m-8 8h8" />
              </svg>
              Filters {isFilterOpen ? "(Hide)" : "(Show)"}
            </button>

            <p className="text-gray-600 font-medium">
              {loading ? "Loading..." : `${totalItems} product${totalItems !== 1 ? "s" : ""} found`}
            </p>
          </div>

          <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#BD007C]" value={sortOption} onChange={handleSortChange}>
            <option
              value="default"
              style={{
                fontFamily: "Nunito Sans",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}>
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
              }}>
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
              }}>
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
            className="hidden lg:block flex-shrink-0 overflow-hidden">
            <div className="w-80 xl:w-96 bg-white h-full">
              <FilterSidebar onApply={handleApplyFilters} />
            </div>
          </motion.aside>

          <div className="flex-1">
            {/* CORRECTED LINE: Combine static grid/gap with dynamic column classes */}
            <div className={`grid gap-6 md:gap-8 ${gridColumnClasses}`}>
              {/* {console.log(type)} */}
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                : currentProducts.map((product) => (
                  <ProductCard key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} />
                ))}
            </div>

            {!loading && currentProducts.length === 0 && <p className="text-center text-gray-500 py-20 text-xl font-medium">No products match your filters. Try adjusting them!</p>}

            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>

        {isFilterOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setIsFilterOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-y-0 left-0 w-[88%] bg-white z-50 shadow-2xl lg:hidden">
              <FilterSidebar onApply={handleApplyFilters} onClose={() => setIsFilterOpen(false)} />
            </motion.div>
          </>
        )}
      </main>
    </>
  );
};

export default ShopForChildren;
