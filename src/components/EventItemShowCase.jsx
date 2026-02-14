import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/context";
import calenderIcon from "../components/IMG/calendar.svg";
import cancelButton from "../components/IMG/cancelIcon.svg";
import { Link } from "react-router-dom";

const EventItemShowCase = () => {
  const { eventProductsClothes, selectedCothes, productsData } = useContext(AppContext);

  const [{ name: title }] = productsData;

  const [showImage, setShowImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  // console.log(useContext(AppContext));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleViewImage = (image) => {
    setShowImage(true);
    setSelectedImage(image);
  };

  return (
    <>
      {showImage && (
        <div className="seeImage h-screen w-screen fixed top-0 left-0 z-50 bg-[#000000CC] flex justify-center items-center">
          <img src={selectedImage} alt={""} className="max-w-full max-h-full object-contain" />
          {/* <div className="imageContainer w-[80vw] h-[80vh] bg-white rounded-lg flex justify-center items-center">
        </div> */}
          <div className="cancelButton absolute top-[2rem] right-[2rem] cursor-pointer" onClick={() => setShowImage(false)}>
            <img src={cancelButton} className="w-5 h-5" alt="Cancel" />
          </div>
        </div>
      )}
      <div className="px-4 md:px-16 my-8">
        <div className="title ">
          <Link to="/events" className="text-[#000000CC] text-[2.5vw] md:text-[1.2vw]">
            <span className="text-[#00000066]">Gallery</span>
          </Link>{" "}
          / {productsData[selectedCothes]?.title}
        </div>
        <div className="eventsClothes grid grid-cols-2 md:grid-cols-4 bg-white justify-between mt-10 ">
          {productsData
            .filter((product, index) => product.title === productsData[selectedCothes].title)
            .map((product, index) => (
              <div onClick={() => handleViewImage(product.image)} key={index} className="eventProductCard shadow-lg rounded-lg w-[45vw] md:w-[21vw] px-3 mb-6 hover:scale-105 transition-transform cursor-pointer duration-400">
                <img src={product.image} alt={product.title} className="eventProductImage w-full h-[30vh] md:h-[40vh]" />
                {/* <div className="flex justify-between p-2 md:p-5">
                  <div className="text-[2.5vw] md:text-[1.2vw]" style={{ fontFamily: "Playfair Display" }}>
                    {product.name}
                  </div>
                  <div style={{ fontFamily: "Manrope" }} className="text-[2.5vw] md:text-[1.2vw]">
                    {product.no_ofImages} Images
                  </div>
                </div> */}
                {/* <div className="flex pb-1.5 md:pb-5 px-2 md:px-5 items-center">
                  <img src={calenderIcon} alt="Calendar Icon" className="w-[3vw] md:w-5 md:h-5" />
                  <div className="ml-2 text-[#00000080] text-[2vw] md:text-[1.2vw]" style={{ fontFamily: "Manrope" }}>
                    {product.date}
                  </div>
                </div> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default EventItemShowCase;
