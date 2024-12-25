import React, { useState } from "react";
import { useSearch } from "../context/SearchContext";

const FilterPopup = ({ isOpen, onClose }) => {
  const { filters, setFilters } = useSearch();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters); // Apply filters globally
    console.log("Filter pop : " + filters , localFilters);
    onClose(); // Close popup
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleExportFormatChange = (format) => {
    setLocalFilters((prev) => ({
      ...prev,
      exportFormats: prev.exportFormats.includes(format)
        ? prev.exportFormats.filter((f) => f !== format)
        : [...prev.exportFormats, format],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg max-w-md w-full p-6 relative">
      {/* Close Button */}
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-200"
        onClick={onClose}
      >
        ✕
      </button>
  
      <h2 className="text-2xl font-bold mb-6 text-lime-400 text-center">
        Search Filters
      </h2>
  
      {/* Title Input */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-300 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={localFilters.title}
          onChange={handleInputChange}
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </div>
  
      {/* Category Input */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-300 mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={localFilters.category}
          onChange={handleInputChange}
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </div>
  
      {/* Export Formats */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-300 mb-2">Export Formats</label>
        <div className="flex gap-2">
          {[".obj", ".blend", ".fbx"].map((format) => (
            <button
              key={format}
              onClick={() => handleExportFormatChange(format)}
              className={`px-3 py-1 rounded font-medium ${
                localFilters.exportFormats.includes(format)
                  ? "bg-lime-500 text-black"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </div>
  
      {/* New Models Checkbox */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-300 mb-1">New Models</label>
        <input
          type="checkbox"
          name="isNew"
          checked={localFilters.isNew}
          onChange={handleCheckboxChange}
          className="form-checkbox text-lime-500 bg-gray-700 border-gray-600 focus:ring-lime-500"
        />
      </div>
  
      {/* Early Access Checkbox */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-300 mb-1">Early Access</label>
        <input
          type="checkbox"
          name="isEarlyAccess"
          checked={localFilters.isEarlyAccess}
          onChange={handleCheckboxChange}
          className="form-checkbox text-lime-500 bg-gray-700 border-gray-600 focus:ring-lime-500"
        />
      </div>
  
      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg shadow-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-lime-500 text-black rounded-lg shadow-md hover:bg-lime-600"
        >
          Apply
        </button>
      </div>
    </div>
  </div>  
  );
};

export default FilterPopup;