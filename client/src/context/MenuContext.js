// MenuContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context
const MenuContext = createContext();

// Custom Hook to Access Menu Context
export const useMenu = () => useContext(MenuContext);

// Menu Provider Component
export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState(null);

  return (
    <MenuContext.Provider value={{ menus, setMenus }}>
      {children}
    </MenuContext.Provider>
  );
};
