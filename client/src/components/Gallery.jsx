import React, { useState, useEffect } from "react";
import ModelCard from "./ModelCard";
import burgermenuf from "../assets/icons/burger-menu-gray-f.svg";

const Gallery = ({ toggleSidebar, isSidebarOpen }) => {
  const [models, setModels] = useState([]);
  const [earlyAccessToggle, setEarlyAccessToggle] = useState(false);
  // const [modelDetail, setModelDetail] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true); // Show loading spinner
        const response = await fetch("/api/models"); // Replace with your API endpoint
        const data = await response.json();
        console.log(data[0].category);
        
        setModels(data); // Assuming `data.models` contains the array of models
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchModels();
  }, []);

  const getEarlyAccessModels = async () => {
    if(earlyAccessToggle === true)
    {
      try {
        setLoading(true); // Show loading spinner
        const response = await fetch("/api/models"); 
        const data = await response.json();
        
        setModels(data);
        setEarlyAccessToggle(false);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }else
      try {
        setLoading(true); // Show loading spinner
        const response = await fetch("/api/models/eamodels"); 
        const data = await response.json();
        
        setModels(data);
        setEarlyAccessToggle(true);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
  }

  return (
    <div className="relative p-4 text-white">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-neutral-800 bg-opacity-50">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-start items-start gap-5">
          <img
            src={burgermenuf}
            className="w-8 mt-2 cursor-pointer bg-transparent hover:bg-gray-600 rounded-lg"
            alt=""
            onClick={toggleSidebar}
          />
          <div>
            <h2 className="text-2xl font-bold">MODELS</h2>
            <p className="text-gray-400">{models[0]?.category || 'All '} - {models.length} Results</p>
          </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row gap-2 space-x-4">
          <button onClick={getEarlyAccessModels} className="px-4 py-2 bg-lime-500 hover:bg-lime-600 rounded-full">
            {earlyAccessToggle ? "All Items" : "Early Access Items"}
          </button>
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Dropdown hover
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <select className="bg-gray-900 text-white px-4 py-2 rounded-full">
            <option>Sorted By: Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {models.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
          <button
            key={page}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
