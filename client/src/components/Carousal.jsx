import React, { useRef } from "react";
import "../assets/images/model.png"; // Adjust image path as necessary

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
  let isMouseDown = false;
  let startX, scrollLeft;

  // Right Scroll
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Left Scroll
  const scrollLeftButton = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Mouse Click and Hold Logic
  const handleMouseDown = (e) => {
    isMouseDown = true;
    carouselRef.current.classList.add("active");
    startX = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft = carouselRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isMouseDown = false;
    carouselRef.current.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative max-w-6xl mx-auto mt-8 bg-gray-900 p-4 text-center rounded-lg">

      {/* Left Button */}
      <button
        onClick={scrollLeftButton}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
      >
        &#9664;
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          display: "flex",
          gap: "16px",
          scrollBehavior: "smooth",
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
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
              onDragStart={(e) => e.preventDefault()} // Prevent image drag
            />
          </div>
        ))}
      </div>

      {/* Right Button */}
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
