import React, { createContext, useContext, useState } from "react";

// Create LearnMenuContext
const LearnMenuContext = createContext();

export const useLearnMenuContext = () => {
  return useContext(LearnMenuContext);
};

export const LearnMenuProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <LearnMenuContext.Provider value={{ selectedCategory, setCategory }}>
      {children}
    </LearnMenuContext.Provider>
  );
};