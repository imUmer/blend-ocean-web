import React, { useState } from "react";
import S2 from "../assets/images/S2";
import S3 from "../assets/images/S3";
import S1 from "../assets/images/S1";
import h1 from "../assets/images/h1.png";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:"../assets/images/h1.png",
      text: "Welcome to Our Platform",
    },
    {
      id: 2,
      image:"../assets/images/h1.png",
      text: "Explore Amazing Features",
    },
    {
      id: 3,
      image: "../assets/images/h1.png",
      text: "Join Us Today!",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className=" min-h-screen">
      {/* Hero Slider */}
      <div className="relative w-full h-[650px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              backgroundImage: `url('../assets/images/model.png')`,
              backgroundSize: "contain",
            }}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {slide.text}
              </h1>
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

      <div className="section ">
        <div className="w-full h-fit flex justify-center items-center flex-wrap m-8 lg:gap-10 gap-6 ">

          <div className="overflow-hidden w-80 rounded-xl bg-black">
            <div className="rounded-xl overflow-hidden w-full">
              <S1 />
              </div>
            <div className="bg-black flex items-center justify-center gap-9 p-2 font-semibold text-white text-center">
              <h1 className="text-2xl uppercase">Models</h1>
              <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
                Browse
              </button>
            </div>
          </div>
          <div className="bg-gray-900 overflow-hidden w-80 rounded-xl">
            <div className="rounded-xl overflow-hidden w-full">
            <S2 />
            </div>
            <div className="flex items-center justify-center gap-9 p-2 font-semibold text-white text-center">
              <h1 className="text-2xl uppercase">Models</h1>
              <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
                Browse
              </button>
            </div>
          </div>
          <div className="bg-gray-900 overflow-hidden w-80 rounded-xl">
            <div className="rounded-xl overflow-hidden w-full">
            <S3 />

            </div>
            <div className="flex items-center justify-center gap-9 p-2 font-semibold text-white text-center">
              <h1 className="text-2xl uppercase">Models</h1>
              <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
                Browse
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
