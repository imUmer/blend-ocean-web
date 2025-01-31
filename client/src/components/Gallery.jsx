import React, { useState, useEffect, useMemo, useCallback } from "react";
import ModelCard from "./ModelCard";
import ModelPopup from "./ModelPopup";
import burgermenuf from "../assets/icons/burger-menu-gray-f.svg";
import axios from "axios";
import { useSearch } from "../context/SearchContext";
import { useMenu } from "../context/MenuContext";

const Gallery = ({ toggleSidebar }) => {
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null);
  const [earlyAccessToggle, setEarlyAccessToggle] = useState(false);

  const { filters, searchTerm } = useSearch();
  const { selectedType, selectedCollection } = useMenu();

  // Memoized total count to avoid unnecessary calculations
  const total = useMemo(() => models.length, [models]);

  /** Fetch models dynamically with memoized function */
  const fetchModels = useCallback(async () => {
    setLoading(true);
    setEarlyAccessToggle(false);
    try {
      const { data } = await axios.get('/api/models/search', {
        params: { page, limit: 8, searchTerm, selectedType, selectedCollection, ...filters },
      });

      setModels(data.models);
      setAllModels(data.models);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, selectedType, selectedCollection, filters]);

  /** Handle early access filtering */
  const toggleEarlyAccess = () => {
    setLoading(true);
    try {
      if (earlyAccessToggle) {
        setModels(allModels);
      } else {
        setModels(allModels.filter(model => model.earlyAccess));
      }
      setEarlyAccessToggle(!earlyAccessToggle);
    } catch (error) {
      console.error("Error applying early access filter:", error);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch models on dependency change */
  useEffect(() => { fetchModels(); }, [fetchModels]);

  return (
    <div className="relative sm:h-screen flex flex-col gap-3 p-4 text-white text-xs lg:text-sm">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-50 z-30">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex items-start gap-5">
          <img
            src={burgermenuf}
            className="w-8 cursor-pointer bg-transparent hover:bg-gray-600 rounded-lg"
            alt="Toggle Sidebar"
            onClick={toggleSidebar}
          />
          <div>
            <h2 className="text-2xl font-bold">{models[0]?.type || "Select"}</h2>
            <p className="text-gray-400">{models[0]?.category || "All"} - {total} Results</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 py-2">
          <button
            onClick={toggleEarlyAccess}
            className="px-4 py-2 bg-lime-500 hover:bg-lime-600 rounded-full"
            aria-label="Toggle Early Access"
          >
            {earlyAccessToggle ? "All Items" : "Early Access Items"}
          </button>
          <select className="bg-gray-900 text-white px-4 py-2 rounded-full">
            <option>Sorted By: Newest</option>
            <option>Sorted By: Oldest</option>
          </select>
        </div>
      </div>

      {/* Models Grid */}
      {total > 0 ? (
        <div className="grid w-fit grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {models.map((model) => (
            <ModelCard key={model._id} model={model} handleModelClick={setSelectedModel} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-72 text-center">
          <p>No models available</p>
        </div>
      )}

      {/* Pagination */}
      {total > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(total / 8) }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 ${page === num ? "bg-lime-500" : "bg-gray-700"} text-white rounded hover:bg-gray-600`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            disabled={page * 8 >= total}
          >
            Next
          </button>
        </div>
      )}

      {/* Model Popup */}
      {selectedModel && <ModelPopup model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  );
};

export default Gallery;