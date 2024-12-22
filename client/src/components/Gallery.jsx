import React, { useState, useEffect } from "react";
import ModelCard from "./ModelCard";
import ModelPopup from "./ModelPopup";
import burgermenuf from "../assets/icons/burger-menu-gray-f.svg";
import axios from "axios";
import { useSearch } from "../context/searchContext";

const Gallery = ({ toggleSidebar, isSidebarOpen, model }) => {
  const [models, setModels] = useState([]);
  const [earlyAccessToggle, setEarlyAccessToggle] = useState(false);
  // const [modelDetail, setModelDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null); // For popup
  const { searchTerm } = useSearch();

  const handleModelClick = (model) => {
    setSelectedModel(model); 
  };
  // Fetch models dynamically
  const fetchModels = async (page) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/models/search?page=${page}&limit=8&searchTerm=${searchTerm}`);
      setModels(data.models);
      console.log("Gallery: " + data);
      
      setPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels(page);
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pages) {
      setPage(newPage);
    }
  }; 

  const getEarlyAccessModels = async () => {
    if (earlyAccessToggle === true) {
      try {
        setLoading(true); // Show loading spinner
        const { data } = await axios.get(`/api/models/chunk?page=${page}&limit=8`);
        setModels(data.models);
      
        setEarlyAccessToggle(false);
        setPages(data.pages);
        setTotal(data.total);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    } else
      try {
        setLoading(true); // Show loading spinner
        const { data } = await axios.get(`/api/models/chunk?page=${page}&limit=8&earlyaccess=true`);
        setModels(data.models);
        
        setEarlyAccessToggle(true);
        setPages(data.pages);
        setTotal(data.total);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
  };

  return (
    <div className="relative flex gap-3 p-4 text-white lg:text-sm text-xs">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-neutral-800 bg-opacity-50">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* <div className="w-64 h-full absolute md:h-full md:relative inline-block bg-black">
        <h1>sfsafasdf</h1>
      </div> */}
      <div className="flex flex-col">
        <div className="flex max-sm:flex-col gap-2 max-sm:items-center justify-between items-center mb-6">
          <div className="flex justify-start max-sm:w-full items-start gap-5">
            <img
              src={burgermenuf}
              className="w-8 mt-2 cursor-pointer bg-transparent hover:bg-gray-600 rounded-lg"
              alt=""
              onClick={toggleSidebar}
            />
            
            <div className="flex flex-col">
              <h2 className="text-2xl w-full font-bold">MODELS</h2>
              <p className="text-gray-400 ">
                {models[0]?.category || "All "} - {total} Results
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center  max-sm:w-fit flex-col sm:flex-row gap-3 py-2">
            <button
              onClick={getEarlyAccessModels}
              className="px-4 py-2 w-full  bg-lime-500 lg:text-sm text-xs hover:bg-lime-600 rounded-full"
            >
              {earlyAccessToggle ? "All Items" : "Early Access Items"}
            </button>
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white w-full bg-gray-700 lg:text-sm text-xs hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown hover
              <svg
                className="w-1.5 h-2.5 ms-3 sm:w-2.5"
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
            <select className="bg-gray-900  w-full lg:text-sm text-xs text-white px-4 py-2 rounded-full">
              <option>Sorted By: Newest</option>
            </select>
          </div>
        </div>
        
        {/* Models cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2" >
        {models?.map((model) => (
        <ModelCard key={model._id} model={model} handleModelClick={handleModelClick}  />
        ))}
      </div>


        {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          disabled={page === 1}
        >
          Previous
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 ${
              page === pageNumber ? "bg-lime-500" : "bg-gray-700"
            } text-white rounded hover:bg-gray-600`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          disabled={page === pages}
        >
          Next
        </button>
      </div>

      {/* Popup */}
      {selectedModel && (
        <ModelPopup
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
      </div>
    </div>
  );
};

export default Gallery;