import { createContext } from "react";
import { useState } from "react";
import eventSample1 from "../components/IMG/eventSample1.png";
import eventSample2 from "../components/IMG/eventSample2.png";
import sample3 from "../components/IMG/sample3.png";
import sample4 from "../components/IMG/sample4.png";
import sample5 from "../components/IMG/sample5.png";
import sample6 from "../components/IMG/sample6.png";
import sample7 from "../components/IMG/sample7.png";
import sample8 from "../components/IMG/sample8.png";

///////////////////////////////////////////
///////////////////////////////////////////

import newArrival1 from "../components/IMG/newarrival1.jpg";
import newArrival2 from "../components/IMG/newarrival2.jpg";
import newArrival3 from "../components/IMG/newarrival3.jpg";
import newArrival4 from "../components/IMG/newarrival4.jpg";
import Jewelry1 from "../components/IMG/jewelry1.jpg";
import Jewelry2 from "../components/IMG/jewelry2.jpg";
import Jewelry3 from "../components/IMG/jewelry3.jpg";
import Jewelry4 from "../components/IMG/jewelry4.jpg";

// /////////////////////////men
// /////////////////////////men

import men1 from "../components/IMG/men1.png";
import men2 from "../components/IMG/men2.png";
import men3 from "../components/IMG/men3.png";
import men4 from "../components/IMG/men4.png";
import men5 from "../components/IMG/men5.png";
import men6 from "../components/IMG/men6.png";
import men7 from "../components/IMG/men7.png";
import men8 from "../components/IMG/men8.png";

// /////////////////////////children
// /////////////////////////children
import child1 from "../components/IMG/child1.png";
import child2 from "../components/IMG/child2.png";
import child3 from "../components/IMG/child3.png";
import child4 from "../components/IMG/child4.png";
import child5 from "../components/IMG/child5.png";
import child6 from "../components/IMG/child6.png";
import child7 from "../components/IMG/child7.png";
import child8 from "../components/IMG/child8.png";

//////////////////////////////////// more women
//////////////////////////////////// more women

import women1 from "../components/IMG/women1.png";
import women2 from "../components/IMG/women2.png";
import women3 from "../components/IMG/women3.png";
import women4 from "../components/IMG/women4.png";

