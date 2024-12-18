import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.svg";
import search from "../assets/icons/search.svg";
import menu from "../assets/icons/burger-menu-gray.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Track if search is open

  // Ref for the menu and menu button to detect outside clicks
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const searchRef = useRef(null); // Ref for the search input

  // Toggle menu visibility
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle search visibility
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Close menu or search if click happens outside
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(e.target) &&
      searchRef.current &&
      !searchRef.current.contains(e.target)
    ) {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  // Use effect to add and clean up the event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black shadow-md py-1 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800 border-gray-500 cursor-pointer">
        <a href="/">
          <img className="text-gray-600" src={logo} alt="logo" />
        </a>
      </div>

      {/* Search Bar and Links */}
      <div className="mx-4">
        <div className="flex justify-center text-xs py-1 items-center space-x-6">
          {/* Search Icon (only visible on mobile) */}
          <div className="relative md:hidden">
            <img
              className="cursor-pointer"
              src={search}
              alt="Search"
              onClick={handleSearchClick}
            />
          </div>

          {/* Search input (visible on larger screens) */}
          <div className="hidden md:block relative">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search..."
              className="flex py-2 px-20 pl-3 pr-8 border-0 lg:w-[300px] rounded-full bg-slate-700 text-lime-300 focus:outline-none focus:ring-1 focus:ring-lime-400"
            />
            <img
              className="absolute p-0.5 z-20 top-1 right-1.5 cursor-pointer hover:bg-lime-500/50 rounded-lg"
              src={search}
              alt="Search icon"
            />
          </div>

          {/* Links */}
          <div>
            <ul className="flex justify-center items-start max-lg:hidden text-xs space-x-4 text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:text-lime-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        {/* Menu Button (Mobile) */}
        <div className="relative lg:hidden w-7" ref={menuButtonRef}>
          <img
            src={menu}
            className="cursor-pointer"
            onClick={handleMenuClick}
            alt="menu"
          />
          {/* Menu Links */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-10 -right-5 z-30 justify-center"
            >
              <ul className="flex flex-col items-center bg-slate-800 w-32 p-1 gap-1 text-xs text-gray-400 font-medium">
                <li className="w-full p-1 text-center hover:bg-lime-500/20">
                  <a href="#" className="hover:text-lime-500">
                    Home
                  </a>
                </li>
                <li className="w-full p-1 text-center hover:bg-lime-500/20">
                  <a href="#" className="hover:text-lime-500">
                    About
                  </a>
                </li>
                <li className="w-full p-1 text-center hover:bg-lime-500/20">
                  <a href="#" className="hover:text-lime-500">
                    Services
                  </a>
                </li>
                <li className="w-full p-1 text-center hover:bg-lime-500/20">
                  <a href="#" className="hover:text-lime-500">
                    Contact
                  </a>
                </li>
                {/* Add Sign In and Register buttons in the menu for mobile */}
                <li className="w-full p-1 text-center hover:bg-lime-500/20">
                  <button className="w-full text-xs text-gray-400 hover:bg-lime-500/20 px-4 py-1 border rounded-full">
                  <a href="/login"> Sign In </a>
                  </button>
                </li>
                <li className="w-full p-1 text-center hover:bg-lime-500/20">
                  <button className="w-full bg-lime-500 text-xs hover:bg-lime-600 rounded-xl px-5 py-1">
                  <a href="/register"> Register </a>
                    
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Buttons (Hidden on mobile) */}
        <div className="flex gap-2 max-md:hidden">
        <a href="/login">
        <button className="px-4 py-1 text-xs border border-lime-500 rounded-full text-gray-300 hover:text-zinc-50 bg-gray-800 hover:bg-lime-500">
              Sign In
            </button>
          </a>
        <a href="/register">
        <button className="bg-lime-500 text-xs hover:bg-lime-600 rounded-xl px-5 py-1">
            Register
          </button>
          </a>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
