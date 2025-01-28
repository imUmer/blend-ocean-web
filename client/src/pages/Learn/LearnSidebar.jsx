import React, { useState } from "react";
import circleIcon from "../../assets/icons/circle.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import { useLearnMenuContext } from "../../context/LearnMenuContext"; // Import LearnMenuContext for category management
import { learnMenuData } from "../../Helper/data"; // Assuming you have this data

const LearnSidebar = ({ toggleSidebar }) => {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const { setCategory } = useLearnMenuContext(); // Use LearnMenuContext to set selected category

  const toggleSubMenu = (menuName) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  const handleCategoryClick = (submenu) => {
    console.log(submenu?.category);
    
    setCategory(submenu?.category); // Set selected category (e.g., "Blender" or "VFX")
  };

  return (
    <div className="w-64 max-lg:w-full shadow-2xl bg-neutral-900 border-neutral-800 text-white">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Learn</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Menu List */}
      <ul className="p-4 space-y-2">
        {learnMenuData?.map((menu, index) => (
          <li key={index} className="mb-2">
            <div
              className="flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-lime-500"
              onClick={() => toggleSubMenu(menu.name)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={circleIcon}
                  alt="circle Icon"
                  className="w-5"
                />
                <span className="text-lg font-bold">{menu.name}</span>
              </div>
              {menu.submenus?.length > 0 && (
                <img
                  src={arrowIcon}
                  alt="Arrow Icon"
                  className={`w-3 transform transition-transform duration-300 ${
                    subMenuOpen[menu.name] ? "-rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </div>

            {/* Submenus */}
            {subMenuOpen[menu.name] && menu.submenus?.length > 0 && (
              <ul className="pl-6 mt-2">
                {menu.submenus.map((submenu, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-sm text-gray-400 hover:text-lime-500 cursor-pointer py-1"
                    onClick={() => {
                      if (submenu?.category) handleCategoryClick(submenu);
                    }}
                  >
                    {submenu.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearnSidebar;