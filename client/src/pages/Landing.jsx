import React, { useState } from "react";

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: "https://via.placeholder.com/1200x500", text: "Welcome to Our Platform" },
    { id: 2, image: "https://via.placeholder.com/1200x500", text: "Explore Amazing Features" },
    { id: 3, image: "https://via.placeholder.com/1200x500", text: "Join Us Today!" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Slider */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover" }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
              <h1 className="text-4xl md:text-6xl font-bold text-white">{slide.text}</h1>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 px-4 py-2 rounded-full"
          onClick={prevSlide}
        >
          &#9664;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 px-4 py-2 rounded-full"
          onClick={nextSlide}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
}