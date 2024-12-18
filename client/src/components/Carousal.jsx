import React, { useRef, useState } from "react";
import "../assets/images/model.png"; // Replace with your actual image paths

const images = [
  require("../assets/images/model.png"),
  require("../assets/images/model.png"),
  require("../assets/images/model.png"),
  require("../assets/images/model.png"),
  require("../assets/images/model.png"),
  require("../assets/images/model.png"),
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  // Scroll Right Function
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Scroll Left Function
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Handle Mouse Down Event
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX); // Store initial mouse position
    setScrollStart(carouselRef.current.scrollLeft); // Save initial scroll position
    carouselRef.current.style.cursor = "grabbing"; // Change cursor style
    e.preventDefault(); // Prevent default drag behavior
  };

  // Handle Mouse Move Event
  const handleMouseMove = (e) => {
    if (!isDragging) return; // Exit if not dragging
    const xDiff = e.pageX - startX; // Calculate distance moved
    carouselRef.current.scrollLeft = scrollStart - xDiff; // Update scroll position
  };

  // Handle Mouse Up or Leave Event
  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = "grab"; // Reset cursor style
  };

  return (
    <div className="relative max-w-6xl mx-auto mt-8 bg-black p-4 text-center rounded-lg">
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
      >
        &#9664;
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="overflow-hidden whitespace-nowrap cursor-grab"
        style={{
          display: "flex",
          gap: "16px",
          scrollBehavior: "smooth",
          userSelect: "none", // Prevent text selection
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="min-w-[300px] h-[200px] flex-shrink-0 relative bg-black rounded-lg"
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg pointer-events-none"
              onDragStart={(e) => e.preventDefault()} // Disable drag behavior
            />
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
