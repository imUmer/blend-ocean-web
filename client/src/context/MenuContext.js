// MenuContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // For making API requests

// Create Context
const MenuContext = createContext();

// Custom Hook to Access Menu Context
export const useMenu = () => useContext(MenuContext);

// Menu Provider Component
export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState(null); // Full menu data from the API
  const [types, setTypes] = useState(null); // Types (menus)
  const [categories, setCategories] = useState(null); // Categories (submenus)
  const [collections, setCollection] = useState(null); // Collections (item)
  const [selectedType, setSelectedType] = useState(localStorage.getItem("selectedType")); // Selected Type 
  const [selectedCollection, setSelectedCollection] = useState(localStorage.getItem("selectedCollection")); // Selected Type 
  
  // Function to fetch menu data
  const fetchMenus = async () => {
    try {
      const response = await axios.get("/api/menu"); // Adjust API endpoint as needed
      const menuData = response.data;

      setMenus(menuData); // Store the full menu data

      // Separate types and categories
      const menuTypes = menuData.filter((menu) => menu.category === "menu"); //  
      const menuCategories = menuData.filter((menu) => menu.category === "submenu"); //  
      const menuCollections = menuData.filter((menu) => menu.category === "item"); // 

      setTypes(menuTypes);
      setCategories(menuCategories);
      setCollection(menuCollections);      
    } catch (error) {
      console.error("Failed to fetch menus:", error);
    }
  };

  // Fetch menus when the provider is mounted
  useEffect(() => {
    if (!menus) {
      fetchMenus();
    }
  }, [menus]);

    useEffect(() => {
      if (selectedType) {
        localStorage.setItem("selectedType", selectedType);
      } else {
        localStorage.removeItem("selectedType");
      }
  
      if (selectedCollection) {
        localStorage.setItem("selectedCollection", selectedCollection);
      } else {
        localStorage.removeItem("selectedCollection");
      }
    }, [selectedType, selectedCollection]);

  return (
    <MenuContext.Provider value={{ menus, setMenus, types, setTypes, categories, setCategories, collections, setCollection, fetchMenus, selectedType, setSelectedType, selectedCollection, setSelectedCollection }}>
      {children}
    </MenuContext.Provider>
  );
};
