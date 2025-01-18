import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo.svg";
import twitter from "../assets/icons/twitter.svg";
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import { footer } from "../Helper/data";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="bg-black py-6 text-center text-gray-400">
      {/* Logo */}
      <div className="mb-4">
        <img src={logo} alt="logo" className="mx-auto w-24" />
      </div>

      {/* Links */}
      <div className="mb-4 px-2"> 
        <ul className="text-xs gap-2 flex justify-center flex-col sm:flex-row sm:space-x-6 ">
          {footer?.links?.map((link) => (
            <Link key={link.id} to={link.path}>
              <li className="cursor-pointer hover:text-lime-500">
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      

      {/* Social Icons */}
      <div className="mb-4">
        <ul className="flex justify-center space-x-4">
          <li className="bg-white rounded-lg hover:bg-lime-500">
            <a href="/" className="">
              <img src={twitter} alt="Twitter" className="w-5 h-5" />
            </a>
          </li>
          <li className="bg-white rounded-lg hover:bg-lime-500">
            <a href="/" className="">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom Text */}
      <div className="text-xs text-gray-500">
        <p>
          &copy; {currentYear} {footer?.message}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
