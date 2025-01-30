import React, { useEffect, useState } from "react";
import axios from "axios";
import LearnCard from "./LearnCard";
import burgermenuf from "../../assets/icons/burger-menu-gray-f.svg";
import nodata from "../../assets/svgs/nodata.svg";
import { useLearnMenu } from "../../context/LearnMenuContext"; 
import { getAllLearnTutorials, getLearnTutorialsByCategory } from "../../services/learnService";

export default function ShowLearn({ toggleSidebar }) {
  const [tutorials, setTutorials] = useState([]);
  const [groupedTutorials, setGroupedTutorials] = useState({
    blender_tutorials: [],
    vfx_tutorials: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const { selectedCategory, setCategory, selectedCategoryName, setCategoryName } = useLearnMenu(); // Use context

  // Fetch tutorials based on selected category or all tutorials
  const fetchTutorials = async (category) => {
    setLoading(true);
    try {
      const fetchedTutorials = category === "All" 
        ? await getAllLearnTutorials() 
        : await getLearnTutorialsByCategory(category);

      if (category === "All") {
        // Group tutorials by their category
        const grouped = {
          blender_tutorials: fetchedTutorials.filter((tutorial) => tutorial.category === "blender_tutorials"),
          vfx_tutorials: fetchedTutorials.filter((tutorial) => tutorial.category === "vfx_tutorials"),
          projects: fetchedTutorials.filter((tutorial) => tutorial.category === "projects"),
        };
        setGroupedTutorials(grouped);
      } else {
        setTutorials(fetchedTutorials);
      }
    } catch (err) {
      console.error("Error fetching tutorials:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tutorials when the component mounts or category changes
  useEffect(() => {
    fetchTutorials(selectedCategory);
    setCategoryName(selectedCategory === "All" ? "All" : selectedCategoryName); // Set category name for header
  }, [selectedCategory]);

  const renderTutorials = () => {
    const hasBlender = groupedTutorials.blender_tutorials.length > 0;
    const hasVFX = groupedTutorials.vfx_tutorials.length > 0;
    const hasProjects = groupedTutorials.projects.length > 0;
    
    if (selectedCategory === "All") {
      if (!hasBlender && !hasVFX && !hasProjects) {
        return (
          <div className="flex flex-col items-center justify-center">
            <img src={nodata} alt="No data available" className="w-60 opacity-75" />
            <p className="text-gray-400 mt-2">No tutorials available</p>
          </div>
        );
      }
  
      return (
        <>
          {hasBlender && (
            <>
              <h3 className="text-xl font-semibold mb-4">Blender Tutorials</h3>
              <div className="w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {groupedTutorials.blender_tutorials.map((tutorial, idx) => (
                  <LearnCard key={idx} tutorial={tutorial} />
                ))}
              </div>
            </>
          )}
  
          {hasVFX && (
            <>
              <h3 className="text-xl font-semibold mb-4">VFX Tutorials</h3>
              <div className="w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {groupedTutorials.vfx_tutorials.map((tutorial, idx) => (
                  <LearnCard key={idx} tutorial={tutorial} />
                ))}
              </div>
            </>
          )}
  
          {hasProjects && (
            <>
              <h3 className="text-xl font-semibold mb-4">Projects</h3>
              <div className="w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {groupedTutorials.projects.map((tutorial, idx) => (
                  <LearnCard key={idx} tutorial={tutorial} />
                ))}
              </div>
            </>
          )}
        </>
      );
    } else {
      if (tutorials.length === 0) {
        return (
          // No data image
          <div className="flex flex-col justify-center items-center h-full">
            <img src={nodata} alt="No data available" className="w-full max-w-xs sm:max-w-sm md:max-w-md" />
            <p className="text-gray-400 text-lg sm:text-xl">
              No Results Found
            </p>
          </div>
        );
      }
  
      return (
        <div className="w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
          {tutorials.map((tutorial, idx) => (
            <LearnCard key={idx} tutorial={tutorial} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="relative sm:h-full flex gap-3 p-4 text-white lg:text-sm text-xs">
      <div className="w-full h-fit flex flex-col">
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
              <h2 className="text-2xl w-full font-bold">{selectedCategoryName}</h2>
              <p className="text-gray-400">
                {selectedCategory === "All" 
                  ? (groupedTutorials.blender_tutorials.length + groupedTutorials.vfx_tutorials.length + groupedTutorials.projects.length) 
                  : tutorials?.length
                } Tutorials Available
              </p>
            </div>
          </div>
        </div>

        {/* Tutorials */}
        {loading ? (
          <p className="text-center text-gray-400">Loading tutorials...</p>
        ) : renderTutorials()}
      </div>
    </div>
  );
}
