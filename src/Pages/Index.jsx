import React from "react";
import Hero from "../components/Hero";
import HeroBanner from "../components/HeroBanner";
import ProductSection from "../components/ProductSection";
import CategoryBanner from "../components/CategoryBanner";

// Images
import newArrival1 from "../components/IMG_WEBP/newarrival1.webp";
import newArrival2 from "../components/IMG_WEBP/newarrival2.webp";
import newArrival3 from "../components/IMG_WEBP/newarrival3.webp";
import newArrival4 from "../components/IMG_WEBP/newarrival4.webp";
import KidsBgImg from "../components/IMG_WEBP/kidsbgImg.webp";
import Jewelry1 from "../components/IMG_WEBP/jewelry1.webp";
import Jewelry2 from "../components/IMG_WEBP/jewelry2.webp";
import Jewelry3 from "../components/IMG_WEBP/jewelry3.webp";
import Jewelry4 from "../components/IMG_WEBP/jewelry4.webp";
import MenCategory from "../components/IMG_WEBP/mencategory.webp";
import WomenCategory from "../components/IMG_WEBP/womencategory.webp";
import { useContext } from "react";
import { AppContext } from "../context/context";

const Index = () => {
  const { productsData } = useContext(AppContext);

  const newArrivals = productsData.filter((product) => {
    return product.type === "Men";
  });

  const queensCollection = productsData
    .filter((product) => product.type === "Women")
    // Sort by date descending (newest first)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    // Take only the first 8 products
    .slice(0, 8);

  const accessories = productsData
    .filter((product) => product.type === "Accessories")
    // Sort by date descending (newest first)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    // Take only the first 8 products
    .slice(0, 8);

  return (
    <div className="bg-background min-h-screen">
      <div className="w-full">
        <Hero />
      </div>

      <main className="w-full">
        {/* New Arrivals */}
        <section className="pt-8 pb-12">
          <ProductSection title="Kings Collection" products={newArrivals} />
        </section>

        {/* Men & Women Category */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            <CategoryBanner
              title={
                <span className="text-1xl sm:text-3xl md:text-4xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Men
                </span>
              }
              image={MenCategory}
            />
            <CategoryBanner
              title={
                <span className="text-1xl sm:text-3xl md:text-4xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Women
                </span>
              }
              image={WomenCategory}
            />
          </div>
        </section>

        {/* Queens Collection */}
        <section className="pb-12">
          <ProductSection title="The Queens Collection" products={queensCollection} />
        </section>

        {/* Kids Banner */}
        <section className="w-full">
          <HeroBanner title="Kids" image={KidsBgImg} />
        </section>

        {/* Accessories */}
        <section className="pt-12 pb-16">
          <ProductSection title="Complete Your Look" products={accessories} />
        </section>
      </main>
    </div>
  );
};

export default Index;
