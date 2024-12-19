import React, { useEffect, useState } from 'react';
import { useMenu } from '../context/MenuContext';
import model from '../assets/icons/model.svg';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSidebar }) => {
  const { menus, setMenus } = useMenu(); // Use Menu Context
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
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
    <div className="w-64 shadow-2xl bg-neutral-800 border-neutral-700 text-white h-screen absolute lg:sticky top-15 z-0">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between relative">
        <h2 className="text-2xl font-bold mb-4 p-4">Menu</h2>
        <button
          onClick={toggleSidebar}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                className="flex px-5 justify-between items-center cursor-pointer hover:text-lime-500"
                onClick={() => toggleSubMenu(menu.name)}
              >
                <div className="flex gap-2 justify-start items-center">
                  <img src={model} className="w-5" alt="menu icon" />
                  <span className="text-lg">{menu.name}</span>
                </div>
                {menu.submenus.length > 0 && (
                  <span>{subMenuOpen[menu.name] ? '-' : '+'}</span>
                )}
              </div>
              {subMenuOpen[menu.name] && (
                <ul className="pl-5 mt-2 w-full text-gray-400 bg-black/30">
                  {menu.submenus.map((submenu) => (
                    <li
                      key={submenu.link}
                      className="py-1 cursor-pointer hover:text-lime-400"
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