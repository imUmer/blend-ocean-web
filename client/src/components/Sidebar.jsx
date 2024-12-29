import React, { useEffect, useState } from 'react';
import { useMenu } from '../context/MenuContext';
import model from '../assets/icons/model.svg';
import texture from '../assets/icons/texture.svg';
import hdris from '../assets/icons/hdris.svg';
import arrow from '../assets/icons/arrow.svg';
import { Link } from 'react-router-dom';
import {mainmenu} from "../Helper/data.js";

const Sidebar = ({ toggleSidebar }) => {
  const { menus, setMenus } = useMenu(); // Use Menu Context
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    
    const mainmenu = {
      title: "Main Menu",
      menus: [
        { id: 1, name: "Textures", path: "/textures", submenus: [] },
        { id: 2, name: "Models", path: "/models", submenus: [] },
        { id: 3, name: "HDRI's", path: "/hdris", submenus: [] },
      ],
    };
    
    // Simulated fetched data
    const fetchedSubmenus = [
      { id: 1, name: "Paper", submenu: { damaged: 20, plain: 10 } },
      { id: 2, name: "Plastic", submenu: { form: 15, plastic: 25, rubber: 10 } },
      { id: 3, name: "HDRI Types", submenu: { "HDRI 1": 12, "HDRI 2": 8 } },
    ];
    
    // Add more fetched submenu data dynamically
    fetchedSubmenus.push(
      { id: 1, name: "Fabric", submenu: { cotton: 12, silk: 8 } }, // Adds to Textures
      { id: 2, name: "Metal", submenu: { steel: 20, iron: 15 } }   // Adds to Models
    );
    
    // Function to map fetched submenus to the corresponding main menu
    function mapFetchedSubmenus(mainmenu, fetchedSubmenus) {
      const updatedMainMenu = { ...mainmenu };
    
      fetchedSubmenus.forEach((submenu) => {
        const targetMenu = updatedMainMenu.menus.find((menu) => menu.id === submenu.id);
    
        if (targetMenu) {
          // Calculate the total count for the submenu
          const total = Object.values(submenu.submenu).reduce((acc, count) => acc + count, 0);
    
          // Push the submenu with totals and details to the corresponding menu
          targetMenu.submenus.push({
            name: submenu.name,
            total,
            details: submenu.submenu,
          });
        }
      });
    
      return updatedMainMenu;
    }
    
    // Add dynamic submenus to the main menu
    const updatedMainMenu = mapFetchedSubmenus(mainmenu, fetchedSubmenus);
    
    console.log(updatedMainMenu);
    

    const fetchMenu = async () => {
      if (menus) return; // If menus are already fetched, skip the fetch

      setLoading(true);
      try {
        const response = await fetch('/api/menu/');
        const data = await response.json();
        console.log(data);

        setMenus(data); // Cache the menu in the context
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMenu();
  }, [menus, setMenus]); // Only run if menus is not already set

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="w-64 max-lg:w-full shadow-2xl bg-neutral-800 border-neutral-700 text-white top-15 z-20">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between relative">
        <h2 className="text-2xl font-bold mb-4 p-4">Menu</h2>
        <button
          onClick={toggleSidebar}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-neutral-800 bg-opacity-50">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Menu List */}
      {!loading && menus && (
        <ul>
          {menus.map((menu) => (
            <li key={menu.name} className="mb-4">
              <div
                className="flex px-5 justify-between items-center cursor-pointer mx-2 p-2 rounded hover:bg-gray-700 hover:text-lime-500"
                onClick={() => toggleSubMenu(menu.name)}
              >
                <div className="flex gap-2 justify-start items-center">
                  <img src={menu.name === "Textures" ? texture : menu.name === "Models" ? model : hdris } className="w-5" alt="" />
                  <span className="text-lg">{menu.name}</span>
                </div>
                {menu.submenus.length > 0 && (
                  <span> <img src={arrow } className={`${subMenuOpen[menu.name] ? "rotate-180" : "rotate-0" } w-3`} alt="" /></span>
                )}
              </div>
              {subMenuOpen[menu.name] && (
                <ul className=" mt-2 px-1 py-1 w-full text-gray-400 bg-black/30">
                  {menu.submenus.map((submenu) => (
                    <li
                      key={submenu.link}
                      className="py-2 pl-5 m-1 cursor-pointer rounded hover:bg-gray-700 hover:text-lime-400"
                    >
                      <Link to={`${submenu.link}`}>{submenu.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;