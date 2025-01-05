import React, { useState } from "react";
// import h1 from "../assets/images/h1.png";
import model from "../assets/images/model.png";
import S1 from "../assets/images/S1";
import S2 from "../assets/images/S2";
import S3 from "../assets/images/S3";
import Carousel from "../components/Carousel";
import house from "../assets/images/house.jpeg";
import blend from "../assets/icons/blend.svg";
import fbx from "../assets/icons/fbx.svg";
import obj from "../assets/icons/obj.svg";
import HeroSlider from "../components/HeroSlider";
import CardCarousel from "../components/CardCarousel";
import Support from "../components/Support";
import About from "../components/About";

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
      <HeroSlider />

      <div className="product-section">
        <div className="w-full h-fit flex justify-center items-center flex-wrap px-3 mt-4 py-6 lg:gap-10 gap-6 ">
          <div className="overflow-hidden w-80 rounded-xl bg-black">
            <div className="rounded-xl overflow-hidden w-full group">
              <div className="transform transition-transform duration-500 group-hover:scale-110">
                <S1 className="cursor-cell" />
              </div>
            </div>
            <div className="bg-black flex items-center justify-center gap-9 p-2 font-semibold text-white text-center">
              <h1 className="text-2xl uppercase">Models</h1>
              <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
                Browse
              </button>
            </div>
          </div>

          <div className="bg-black overflow-hidden w-80 rounded-xl">
            <div className="rounded-xl overflow-hidden w-full group">
              <div className="transform transition-transform duration-500 group-hover:scale-110">
              <S2 className="cursor-cell"/>
            </div>
            </div>
            <div className="flex items-center justify-center gap-9 p-2 font-semibold text-white text-center">
              <h1 className="text-2xl uppercase">Textures</h1>
              <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
                Browse
              </button>
            </div>
          </div>
          <div className="bg-black overflow-hidden w-80 rounded-xl">
            <div className="rounded-xl overflow-hidden w-full group">
              <div className="transform transition-transform duration-500 group-hover:scale-110">
              <S3 className="cursor-cell"/>
            </div>
            </div>
            <div className="flex items-center justify-center gap-9 p-2 font-semibold text-white text-center">
              <h1 className="text-2xl uppercase">HDRIs</h1>
              <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
                Browse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HIGH QUALITY  */}
      <div className="flex h-fit max-md:flex-col gap-10 max-md:px-1 max-md:p-1 p-5 mt-5 px-20 justify-center items-center">
        <div className="text-white text-center w-2/3 lg:w-1/3 h-full flex flex-col gap-6">
          <h1 className=" text-md font-semibold sm:text-2xl md:text-start">HIGH QUALITY FULLY OPTIMIZED 3D MODELS</h1>
          <p className="text-xs text-center sm:text-justify ">
            Fully optimized VR models can also reduce file size and memory
            usage, allowing for faster loading and rendering times.
          </p>
          <p className="text-xs text-center sm:text-justify ">
            The use of efficient geometry and texture compression techniques can
            also help to reduce the CPU and GPU workload.
          </p>
          <p className="text-xs text-center sm:text-justify ">
            Fully optimized game-ready models can also reduce file size and
            memory usage, allowing for faster loading and rendering times.
          </p>
          <p className="text-xs text-center sm:text-justify ">
            Fully optimized 3D models for architectural visualization (archviz)
            are designed to provide high-quality and realistic images of
            buildings and other structures.
          </p>
          <p className="text-xs text-center sm:text-justify ">
            Fully optimized AR models can also reduce file size and memory
            usage, allowing for faster loading and rendering times, and
            providing smooth experience for users.
          </p>
        </div>
        <div className="p-3 md:w-2/3">
          <img src={model} alt="" />
        </div>
      </div>

      {/* CardCarousel */}
      <div className="bg-black">
        <div className="w-full bg-black flex flex-col items-center justify-center text-white">
          <h2 className="text-white text-2xl mt-4 mb-4 font-bold uppercase">
            New Assets
          </h2>
          <CardCarousel />
          <div className="mt-4">
            <h1 className="text-white text-sm my-4 text-center pb-5 px-5">
              " Sign in today to get rid of Ads and start exploring the endless
              possibilities of 3D modeling with Blend Ocean open-source library.
              "
            </h1>
          </div>
        </div>
      </div>

      {/* Archviz section */}
      <div className="flex h-fit max-md:flex-col gap-10 max-md:px-1 max-md:p-1 p-5 mt-5 px-20 justify-center items-center">
        <div className="text-white text-center w-2/3 lg:w-1/3 h-full flex flex-col gap-6">
          <h1 className="uppercase text-md font-semibold sm:text-2xl md:text-start">
          Archviz professionals
          </h1>
          <p className="text-xs text-center sm:text-justify ">
            A solution specifically tailored for architectural visualization
            professionals, offering a comprehensive 3D library to meet the
            evolving demands of architects and interior designers.
          </p>
          <h1 className="uppercase text-md font-semibold sm:text-2xl md:text-start">
          100% free CCO
          </h1>
          <p className="text-xs text-center sm:text-justify ">
            CC0 (Creative Commons Zero) is a type of public domain dedication
            that allows creators to waive all rights to their work and place it
            in the public domain.
          </p>
          <p className="text-xs text-center sm:text-justify ">
            This means that anyone can use, reproduce, modify, and distribute
            the work without obtaining permission or paying royalties.
          </p>
          <p className="text-xs text-center sm:text-justify ">
            You won't be asked to pay for it, nor will you need to go through a
            lengthy sign-up process. Enjoy hassle-free access to what you need -
            no hidden costs, no registration needed. Simply download what you
            need and start using it right away, without any worries.
          </p>
          <p className="text-xs text-center sm:text-justify ">
            Fully optimized AR models can also reduce file size and memory
            usage, allowing for faster loading and rendering times, and
            providing smooth experience for users.
          </p>
          <h1 className="uppercase text-md font-semibold sm:text-2xl md:text-start">
            blender native files, .fbx & .obj
          </h1>
          <div className="w-full md:w-fit flex-wrap flex justify-center gap-6 mt-2 items-center">
            <img src={blend} alt="blend" className="p-2 bg-black rounded-xl" />
            <img src={fbx} alt="fbx" className="p-2 bg-black rounded-xl" />
            <img src={obj} alt="obj" className="p-2 bg-black rounded-xl" />
          </div>
        </div>
        <div className="p-3 md:w-2/3">
          <img src={house} alt="" />
        </div>
      </div>

      {/* Support Section */}
      <Support />
      
      {/* About Section */}
      <section className=" flex-1 text-white py-12 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          {/* Title */}
          <h2 className="text-lg sm:text-2xl font-bold mb-6">ABOUT US!</h2>
  
          {/* Content */}
          <p className="text-xs sm:text-sm leading-relaxed">
            Welcome to <span className="font-semibold">Blend Ocean</span>, the ultimate open-source library of 3D models for Blender users.
            Our library is designed to provide Blender users with a vast collection of high-quality 3D models,
            textures, and HDRIs that can be used for a variety of purposes such as animation, game development,
            architectural visualization, augmented reality (AR), and more.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed mt-4">
            We are constantly updating and expanding our library to ensure that it remains current and relevant, with new models being added monthly.
            Our library is compatible with the latest version of Blender.
          </p>
        </div>
      </section>
    </div>
  );
}
