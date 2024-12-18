import React from "react";
import logo from "../assets/images/logo.svg"; // Replace with actual logo
import twitter from "../assets/icons/obj.svg"; 
import facebook from "../assets/icons/obj.svg";
import linkedin from "../assets/icons/obj.svg";

const Footer = () => {
  return (
    <footer className="bg-black py-6 text-center text-gray-400">
      {/* Logo */}
      <div className="mb-4">
        <img src={logo} alt="logo" className="mx-auto w-24" />
      </div>

      {/* Links */}
      <div className="mb-4">
        <ul className="flex justify-center space-x-6 text-xs">
          <li>
            <a href="#" className="hover:text-lime-500">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-500">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-500">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-500">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Social Icons */}
      <div className="mb-4">
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="#" className="hover:text-lime-500">
              <img src={twitter} alt="Twitter" className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-500">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-500">
              <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom Text */}
      <div className="text-xs text-gray-500">
        <p>&copy; 2024 Blend Ocean. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
