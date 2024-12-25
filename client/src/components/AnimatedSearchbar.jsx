
import search from '../assets/icons/search.svg'
import React, { useState, useEffect } from "react";

const AnimatedSearchBar = ({handleSearch}) => {
  const [animationStep, setAnimationStep] = useState(0); // Track the animation step
  const [hide, setHide] = useState(0); // Track the animation step
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Automatically change animation step every 2 seconds (2000ms)
  useEffect(() => {
    const interval = setInterval(() => {
        if (animationStep) {
            switch (animationStep) {
                case 0:
                    setHide(0)
                    break;
            
                default:
                    break;
            }
        }
      setAnimationStep((prevStep) => (prevStep + 1) % 3); // Cycle through 3 steps
    }, 2000); // Change step every 2 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto"
    onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >

      {/* Search Input */}
      <div className="relative group">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search... 3 characters at least"
          className={`${animationStep === 0 ? "px-10" : "px-20"} flex py-2  pl-3 pr-30 border-0 w-full rounded-full bg-slate-700 text-lime-300 focus:outline-none focus:ring-1 focus:ring-lime-400 transition-all duration-500`}
        />

        {/* Search Icon */}
        {animationStep === 0 && (   
          <img                                              // absolute top-1/2 right-12 transform -translate-y-1/2 flex items-center gap-1 text-gray-400 text-sm bg-slate-800 px-2 py-0.5 rounded-lg cursor-pointer hover:text-lime-400 transition-all duration-500
            className={`${animationStep === 0 ? "" : "hidden"} absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 cursor-pointer hover:bg-lime-500/50 rounded-lg opacity-100 transition-all duration-500`}
            src={search} // Replace with your actual search icon path
            alt="Search icon"
          />
        )}

        {/* Cmd + K Shortcut */}
        {animationStep === 1 && (
          <div className={`${animationStep === 1 ? "" : "hidden"} absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-1 text-gray-400 text-sm bg-slate-800 px-2 py-0.5 rounded-lg cursor-pointer hover:text-lime-400 transition-all duration-500`}>
            <span className="bg-gray-700 px-1 py-0.5 rounded text-xs font-semibold">
              ⌘
            </span>
            <span className="bg-gray-700 px-1 py-0.5 rounded text-xs font-semibold">
              K
            </span>
          </div>
        )}

        {/* Ctrl + K Shortcut */}
        {animationStep === 2 && (
          <div className={`${animationStep === 2 ? "" : "hidden"} absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-1 text-gray-400 text-sm bg-slate-800 px-2 py-0.5 rounded-lg cursor-pointer hover:text-lime-400 transition-all duration-500`}>
            
            <span className="bg-gray-700 px-1 py-0.5 rounded text-xs font-semibold">
              Ctrl
            </span>
            <span className="bg-gray-700 px-1 py-0.5 rounded text-xs font-semibold">
              K
            </span>
          </div>
        )}

        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute -bottom-8 left-0 text-lime-300 text-xs font-semibold animate-bounce">
            Press short-cut keys for quick access!
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedSearchBar;

