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
    <div className="min-h-screen bg-[#fafafa]">
      <div className="w-full relative">
        {/* Banner */}
        <div className="topHerobg w-full h-[40vh] md:h-[50vh] relative bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${galleryHero})` }}>
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <h1 style={{ fontFamily: "Playfair Display" }} className="text-white font-bold text-5xl md:text-6xl lg:text-7xl z-20 tracking-wide">
            Our Gallery
          </h1>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {eventsData.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  navigateToEventItem();
                }}
                className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Card Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={event.cover_image_url || "https://via.placeholder.com/600x450?text=No+Cover"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />

                  {/* Image Count Pill Overlay */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
                    {((event.event_gallery?.length || 0) + (event.cover_image_url ? 1 : 0))} Images
                  </div>

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2" style={{ fontFamily: "Playfair Display" }}>
                    {event.title}
                  </h3>

                  {/* Spacer to push footer to bottom */}
                  <div className="flex-grow"></div>

                  {/* Meta / Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-pink-600">
                      <img src={calenderIcon} alt="Date" className="w-4 h-4 mr-2 opacity-70" />
                      <span className="text-sm font-medium" style={{ fontFamily: "Manrope" }}>
                        {event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Ongoing'}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-gray-400 group-hover:text-pink-600 transition-colors duration-300">
                      View Gallery &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {eventsData.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <h3 className="text-2xl font-semibold mb-2">No Events Found</h3>
              <p>Check back later for new gallery updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventShowCase;
