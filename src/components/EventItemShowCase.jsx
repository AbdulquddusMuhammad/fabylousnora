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
      <div className="px-4 md:px-16 my-8 text-center min-h-[50vh] flex flex-col justify-center">
        <p className="text-gray-500 mb-4 text-xl">No event selected.</p>
        <Link to="/events" className="inline-block px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">Go back to Gallery</Link>
      </div>
    );
  }

  // Combine cover and gallery into one array for the slideshow if needed, or keep separate
  const allImages = [];
  if (selectedEvent.cover_image_url) allImages.push({ id: 'cover', image_url: selectedEvent.cover_image_url });
  if (selectedEvent.event_gallery) allImages.push(...selectedEvent.event_gallery);

  return (
    <>
      {showImage && (
        <div className="seeImage h-screen w-screen fixed top-0 left-0 z-50 bg-[#000000FA] flex justify-center items-center backdrop-blur-sm">
          <img src={selectedImage} alt={""} className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-sm" />
          <div className="cancelButton absolute top-6 right-6 md:top-10 md:right-10 cursor-pointer bg-white/20 p-3 rounded-full hover:bg-white/40 transition" onClick={() => setShowImage(false)}>
            <img src={cancelButton} className="w-6 h-6 invert" alt="Cancel" />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#fafafa]">
        {/* Navigation Breadcrumb */}
        <div className="px-4 md:px-16 py-6 border-b border-gray-200 bg-white">
          <div className="title flex items-center text-sm md:text-base font-medium">
            <Link to="/events" className="text-pink-600 hover:text-pink-800 transition">
              Gallery
            </Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-gray-800 truncate">{selectedEvent.title}</span>
          </div>
        </div>

        {/* Hero Section: Cover Image & Details */}
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Left: Cover Image */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              {selectedEvent.cover_image_url ? (
                <div
                  className="aspect-[4/3] w-full rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow relative group"
                  onClick={() => handleViewImage(selectedEvent.cover_image_url)}
                >
                  <img
                    src={selectedEvent.cover_image_url}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-black px-4 py-2 rounded-full font-medium text-sm">Click to expand</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  <p>No cover image</p>
                </div>
              )}
            </div>

            {/* Right: Description & Info */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col pt-2 md:pt-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {selectedEvent.title}
              </h1>

              {selectedEvent.date && (
                <div className="flex items-center text-pink-600 font-medium mb-6 bg-pink-50 self-start px-4 py-2 rounded-full">
                  <img src={calenderIcon} className="w-5 h-5 mr-2" alt="Calendar" />
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </div>
              )}

              <div className="prose prose-pink max-w-none text-gray-600 leading-relaxed text-lg flex-grow">
                {selectedEvent.description ? (
                  <p className="whitespace-pre-line">{selectedEvent.description}</p>
                ) : (
                  <p className="italic text-gray-400">No description provided for this event.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Slideshow / Grid */}
        {selectedEvent.event_gallery && selectedEvent.event_gallery.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 md:px-16 py-8 mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Event Gallery</h2>
              <span className="text-sm font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {selectedEvent.event_gallery.length} Photos
              </span>
            </div>

            {/* Horizontal Scrollable Gallery (Slideshow-like) */}
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scroll-bar">
              {selectedEvent.event_gallery.map((galleryItem, index) => (
                <div
                  onClick={() => handleViewImage(galleryItem.image_url)}
                  key={galleryItem.id || index}
                  className="flex-none w-[75vw] md:w-[40vw] lg:w-[30vw] aspect-square md:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 snap-center group"
                >
                  <img
                    src={galleryItem.image_url}
                    alt={`${selectedEvent.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                </div>
              ))}
            </div>

            <style jsx>{`
              .hide-scroll-bar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .hide-scroll-bar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}
      </div>
    </>
  );
};

export default EventItemShowCase;
