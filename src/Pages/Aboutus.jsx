import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import FounderImg from "../components/IMG/founder.jpg";
import AboutUsImg from "../components/IMG/aboutusimgtwo.jpg";
import Heroimg from "../components/IMG/abouthero.png";

const AboutHero = () => {
  return (
    
    <section className="relative w-full h-[45vh] md:h-[52vh] flex items-center justify-center text-center overflow-hidden">
      <motion.img
        src={Heroimg}
        alt="Fabulous by Nora"
        className="absolute inset-0 w-full h-full object-cover object-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="relative z-10 text-white text-5xl md:text-6xl lg:text-7xl font-bold px-4"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
        }}
      >
        About Us
      </motion.h1>
    </section>
  );
};

function Aboutus() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AboutHero />

      {/* Founder Section */}
      <section className="px-[6%] my-12 md:my-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end h-full w-full md:w-1/2 mt-8 md:mt-0"
            >
              <div className="overflow-hidden h-full w-full bg-transparent max-h-[500px]">
                <img
                  src={FounderImg}
                  alt="Bukola Nora Oyetunji"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-start space-y-4 text-gray-700 text-xs md:text-sm leading-snug w-full md:w-1/2"
              style={{ fontFamily: '"Nunito Sans", sans-serif', background: "transparent" }}
            >
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                About The Founder
              </h2>
              <p>
                Bukola Nora Oyetunji is the visionary Founder and Creative Director behind Fabulous by Nora LLC, A fashion house known for its bold creativity, cultural elegance, and modern couture craftsmanship. Driven by a deep passion for storytelling through fashion, Bukola Nora creates designs that merge African heritage with contemporary luxury, resulting in pieces that are powerful, expressive, and unforgettable.
                Born and raised by a Nigerian mother (God rest her soul) who was into the sourcing and sales of African fabrics, Bukola was able to learn a lot. Bukola also learned a bit of fashion design from her mom which she has overtime developed into something bigger than she could have imagined. Through Fabulous by Nora, Bukola is carrying on her mom’s legacy.
              </p>
              <p>
                With an eye for detail and a love for vibrant textiles, especially Ankara and other African-inspired fabrics, Bukola transforms traditional elements into innovative silhouettes that redefine luxury and ready-to-wear fashion. Her work celebrates confidence, self-love, and individuality, empowering clients to embrace their unique beauty through exceptional design.
              </p>
              <p>
                Under her leadership, Fabulous by Nora continues to grow as a brand that offers memorable runway experiences, custom couture, bespoke outfits and distinctive seasonal collections. Bukola’s commitment to quality, sustainability, and artistic excellence shapes every stitch, making Fabulous by Nora a destination for those who desire fashion with meaning, depth, and undeniable presence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pink Container Section */}
      <section className="px-[6%] my-12 md:my-16">
        <div className="max-w-7xl mx-auto">
          <div className="h-[200px] bg-[#BD007C] rounded-lg shadow-md flex items-center px-6 md:px-26">
            <p className="text-white text-lg md:text-[24px] leading-tight font-['Playfair_Display'] italic tracking-wide text-center w-full">
              Fabulous by Nora is more than a fashion house it is luxury, culture,<br className="hidden md:block" />
              identity, and confidence woven into every stitch.<br /><br />
              Step into elegance. Step into heritage. Step into Fabulous by Nora.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="px-[6%] my-12 md:my-16 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-start space-y-4 text-gray-700 text-xs md:text-sm leading-snug w-full md:w-1/2"
              style={{ fontFamily: '"Nunito Sans", sans-serif', background: "transparent" }}
            >
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                About Us – Fabulous by Nora
              </h2>
              <p>
                Fabulous by Nora is a luxury African inspired fashion brand born from a deep passion
                for culture, creativity, and self-expression. Founded by Bukola Nora, a Nigerian and
                visionary designer whose love for storytelling through fabric inspires every collection,
                the brand transforms traditional African textiles into everyday wear as well as modern,
                runway-worthy masterpieces.
              </p>
              <p>
                At Fabulous by Nora, we blend the richness of African heritage with contemporary
                elegance using premium Ankara, Aso-Oke, Adire (tie-dye), Brocade, Tribal prints, and
                refined plains to create bold silhouettes that celebrate confidence, beauty, and
                individuality.
              </p>
              <p>
                Each design is crafted with precision, intention, and artistry, ensuring that
                every piece makes a statement and leaves a lasting impression. Our collections range
                from ready-to-wear essentials to bespoke couture, red-carpet pieces, bridal fashion,
                kids wear, menswear, and culturally inspired outfits. Whether you’re dressing for
                everyday elegance or a special occasion, our pieces are designed to uplift and
                empower you, reminding you that fashion should not only be worn it should be felt.
              </p>
              <p>
                As a brand, we are committed to creativity, inclusivity, sustainability, and the global
                elevation of African fashion. Every client becomes part of our family and story, and
                every outfit becomes a piece of wearable art.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end h-full w-full md:w-1/2 mt-8 md:mt-0"
            >
              <div className="overflow-hidden h-full w-full bg-transparent max-h-[500px]">
                <img
                  src={AboutUsImg}
                  alt="Bukola Nora Oyetunji"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;