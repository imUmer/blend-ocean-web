import React, { useRef, useState } from "react";
import logobo from "../assets/logos/logobo.svg";
import logo from "../assets/logos/logo.svg";
import logoa from "../assets/logos/logo.png";

const images = [
  require("../assets/images/h1.png"),
  require("../assets/images/h1.png"),
  require("../assets/images/h1.png"),
  require("../assets/images/h1.png"),
  require("../assets/images/h1.png"),
  require("../assets/images/h1.png"),
];

const HeroSlider = () => {
 

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full  mx-auto">
      {/* Carousel Container */}
      <div className="overflow-hidden ">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10095;
      </button>
      <div className="absolute z-30 md:bottom-[50%] bottom-[40%] w-full items-center flex justify-center mt-4 space-x-2">
      <div className="items-center flex flex-col justify-center mt-4 space-x-2">
        <img src={logoa} alt="logo" className="mx-auto mt-2 w-11  max-w:sm:hidden shadow-md cursor-crosshair md:w-32" />
        <img src={logo} alt="logo" className="mx-auto w-20 shadow-md cursor-crosshair md:w-44" />
        </div>
        </div>
      {/* Dots for Navigation */}
      <div className="absolute bottom-[10%] w-full items-center flex justify-center mt-4 space-x-2">
      <div className=" items-center flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index
                ? "bg-lime-300"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default HeroSlider;

