import React, { useState, useCallback } from "react";
import model from "../assets/images/model.png";
import S1 from "../assets/images/S1";
import S2 from "../assets/images/S2";
import S3 from "../assets/images/S3";
import house from "../assets/images/house.jpeg";
import blend from "../assets/icons/blend.svg";
import fbx from "../assets/icons/fbx.svg";
import obj from "../assets/icons/obj.svg";
import HeroSlider from "../components/HeroSlider";
import CardCarousel from "../components/CardCarousel";
import Support from "../components/Support";
import About from "../components/About";

// Static slide data (moved outside the component to prevent unnecessary re-creations)
const SLIDES = [
  { id: 1, image: model, text: "Welcome to Our Platform" },
  { id: 2, image: model, text: "Explore Amazing Features" },
  { id: 3, image: model, text: "Join Us Today!" },
];

// Reusable ProductCard component
const ProductCard = ({ ImageComponent, title }) => (
  <div className="bg-black overflow-hidden w-80 rounded-xl transition-all duration-500">
    <div className="rounded-xl overflow-hidden w-full group">
      <div className="transform transition-transform duration-500 group-hover:scale-110">
        <ImageComponent className="cursor-cell" />
      </div>
    </div>
    <div className="flex items-center justify-center gap-9 p-2 font-semibold text-white text-center">
      <h1 className="text-2xl uppercase">{title}</h1>
      <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
        Browse
      </button>
    </div>
  </div>
);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Optimized slide navigation using useCallback
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSlider />

      {/* Product Section */}
      <div className="product-section transition-all duration-1000">
        <div className="w-full h-fit flex justify-center items-center flex-wrap px-3 mt-4 py-6 lg:gap-10 gap-6">
          <ProductCard ImageComponent={S1} title="Models" />
          <ProductCard ImageComponent={S2} title="Textures" />
          <ProductCard ImageComponent={S3} title="HDRIs" />
        </div>
      </div>

      {/* High-Quality Section */}
      <div className="flex h-fit max-md:flex-col gap-10 max-md:px-1 max-md:p-1 p-5 mt-5 px-20 justify-center items-center transition-all duration-500">
        <div className="text-white text-center w-2/3 lg:w-1/3 h-full flex flex-col gap-6">
          <h1 className="text-md font-semibold sm:text-2xl md:text-start">
            HIGH QUALITY FULLY OPTIMIZED 3D MODELS
          </h1>
          {[
            "Fully optimized VR models can also reduce file size and memory usage, allowing for faster loading and rendering times.",
            "The use of efficient geometry and texture compression techniques can also help to reduce the CPU and GPU workload.",
            "Fully optimized game-ready models can also reduce file size and memory usage, allowing for faster loading and rendering times.",
            "Fully optimized 3D models for architectural visualization (archviz) are designed to provide high-quality and realistic images of buildings and other structures.",
            "Fully optimized AR models can also reduce file size and memory usage, allowing for faster loading and rendering times, and providing a smooth experience for users.",
          ].map((text, index) => (
            <p key={index} className="text-xs text-center sm:text-justify">
              {text}
            </p>
          ))}
        </div>
        <div className="p-3 md:w-2/3">
          <img src={model} alt="3D Model" className="rounded-xl transition-all duration-1000" />
        </div>
      </div>

      {/* CardCarousel Section */}
      <div className="bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl mt-4 mb-4 font-bold uppercase">New Assets</h2>
        <CardCarousel />
        <h1 className="text-sm my-4 text-center pb-5 px-5">
          "Sign in today to get rid of Ads and start exploring the endless
          possibilities of 3D modeling with Blend Ocean open-source library."
        </h1>
      </div>

      {/* Archviz Section */}
      <div className="flex h-fit max-md:flex-col gap-10 max-md:px-1 max-md:p-1 p-5 mt-5 px-20 justify-center items-center transition-all duration-1000">
        <div className="text-white text-center w-2/3 lg:w-1/3 h-full flex flex-col gap-6">
          {[
            { title: "Archviz Professionals", text: "A solution specifically tailored for architectural visualization professionals, offering a comprehensive 3D library to meet the evolving demands of architects and interior designers." },
            { title: "100% Free CC0", text: "CC0 (Creative Commons Zero) is a type of public domain dedication that allows creators to waive all rights to their work and place it in the public domain." },
            { title: "", text: "This means that anyone can use, reproduce, modify, and distribute the work without obtaining permission or paying royalties." },
            { title: "", text: "You won't be asked to pay for it, nor will you need to go through a lengthy sign-up process. Enjoy hassle-free access to what you need - no hidden costs, no registration needed. Simply download what you need and start using it right away, without any worries." },
            { title: "", text: "Fully optimized AR models can also reduce file size and memory usage, allowing for faster loading and rendering times, and providing a smooth experience for users." },
            { title: "Blender Native Files, .fbx & .obj", text: "" }
          ].map(({ title, text }, index) => (
            <div key={index}>
              {title && (
                <h1 className="uppercase text-md font-semibold sm:text-2xl md:text-start">{title}</h1>
              )}
              {text && (
                <p className="text-xs text-center sm:text-justify">{text}</p>
              )}
            </div>
          ))}

          <div className="w-full md:w-fit flex-wrap flex justify-center gap-6 mt-2 items-center">
            {[blend, fbx, obj].map((icon, index) => (
              <img key={index} src={icon} alt="file format" className="p-2 bg-black rounded-xl transition-all duration-1000" />
            ))}
          </div>
        </div>
        <div className="p-3 md:w-2/3">
          <img src={house} alt="Archviz" className="rounded-xl shadow-md shadow-black" />
        </div>
      </div>

      {/* Support and About Sections */}
      <Support />
      <About />
    </div>
  );
}
