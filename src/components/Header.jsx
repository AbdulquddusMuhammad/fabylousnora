import { use, useState } from "react";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import NoraLogo from "./IMG/noralogo.png";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/context";

const Header = () => {
  const { setType } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // ← fixed here
  const { setShowCart } = useContext(AppContext);

  const categories = ["All", "Men", "Women", "Children", "Accessories"];

  const topLinks = [
    { name: "Shop", to: "/" },
    { name: "About Us", to: "/aboutus" },
    { name: "Custom Orders", to: "/custom" },
    { name: "Refund Policy", to: "/refund" },
    { name: "Events", to: "/events" },
  ];

  return location.pathname === "/events" || location.pathname === "/events/eventitem" || location.pathname === "/success" || location.pathname === "/" ? (
    <></>
  ) : (
    <header className="bg-white sticky top-0 z-50">
      {/* Top Header */}
      <div className="py-4 px-[6%]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center gap-3 flex-shrink-0">
            <img src={NoraLogo} alt="Fabulous by Nora Logo" className="w-10 h-10 object-contain" />
            <h1
              className="hidden md:block text-xl md:text-2xl"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: "#BD007C",
              }}>
              FABULOUS BY NORA
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {topLinks.map((link) =>
              link.to ? (
                <Link key={link.name} to={link.to} className="hover:text-[#BD007C] transition">
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className="hover:text-[#BD007C] transition">
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Icons + Hamburger */}
          <div className="flex items-center gap-4">
            <button className="hover:text-[#BD007C] transition">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => setShowCart(true)} className="hover:text-[#BD007C] transition">
              <ShoppingCart className="w-5 h-5" />
            </button>

            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden hover:text-[#BD007C] transition">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200"></div>

      {/* Category Navigation */}

      <div className="px-[6%] py-4 overflow-x-auto scrollbar-hide">
        <nav className="flex items-center gap-3 min-w-max">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={cat === "All" ? "/" : `/category/${cat.toLowerCase()}`}
              onClick={() => {
                setActiveCategory(cat);
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 500);
                setType(cat);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${activeCategory === cat ? "bg-[#BD007C] text-white" : "text-[#BD007C] bg-[#CCCCCC1A] hover:bg-[#BD007C] hover:text-white"}`}>
              {cat}
              {/* {alert(cat)} */}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar Menu – 85% width */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${mobileMenuOpen ? "opacity-50" : "opacity-0"}`} onClick={() => setMobileMenuOpen(false)} />

        {/* Sidebar Panel */}
        <div className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-2xl font-bold text-[#BD007C]" style={{ fontFamily: '"Playfair Display", serif' }}>
              Menu
            </h3>
            <button onClick={() => setMobileMenuOpen(false)} className="hover:text-[#BD007C] transition">
              <X className="w-8 h-8" />
            </button>
          </div>

          <nav className="px-4 pt-6 space-y-6">
            {topLinks.map((link) => (
              <div key={link.name}>
                {link.to ? (
                  <Link to={link.to} onClick={() => setMobileMenuOpen(false)} className="block text-xl font-medium text-gray-800 hover:text-[#BD007C] transition-all duration-300">
                    {link.name}
                  </Link>
                ) : (
                  <a href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-2xl font-medium text-gray-800 hover:text-[#BD007C] transition-all duration-300">
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
