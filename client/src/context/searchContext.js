import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    title: "",
    category: "",
    exportFormats: [],
    isNew: false,
    isEarlyAccess: false,
  });

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);