import React, { useEffect, useState } from "react";
import axios from "axios";
import LearnCard from "./LearnCard";
import burgermenuf from "../../assets/icons/burger-menu-gray-f.svg";
import nodata from "../../assets/svgs/nodata.svg";

export default function ShowLearn({ toggleSidebar }) {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5001/api/learn")
      .then((response) => {
        setTutorials(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative sm:h-screen flex gap-3 p-4 text-white lg:text-sm text-xs">
      <div className="w-full h-full flex flex-col">
        {/* Top Header */}
        <div className="flex max-sm:flex-col gap-2 max-sm:items-center justify-between items-center mb-6">
          <div className="flex justify-start max-sm:w-full items-start gap-5">
            <img
              src={burgermenuf}
              className="w-8 mt-2 cursor-pointer bg-transparent hover:bg-gray-600 rounded-lg"
              alt="Toggle Sidebar"
              onClick={toggleSidebar}
            />

            <div className="flex flex-col">
              <h2 className="text-2xl w-full font-bold">Learn</h2>
              <p className="text-gray-400">{tutorials.length} Tutorials Available</p>
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        {loading ? (
          <p className="text-center text-gray-400">Loading tutorials...</p>
        ) : tutorials.length > 0 ? (
          <div className="w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {tutorials.map((video, idx) => (
              <LearnCard key={idx} tutorial={video} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <img src={nodata} alt="No data available" className="w-full max-w-xs sm:max-w-sm md:max-w-md" />
            <p className="text-gray-400 text-lg sm:text-xl">No Tutorials Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
