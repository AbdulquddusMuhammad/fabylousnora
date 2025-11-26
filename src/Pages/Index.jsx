import React from "react";
import Hero from "../components/Hero";
import HeroBanner from "../components/HeroBanner";
import ProductSection from "../components/ProductSection";
import CategoryBanner from "../components/CategoryBanner";
import newArrival1 from "../components/IMG/newarrival1.jpg";
import newArrival2 from "../components/IMG/newArrival2.jpg";
import newArrival3 from "../components/IMG/newArrival3.jpg";
import newArrival4 from "../components/IMG/newArrival4.jpg";
import KidsBgImg from "../components/IMG/kidsbgImg.jpg";
import Jewelry1 from "../components/IMG/jewelry1.jpg";
import Jewelry2 from "../components/IMG/jewelry2.jpg";
import Jewelry3 from "../components/IMG/jewelry3.jpg";
import Jewelry4 from "../components/IMG/jewelry4.jpg";
import MenCategory from "../components/IMG/mencategory.jpg";
import WomenCategory from "../components/IMG/womencategory.jpg";

const Index = () => {
  const newArrivals = [
    { id: 1, image: newArrival1, title: "Ankara Fabric For Ladies", price: "300" },
    { id: 2, image: newArrival2, title: "Ankara Fabric For Ladies", price: "100" },
    { id: 3, image: newArrival3, title: "Ankara Fabric For Ladies", price: "100" },
    { id: 4, image: newArrival4, title: "Ankara Fabric For Ladies", price: "100" },
  ];

  const queensCollection = [
    { id: 5, image: newArrival3, title: "Ankara Fabric For Ladies", price: "300" },
    { id: 6, image: newArrival1, title: "Ankara Fabric For Ladies", price: "100" },
    { id: 7, image: newArrival4, title: "Ankara Fabric For Ladies", price: "100" },
    { id: 8, image: newArrival2, title: "Ankara Fabric For Ladies", price: "100" },
  ];

  const accessories = [
    { id: 9, image: Jewelry1, title: "Ankara Fabric For Ladies", price: "100" },
    { id: 10, image: Jewelry2, title: "Ankara Fabric For Ladies", price: "100" },
    { id: 11, image: Jewelry3, title: "Ankara Fabric For Ladies", price: "100" },
    { id: 12, image: Jewelry4, title: "Ankara Fabric For Ladies", price: "100" },
  ];

  return (
    <div className="min-h-screen bg-background">
      

      {/* Main Content */}
      <div className="py-4 px-[6%] md:px-[6%]">
        <Hero />

        {/* New Arrivals Section */}
        <ProductSection title="New Arrivals" products={newArrivals} />

        {/* Category Banners */}
        <section className="py-10">
          <div className="container mx-auto px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryBanner
                title={
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontStyle: "normal",
                      fontSize: "40px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                    }}
                  >
                    Men
                  </span>
                }
                image={MenCategory}
              />
              <CategoryBanner
                title={
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontStyle: "normal",
                      fontSize: "40px",
                      lineHeight: "100%",
                      letterSpacing: "0",
                    }}
                  >
                    Women
                  </span>
                }
                image={WomenCategory}
              />
            </div>
          </div>
        </section>

        {/* Queens Collection */}
        <ProductSection title="The Queens Collection" products={queensCollection} />

        {/* Hero Banner for Kids */}
        <HeroBanner title="Shop For Kids" image={KidsBgImg} />

        {/* Accessories Section */}
        <ProductSection title="Complete Your Look" products={accessories} />
      </div>
      <div className="w-full">
       </div>
    </div>
  );
};

export default Index;
