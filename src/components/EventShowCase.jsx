import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import calenderIcon from "../components/IMG/calendar.svg";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "../context/context.jsx";

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

import React from "react";
import galleryHero from "../components/IMG_WEBP/Fabulous gallery.webp";

const EventShowCase = () => {
  const { eventsData, setSelectedEvent } = useContext(AppContext);

  const navigate = useNavigate();

  const navigateToEventItem = () => {
    navigate("/events/eventitem");
  };

  return (
    <div>
      <div className="w-screen h-auto relative">
        <div className="topHerobg w-full h-[50vh] relative bg-cover flex justify-center items-center bg-center" style={{ backgroundImage: `url(${galleryHero})` }}>
          <div className="bgOpacity absolute inset-0 bg-black opacity-50 z-10"></div>
          <span style={{ fontFamily: "Playfair Display" }} className="text-white font-bold text-[8vh] z-20">
            Gallery
          </span>
        </div>

        {/* <div className="eventsClothes grid grid-cols-4 gap-auto bg-white p-16"> */}
        <div className="eventsClothes grid grid-cols-2 lg:grid-cols-4 bg-white justify-between mt-10 px-4 md:px-16 mt-20">
          {(() => {
            // Group events by title to show unique events
            const uniqueEvents = [];
            const seenTitles = new Set();

            eventsData.forEach(event => {
              if (!seenTitles.has(event.title)) {
                seenTitles.add(event.title);
                uniqueEvents.push(event);
              }
            });

            return uniqueEvents.map((event, index) => (
              <div
                onClick={() => {
                  setSelectedEvent(event);
                  navigateToEventItem();
                }}
                key={event.id}
                className="eventProductCard shadow-lg rounded-lg w-[45vw] lg:w-[21vw]  px-3 mb-6 hover:scale-105 transition-transform cursor-pointer duration-400">
                <img src={event.cover_image_url} alt={event.title} className="eventProductImage w-full h-[30vh] md:h-[40vh] object-cover" />
                <div className="flex justify-between p-2 md:p-5">
                  <div className="text-[2.5vw] md:text-[1.2vw]" style={{ fontFamily: "Playfair Display" }}>
                    {event.title}
                  </div>
                  <div style={{ fontFamily: "Manrope" }} className="text-[2.5vw] md:text-[1.2vw]">
                    {eventsData.filter((item) => item.title === event.title).length} Images
                  </div>
                </div>
                <div className="flex pb-1.5 px-2 md:pb-5 md:px-5 items-center">
                  <img src={calenderIcon} alt="Calendar Icon" className="w-[3vw] md:w-5 md:h-5" />
                  <div className="ml-2 text-[#00000080] text-[2vw] md:text-[1.2vw]" style={{ fontFamily: "Manrope" }}>
                    {event.date}
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
};

export default EventShowCase;
