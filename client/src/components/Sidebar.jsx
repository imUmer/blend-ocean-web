import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import model from "../assets/icons/model.svg";
import texture from "../assets/icons/texture.svg";
import hdris from "../assets/icons/hdris.svg";
import arrow from "../assets/icons/arrow.svg";

const Sidebar = ({ toggleSidebar }) => {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [loading, setLoading] = useState(false);

  
  const menuData = [
    { id: 1, name: "Models", parentId: null, category: "menu", count: null },
    { id: 2, name: "Textures", parentId: null, category: "menu", count: null },
    { id: 3, name: "HDRIs", parentId: null, category: "menu", count: null },
    { id: 4, name: "Cars", parentId: 1, category: "submenu", count: 6 },
    { id: 5, name: "BMW", parentId: 4, category: "item", count: 3 },
    { id: 6, name: "Mercedes", parentId: 4, category: "item", count: 3 },
    { id: 7, name: "Wood", parentId: 2, category: "submenu", count: 5 },
    { id: 8, name: "Cracked", parentId: 7, category: "item", count: 4 },
    { id: 9, name: "Black Wood", parentId: 7, category: "item", count: 1 },
    { id: 10, name: "Indoor", parentId: 3, category: "submenu", count: 2 },
    { id: 11, name: "Living Room", parentId: 10, category: "item", count: 1 },
    { id: 12, name: "Office Space", parentId: 10, category: "item", count: 1 },
  ];

  const buildMenuHierarchy = () => {
    const rootMenus = menuData.filter((menu) => menu.parentId === null);
    const buildSubMenu = (parentId) => {
      return menuData
        .filter((menu) => menu.parentId === parentId)
        .map((submenu) => ({
          ...submenu,
          submenus: buildSubMenu(submenu.id),
        }));
    };

    return rootMenus.map((menu) => ({
      ...menu,
      submenus: buildSubMenu(menu.id),
    }));
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      buildMenuHierarchy();
      setLoading(false);
    }, 500);
  }, []);

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [menu.name]: !prevState[menu.name],
    }));
  };

  const renderMenu = (menus) => {
    return menus.map((menu) => (
      <li key={menu.id} className="mb-2">
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
            <span className={
              menu.parentId === null
                ? "text-lg font-bold"
                : menu.submenus?.length > 0
                ? "text-base text-gray-300"
                : "text-sm text-gray-400"
            }>
              {menu.name}
            </span>
          </div>

          {menu.count !== null && (
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
          <ul className="pl-6 mt-2">
            {renderMenu(menu.submenus)}
          </ul>
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
