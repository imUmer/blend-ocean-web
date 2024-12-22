import React, { useState } from "react";
import { useSearch } from "../context/SearchContext";

const FilterPopup = ({ isOpen, onClose }) => {
  const { filters, setFilters } = useSearch();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters); // Apply filters globally
    console.log("Filter pop : " + filters);
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Search Filters</h2>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={localFilters.title}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={localFilters.category}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Export Formats</label>
          <div className="flex gap-2">
            {[".obj", ".blend", ".fbx"].map((format) => (
              <button
                key={format}
                onClick={() => handleExportFormatChange(format)}
                className={`px-3 py-1 rounded ${
                  localFilters.exportFormats.includes(format)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">New Models</label>
          <input
            type="checkbox"
            name="isNew"
            checked={localFilters.isNew}
            onChange={handleCheckboxChange}
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Early Access</label>
          <input
            type="checkbox"
            name="isEarlyAccess"
            checked={localFilters.isEarlyAccess}
            onChange={handleCheckboxChange}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;