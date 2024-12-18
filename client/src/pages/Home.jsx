import React, { useState } from "react";
import h1 from "../assets/images/h1.png";
import model from "../assets/images/model.png";
import S1 from "../assets/images/S1";
import S2 from "../assets/images/S2";
import S3 from "../assets/images/S3";
import Carousel from "../components/Carousal";
import house from "../assets/images/house.jpeg";
import blend from "../assets/icons/blend.svg";
import fbx from "../assets/icons/fbx.svg";
import obj from "../assets/icons/obj.svg";

// const slides = [
//   "https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Slide+1",
//   "https://via.placeholder.com/600x400/00FF00/FFFFFF?text=Slide+2",
//   "https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Slide+3",
// ];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "../assets/images/model.png",
      text: "Welcome to Our Platform",
    },
    {
      id: 2,
      image: "../assets/images/model.png",
      text: "Explore Amazing Features",
    },
    {
      id: 3,
      image: "../assets/images/model.png",
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

      <div className="flex h-fit max-md:flex-col gap-10 max-md:px-1 max-md:p-1 p-20 px-20 justify-center items-center">
        <div className="text-white w-1/3 h-full flex flex-col gap-6">
          <h1 className="text-3xl">HIGH QUALITY FULLY OPTIMIZED 3D MODELS</h1>
          <p className="text-xs text-justify ">
            Fully optimized VR models can also reduce file size and memory
            usage, allowing for faster loading and rendering times.
          </p>
          <p className="text-xs text-justify ">
            The use of efficient geometry and texture compression techniques can
            also help to reduce the CPU and GPU workload.
          </p>
          <p className="text-xs text-justify ">
            Fully optimized game-ready models can also reduce file size and
            memory usage, allowing for faster loading and rendering times.
          </p>
          <p className="text-xs text-justify ">
            Fully optimized 3D models for architectural visualization (archviz)
            are designed to provide high-quality and realistic images of
            buildings and other structures.
          </p>
          <p className="text-xs text-justify ">
            Fully optimized AR models can also reduce file size and memory
            usage, allowing for faster loading and rendering times, and
            providing smooth experience for users.
          </p>
        </div>
        <div className=" w-2/4 pl-6">
          <img src={model} alt="" />
        </div>
      </div>

      <div className="bg-black">
        <div className="w-full bg-black flex flex-col items-center justify-center text-white">
          <h2 className="text-white text-2xl mt-4 font-bold uppercase">
            New Assets
          </h2>

          <Carousel slides={slides} interval={4000} />
          <div className="">
            <h1 className="text-white text-sm my-4 text-center  pb-5">
              " Sign in today to get rid of Ads and start exploring the endless
              possibilities of 3D modeling with Blend Ocean open-source library.
              "
            </h1>
          </div>
        </div>
      </div>

      <div className="flex h-fit max-md:flex-col gap-7 max-md:px-1 max-md:p-1 p-20 px-20 justify-center items-center">
        <div className="text-white w-1/3 h-full flex flex-col gap-2">
          <h1 className="text-xl font-semibold">
            HIGH QUALITY FULLY OPTIMIZED 3D MODELS
          </h1>
          <p className="text-xs text-justify ">
            A solution specifically tailored for architectural visualization
            professionals, offering a comprehensive 3D library to meet the
            evolving demands of architects and interior designers.
          </p>
          <h1 className="text-xl font-semibold">
            HIGH QUALITY FULLY OPTIMIZED 3D MODELS
          </h1>
          <p className="text-xs text-justify ">
            CC0 (Creative Commons Zero) is a type of public domain dedication
            that allows creators to waive all rights to their work and place it
            in the public domain.
          </p>
          <p className="text-xs text-justify ">
            This means that anyone can use, reproduce, modify, and distribute
            the work without obtaining permission or paying royalties.
          </p>
          <p className="text-xs text-justify ">
            You won't be asked to pay for it, nor will you need to go through a
            lengthy sign-up process. Enjoy hassle-free access to what you need -
            no hidden costs, no registration needed. Simply download what you
            need and start using it right away, without any worries.
          </p>
          <p className="text-xs text-justify ">
            Fully optimized AR models can also reduce file size and memory
            usage, allowing for faster loading and rendering times, and
            providing smooth experience for users.
          </p>
          <h1 className="text-xl font-semibold uppercase">
            blender native files, .fbx & .obj
            </h1>
            <div className="w-fit flex-wrap flex justify-between gap-6 mt-2">
                <img src={blend} alt="blend" className="p-2 bg-black rounded-xl" />
                <img src={fbx} alt="fbx"  className="p-2 bg-black rounded-xl" />
                <img src={obj} alt="obj"  className="p-2 bg-black rounded-xl" />
            </div>
        </div>
        <div className=" w-2/4 h-full pl-6">
          <img src={house} alt="" />
        </div>
      </div>
    </div>
  );
}
