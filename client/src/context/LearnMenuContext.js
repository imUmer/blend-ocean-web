// src/context/LearnMenuContext.js

import React, { createContext, useContext, useState } from "react";

// Create the context
const LearnMenuContext = createContext();

// Provider component
export const LearnMenuProvider = ({ children }) => {
  const [selectedCategoryName, setSelectedCategoryName] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isNew, setIsNew] = useState("all"); // Default to 'New'

  // Function to set selected category
  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  // Function to set selected category
  const setCategoryName = (categoryName) => {
    setSelectedCategoryName(categoryName);
  };

  // Function to set if the category is new or old
  const setType = (isNew) => {
    setIsNew(isNew);
  };

  return (
    <LearnMenuContext.Provider value={{ selectedCategoryName, selectedCategory, isNew, setCategoryName, setCategory, setType }}>
      {children}
    </LearnMenuContext.Provider>
  );
};

// Custom hook to use LearnMenuContext
export const useLearnMenu = () => {
  return useContext(LearnMenuContext);
};
