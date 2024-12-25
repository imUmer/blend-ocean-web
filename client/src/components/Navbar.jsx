import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logos/logo.svg";
import search from "../assets/icons/search.svg";
import menu from "../assets/icons/burger-menu-gray.svg";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import FirestoreUserProfile from "./FirestoreUserProfile";
import {data} from "../Helper/data.js";
import { useSearch } from "../context/SearchContext.js";
import FilterPopup from "./FilterPopup";
import AnimatedSearchBar from "./AnimatedSearchbar.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Track if search is open
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();
  // token
  const { user, setUser, token, setToken } = useAuth();

  // Ref for the menu and menu button to detect outside clicks
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const searchRef = useRef(null); // Ref for the search input
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.metaKey && e.key === "k") {
      e.preventDefault();
      setIsFilterOpen((prev) => !prev);
    }
  };

  //  get user profile :
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    photo: "",
    role: "",
  });

  // Toggle menu visibility
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle search visibility
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsFilterOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    if (e.target.value.length >= 3) setSearchTerm(e.target.value);
    else setSearchTerm("");
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
    navigate("/login");
  };

  // Use effect to add and clean up the event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="bg-black shadow-md py-1 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800 border-gray-500 cursor-pointer">
        <Link to="/" className="">
          <img className="text-gray-600" src={logo} alt="logo" />
        </Link>
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
          <AnimatedSearchBar handleSearch={handleSearch} />

          {/* Links */}
          <div>
            <ul className="w-full truncate flex justify-center items-start max-lg:hidden text-xs gap-4 text-gray-400 font-medium">
              {data.links.map((link) => (
                <li
                  key={link.id}
                  className=" text-center py-1 px-1 cursor-pointer rounded hover:bg-gray-700 hover:text-lime-500"
                >
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 items-center">
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
              className="absolute max-md:top-8 top-10 max-md:-right-6 -right-16 z-30 shadow-lg justify-center"
            >
              <ul className="flex flex-col items-center bg-slate-800 w-40 p-1 text-xs text-gray-400 font-medium">
                {data.links.map((link, i) => (
                  <li
                    key={i}
                    className="w-full text-center py-2 px-3 m-1 cursor-pointer rounded hover:bg-gray-700 hover:text-lime-500"
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}

                {token ? (
                  ""
                ) : (
                  <li className="w-full text-center py-2 px-3 cursor-pointer rounded hover:bg-gray-700 hover:text-lime-400">
                    <Link to="/login">
                      <button
                        className={`${
                          token ? "hidden" : ""
                        } w-full text-xs text-gray-300 hover:bg-lime-500 hover:text-black px-4 py-1 border border-lime-500 rounded-full`}
                      >
                        Sign In
                      </button>
                    </Link>
                  </li>
                )}
                {token ? (
                  ""
                ) : (
                  <li className="w-full text-center py-2 px-3 cursor-pointer rounded hover:bg-gray-700 hover:text-lime-400">
                    <Link to="/register">
                      <button
                        className={`${
                          token ? "hidden" : ""
                        } w-full bg-lime-500 text-xs text-white hover:bg-lime-600 rounded-xl px-5 py-1`}
                      >
                        {" "}
                        Register
                      </button>
                    </Link>
                  </li>
                )}
                {token ? (
                  <li className="w-full text-center py-2 px-3 cursor-pointer rounded hover:bg-gray-700 hover:text-lime-400">
                    <Link to="/login">
                      <button
                        onClick={handleLogout}
                        className={`${
                          token ? "" : "hidden"
                        }  items-center px-5 py-1 text-xs font-medium text-center text-white bg-lime-500 rounded-xl hover:bg-lime-600 focus:ring-4 focus:outline-none  dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800`}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Buttons (Hidden on mobile) */}
        <div className="flex gap-2 items-center max-md:hidden">
          <Link
            to="/login"
            className={`${
              token ? "hidden" : ""
            } truncate px-4 py-1 text-xs border border-lime-500 rounded-full text-gray-300 hover:text-zinc-50 bg-gray-800 hover:bg-lime-500`}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className={`${
              token ? "hidden" : ""
            } items-center px-5 py-1 text-xs font-medium text-center text-white bg-lime-500 rounded-xl hover:bg-lime-600 focus:ring-4 focus:outline-none  dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800`}
          >
            Register
          </Link>
          <button
            onClick={handleLogout}
            className={`${
              token ? "" : "hidden"
            }  items-center px-5 py-1 text-xs font-medium text-center text-white bg-lime-500 rounded-xl hover:bg-lime-600 focus:ring-4 focus:outline-none  dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800`}
          >
            Logout
          </button>
        </div>
        <div
          className={`${
            token ? "" : "hidden"
          } items-center justify-center cursor-pointer`}
        >
          <FirestoreUserProfile
            className="border border-lime-500  rounded-full hover:opacity-80 h-28 w-28  hover:shadow-xl"
            documentId={user?.photoUrl}
            flag={0}
          />
        </div>
      </div>
      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