///////////////////////////////////// more jewelry
import Jewelry5 from "../components/IMG/jewelry5.png";
import Jewelry6 from "../components/IMG/jewelry6.png";
import Jewelry7 from "../components/IMG/jewelry7.png";
import Jewelry8 from "../components/IMG/jewelry8.png";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [selectedCothes, setSelectedCothes] = useState(0);

  const DUMMY_PRODUCTS = [
    { id: 1, isEvent: false, type: "Women", title: "African Suit Set", price: 189.99, image: newArrival1, category: "Agbada", date: "2026-08-03" },
    { id: 2, isEvent: false, type: "Women", title: "Ankara Shirt & Trousers", price: 125.5, image: newArrival2, category: "Shirts", date: "2026-07-22" },
    { id: 3, isEvent: false, type: "Women", title: "Dashiki Robe", price: 210.0, image: newArrival3, category: "Kaftan", date: "2026-05-01" },
    { id: 4, isEvent: false, type: "Women", title: "Brocade Agbada", price: 350.0, image: newArrival4, category: "Agbada", date: "2026-06-24" },
    { id: 5, isEvent: false, type: "Accessories", title: "Woven Fedora Hat", price: 45.0, image: Jewelry1, category: "Footwear", date: "2026-07-16" },
    { id: 6, isEvent: false, type: "Accessories", title: "Leather Sandals", price: 85.0, image: Jewelry2, category: "Footwear", date: "2026-03-21" },
    { id: 7, isEvent: false, type: "Accessories", title: "Casual Kaftan", price: 95.0, image: Jewelry3, category: "Kaftan", date: "2026-08-01" },
    { id: 8, isEvent: false, type: "Accessories", title: "Designer Print Shirt", price: 155.0, image: Jewelry4, category: "Shirts", date: "2026-06-06" },
    { id: 9, isEvent: false, type: "Men", title: "Traditional Buba & Iro", price: 120.0, image: men1, category: "Buba", date: "2026-05-28" },
    { id: 10, isEvent: false, type: "Men", title: "Ankara Jacket", price: 80.0, image: men2, category: "Jackets", date: "2026-04-19" },
    { id: 11, isEvent: false, type: "Men", title: "Kaftan", price: 300.0, image: men3, category: "Kaftan", date: "2026-08-10" },
    { id: 12, isEvent: false, type: "Men", title: "Sleek Jacket", price: 280.0, image: men4, category: "Jackets", date: "2026-02-18" },
    { id: 13, isEvent: false, type: "Men", title: "Agbada", price: 122.0, image: men5, category: "Agbada", date: "2026-07-29" },
    { id: 14, isEvent: false, type: "Men", title: "Designer Ankara Jacket", price: 190.0, image: men6, category: "Jackets", date: "2026-08-08" },
    { id: 15, isEvent: false, type: "Men", title: "Kaftan", price: 100.0, image: men7, category: "Kaftan", date: "2026-08-05" },
    { id: 16, isEvent: false, type: "Men", title: "Ankara Jacket", price: 100.0, image: men8, category: "Jackets", date: "2026-03-02" },
    { id: 17, isEvent: false, type: "Children", title: "Kids Buba & Iro", price: 60.0, image: child1, category: "Buba", date: "2026-07-09" },
    { id: 18, isEvent: false, type: "Children", title: "Ankara Dress", price: 50.0, image: child2, category: "Dresses", date: "2026-07-02" },
    { id: 19, isEvent: false, type: "Children", title: "Casual Kaftan", price: 55.0, image: child3, category: "Kaftan", date: "2026-05-14" },
    { id: 20, isEvent: false, type: "Children", title: "Ankara Shirt & Shorts", price: 45.0, image: child4, category: "Shirts", date: "2026-06-15" },
    { id: 21, isEvent: false, type: "Children", title: "Traditional Buba & Iro", price: 65.0, image: child5, category: "Buba", date: "2026-08-09" },
    { id: 22, isEvent: false, type: "Children", title: "Ankara Jacket", price: 70.0, image: child6, category: "Jackets", date: "2026-03-21" },
    { id: 23, isEvent: false, type: "Children", title: "Kaftan", price: 75.0, image: child7, category: "Kaftan", date: "2026-05-28" },
    { id: 24, isEvent: false, type: "Children", title: "Ankara Dress", price: 80.0, image: child8, category: "Dresses", date: "2026-04-05" },
    { id: 25, isEvent: false, type: "Women", title: "Elegant Gown", price: 250.0, image: women1, category: "Dresses", date: "2026-07-20" },
    { id: 26, isEvent: false, type: "Women", title: "Ankara Skirt & Blouse", price: 150.0, image: women2, category: "Skirts", date: "2026-06-12" },
    { id: 27, isEvent: false, type: "Women", title: "Kaftan", price: 200.0, image: women3, category: "Kaftan", date: "2026-08-03" },
    { id: 28, isEvent: false, type: "Women", title: "Brocade Gown", price: 300.0, image: women4, category: "Dresses", date: "2026-07-25" },
    { id: 29, isEvent: false, type: "Accessories", title: "Brocade Gown", price: 350.0, image: Jewelry5, category: "Golden", date: "2026-07-25" },
    { id: 30, isEvent: false, type: "Accessories", title: "Brocade Gown", price: 310.0, image: Jewelry6, category: "Silver", date: "2026-03-22" },
    { id: 31, isEvent: false, type: "Accessories", title: "Brocade Gown", price: 200.0, image: Jewelry7, category: "Emerald", date: "2026-04-16" },
    { id: 32, isEvent: false, type: "Accessories", title: "Brocade Gown", price: 120.0, image: Jewelry8, category: "Bronze", date: "2026-07-15" },
    { id: 33, isEvent: true, type: "Women", title: "StreetOuk", price: 230, image: eventSample1, category: "Event", date: "12-04-2026" },
    { id: 34, isEvent: true, type: "Women", title: "Balancing", price: 55, image: eventSample2, category: "Event", date: "12-04-2026" },
    { id: 35, isEvent: true, type: "Women", title: "StreetOuk", price: 90, image: sample4, category: "Event", date: "12-04-2026" },
    { id: 36, isEvent: true, type: "Women", title: "Korede", price: 100, image: sample3, category: "Event", date: "12-04-2026" },
    { id: 37, isEvent: true, type: "Women", title: "StreetOuk", price: 200, image: sample4, category: "Event", date: "12-04-2026" },
    { id: 38, isEvent: true, type: "Women", title: "Balancing", price: 180, image: sample5, category: "Event", date: "12-04-2026" },
    { id: 39, isEvent: true, type: "Women", title: "Optimuz", price: 250, image: sample7, category: "Event", date: "12-04-2026" },
    { id: 40, isEvent: true, type: "Women", title: "StreetOuk", price: 99, image: sample6, category: "Event", date: "12-04-2026" },
    { id: 41, isEvent: true, type: "Women", title: "StreetOuk", price: 110, image: sample4, category: "Event", date: "12-04-2026" },
    { id: 42, isEvent: true, type: "Women", title: "StreetOuk", price: 120, image: sample8, category: "Event", date: "12-04-2026" },
  ];

  const [type, setType] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return <AppContext.Provider value={{ selectedCothes, setSelectedCothes, DUMMY_PRODUCTS, type, setType, showCart, setShowCart, cartItems, setCartItems }}>{children}</AppContext.Provider>;
};
export { AppContext, AppProvider };

export default AppProvider;
