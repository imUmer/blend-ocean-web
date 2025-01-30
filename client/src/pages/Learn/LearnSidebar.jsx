import React, { useState, useCallback, useMemo } from "react";
import circleIcon from "../../assets/icons/circle.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import { useLearnMenu } from "../../context/LearnMenuContext"; // Context for category management
import { learnMenuData } from "../../Helper/data"; // Sidebar menu data

const LearnSidebar = ({ toggleSidebar }) => {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const { setCategory, setCategoryName, setType } = useLearnMenu(); // Context values

  // Toggle submenu visibility
  const toggleSubMenu = useCallback((menuName) => {
    setSubMenuOpen((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  }, []);

  // Handle category selection
  const handleCategoryClick = useCallback((submenu) => {
    if (!submenu?.category) return;

    setCategory(submenu.category); // Set category
    setCategoryName(submenu.categoryname); // Set category name

    // Ensure "Project Files" always show all files
    setType(submenu.category === "project_files" ? "" : submenu.isNew ? "new" : "old");
  }, [setCategory, setCategoryName, setType]);

  // Memoized menu list for performance optimization
  const menuList = useMemo(() => {
    return learnMenuData?.map((menu, index) => (
      <li key={index} className="mb-2">
        <div
          className="flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-lime-500"
          onClick={() => toggleSubMenu(menu.name)}
          onKeyDown={(e) => e.key === "Enter" && toggleSubMenu(menu.name)}
          tabIndex={0}
          role="button"
          aria-expanded={!!subMenuOpen[menu.name]}
        >
          <div className="flex items-center gap-2">
            <img src={circleIcon} alt="Icon" className="w-5" />
            <span className="text-lg font-bold">{menu.name}</span>
          </div>
          {menu.submenus?.length > 0 && (
            <img
              src={arrowIcon}
              alt="Expand"
              className={`w-3 transform transition-transform duration-300 ${
                subMenuOpen[menu.name] ? "-rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>

        {/* Submenu List */}
        {subMenuOpen[menu.name] && menu.submenus?.length > 0 && (
          <ul className="pl-6 mt-2">
            {menu.submenus.map((submenu, subIndex) => (
              <li
                key={subIndex}
                className="text-sm text-gray-400 hover:text-lime-500 cursor-pointer py-1"
                onClick={() => handleCategoryClick(submenu)}
                onKeyDown={(e) => e.key === "Enter" && handleCategoryClick(submenu)}
                tabIndex={0}
                role="menuitem"
              >
                {submenu.name}
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  }, [subMenuOpen, toggleSubMenu, handleCategoryClick]);

  return (
    <div className="w-64 max-lg:w-full shadow-2xl bg-neutral-900 border-neutral-800 text-white">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Learn</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
          aria-label="Close Sidebar"
        >
          ✕
        </button>
      </div>

      {/* Sidebar Menu List */}
      <ul className="p-4 space-y-2">{menuList}</ul>
    </div>
  );
};

export default LearnSidebar;
