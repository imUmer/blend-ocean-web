import React from "react";
import ModelCard from "./ModelCard";
import burgermenuf from "../assets/icons/burger-menu-gray-f.svg";

const models = [
  {
    id: 1,
    name: "Bricks Distressed Burned Model",
    image:
      "https://media.cgtrader.com/variants/9htaWxjfEzYW9H71n5NxsRQw/508c09fe26e63b93baec6d888aa2950650a509b5e04f2f03a4f2af52a04363ea/red_brick-3d-model.jpg",
  },
  {
    id: 2,
    name: "Food Avocado Zutano Model",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9JzG9-BcR653gmoC2jhd7amrEj-HFzYWfQ&s",
  },
  {
    id: 3,
    name: "Candle Holder Vintage Model",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9JzG9-BcR653gmoC2jhd7amrEj-HFzYWfQ&s",
  },
  {
    id: 4,
    name: "Spoon Vintage Model",
    image:
      "https://img.freepik.com/3d-models/XSAXEBKL-spoon-001/spoon-001-beauty.png",
  },
  {
    id: 5,
    name: "Glass Tall Vintage Model",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9JzG9-BcR653gmoC2jhd7amrEj-HFzYWfQ&s",
  },
];

const Gallery = ({ toggleSidebar, isSidebarOpen }) => {
 // text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white
  return (
    <div className="p-4 text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-start items-start gap-5"> 
          <img src={burgermenuf} className="w-8 mt-2 cursor-pointer bg-transparent hover:bg-gray-600 rounded-lg " alt="" onClick={toggleSidebar} />
          <div>
            <h2 className="text-2xl font-bold">MODELS</h2>
            <p className="text-gray-400">Furniture - 252 Results</p>
          </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row gap-2 space-x-4">
          <button className="px-4 py-2 bg-lime-500 rounded-full">
            Early Access Items
          </button>
          <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown hover 
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>
          <select className="bg-gray-900 text-white px-4 py-2 rounded-full">
            <option>Sorted By: Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
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
