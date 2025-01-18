import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import model from "../assets/icons/model.svg";
import texture from "../assets/icons/texture.svg";
import hdris from "../assets/icons/hdris.svg";
import arrow from "../assets/icons/arrow.svg";
import { useMenu } from "../context/MenuContext";

const Sidebar = ({ toggleSidebar }) => {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [loading, setLoading] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const { setSelectedType, setSelectedCollection } = useMenu();

  // Fetch menu data from API
  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/menu/"); // Replace with your actual API endpoint
      const data = await response.json();
      console.log(data);

      setMenuData(data); // Set fetched data to state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setLoading(false);
    }
  };

  // Build menu hierarchy
  const buildMenuHierarchy = () => {
    const rootMenus = menuData.filter((menu) => !menu.parentId); // No parent means top-level menu
    const buildSubMenu = (parentId) => {
      return menuData
        .filter((menu) => menu.parentId?._id === parentId) // Match parentId
        .map((submenu) => ({
          ...submenu,
          submenus: buildSubMenu(submenu._id), // Recursive call for nested submenus
        }));
    };

    return rootMenus.map((menu) => ({
      ...menu,
      submenus: buildSubMenu(menu._id),
    }));
  };

  useEffect(() => {
    fetchMenuData(); // Fetch menu data on component mount
  }, []);

  // Find top-level menu
  const findTopLevelMenu = (currentMenu) => {
    if (!currentMenu.parentId) {
      return currentMenu.name; // This is the top-level menu
    }
    const parentMenu = menuData.find((menu) => menu._id === currentMenu.parentId._id);
    return findTopLevelMenu(parentMenu); // Recursive call
  };

  // Handle submenu toggle
  const toggleSubMenu = (menu) => {
    const topLevelMenu = findTopLevelMenu(menu); // Determine top-level menu
    if(menu?.category === "item"){
      setSelectedType(topLevelMenu); // Set the top-level menu name in context
      setSelectedCollection(menu?.name); // Set the top-level menu name in context
    }
      // console.log("Top-Level Menu:", topLevelMenu);

    // Toggle submenu state
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [menu.name]: !prevState[menu.name],
    }));
  };

  const renderMenu = (menus) => {
    return menus.map((menu) => (
      <li key={menu._id} className="mb-2">
        <div
          className={`flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-lime-500 ${
            menu.parentId === null ? "bg-neutral-800 text-white" : ""
          }`}
          onClick={() => toggleSubMenu(menu)}
        >
          <div className="flex items-center gap-2">
            {menu.parentId === null && (
              <img
                src={
                  menu.name === "Textures"
                    ? texture
                    : menu.name === "Models"
                    ? model
                    : hdris
                }
                alt="icon"
                className="w-5"
              />
            )}
            <span
              className={
                menu.parentId === null
                  ? "text-lg font-bold"
                  : menu.submenus?.length > 0
                  ? "text-base text-gray-300"
                  : "text-sm text-gray-400"
              }
            >
              {menu.name}
            </span>
          </div>

          {/* Show count only for submenus and items (not for categories) */}
          {menu.category !== "menu" && menu.count !== null && (
            <span className="text-gray-400 text-sm">{menu.count}</span>
          )}

          {menu.category === "menu" && menu.submenus?.length > 0 && (
            <img
              src={arrow}
              alt="arrow"
              className={`w-3 transform transition-transform duration-300 ${
                subMenuOpen[menu.name] ? "-rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>

        {subMenuOpen[menu.name] && menu.submenus?.length > 0 && (
          <ul className="pl-6 mt-2">{renderMenu(menu.submenus)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div className="w-64 max-lg:w-full shadow-2xl bg-neutral-900 border-neutral-800 text-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && <ul className="p-4 space-y-2">{renderMenu(buildMenuHierarchy())}</ul>}
    </div>
  );
};

export default Sidebar;
