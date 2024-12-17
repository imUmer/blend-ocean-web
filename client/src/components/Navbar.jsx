import React from "react";
import logo from "../assets/images/logo.svg";
import search from "../assets/icons/search.svg";

const Navbar = () => {
  return (
    <nav className="bg-black shadow-md py-1 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800 border-gray-500 cursor-pointer">
        <img className="text-blue-600" src={logo} alt="logo" srcset="" />
      </div>

      {/* Search Bar and Links */}
      <div className="mx-4">
        <div className="flex justify-center items-center space-x-4">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search..."
              className="flex py-1 px-4 pr-9 border-0 rounded-full bg-slate-700 text-lime-300 focus:outline-none focus:ring-1 focus:ring-lime-400"
            />
            <img className="absolute z-20 top-1 right-1.5 cursor-pointer hover:bg-lime-500/50 rounded-xl p-1" src={search} alt="" />
          </div>
          <div>
            <ul className="flex justify-center items-start space-x-4 text-gray-600 font-medium">
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
        <button className="px-4 py-1 border border-lime-500 rounded-full text-gray-600 hover:text-zinc-50 hover:bg-lime-500">
          Sign In
        </button>
        <button className="bg-lime-500 hover:bg-lime-600 rounded-xl px-5 py-1">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
