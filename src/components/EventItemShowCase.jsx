import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/context";
import calenderIcon from "../components/IMG/calendar.svg";
import cancelButton from "../components/IMG/cancelIcon.svg";
import { Link } from "react-router-dom";

const EventItemShowCase = () => {
  const { eventsData, selectedEvent } = useContext(AppContext);

  const [showImage, setShowImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

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

  if (!selectedEvent) {
    return (
      <div className="px-4 md:px-16 my-8 text-center">
        <p className="text-gray-500">No event selected. <Link to="/events" className="text-pink-600 underline">Go back to Gallery</Link></p>
      </div>
    );
  }

  return (
    <>
      {showImage && (
        <div className="seeImage h-screen w-screen fixed top-0 left-0 z-50 bg-[#000000CC] flex justify-center items-center">
          <img src={selectedImage} alt={""} className="max-w-full max-h-full object-contain" />
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
          / {selectedEvent.title}
        </div>
        <div className="eventsClothes grid grid-cols-2 md:grid-cols-4 bg-white justify-between mt-10 ">
          {eventsData
            .filter((event) => event.title === selectedEvent.title)
            .map((event, index) => (
              <div onClick={() => handleViewImage(event.cover_image_url)} key={event.id} className="eventProductCard shadow-lg rounded-lg w-[45vw] md:w-[21vw] px-3 mb-6 hover:scale-105 transition-transform cursor-pointer duration-400">
                <img src={event.cover_image_url} alt={event.title} className="eventProductImage w-full h-[30vh] md:h-[40vh] object-cover" />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default EventItemShowCase;
