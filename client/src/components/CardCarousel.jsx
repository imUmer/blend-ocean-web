import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const images = [
    require("../assets/images/model.png"),
    require("../assets/images/model.png"),
    require("../assets/images/model.png"),
    require("../assets/images/model.png"),
    require("../assets/images/model.png"),
    require("../assets/images/model.png"),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3); // Default visible items (desktop)

  // Adjust visibleItems based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleItems(1); // Mobile view: one image at a time
      } else {
        setVisibleItems(3); // Default: three images
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - visibleItems) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden bg-black p-4">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-1/3 flex-shrink-0 px-2"
            style={{ flex: `0 0 ${100 / visibleItems}%` }}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="h-48 object-contain mx-auto rounded-md shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        disabled={currentIndex === 0}
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        disabled={currentIndex >= images.length - visibleItems}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
