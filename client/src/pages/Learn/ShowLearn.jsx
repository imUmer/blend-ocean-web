import React, { useEffect, useState, useCallback } from "react";
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
  const [error, setError] = useState(null);

  const { selectedCategory, isNew, setType, selectedCategoryName } = useLearnMenu();

  const fetchTutorials = useCallback(async (category) => {
    setLoading(true);
    setError(null); // Reset error state on new fetch
    try {
      const fetchFn = category === "All" ? getAllLearnTutorials : getLearnTutorialsByCategory;
      let fetchedTutorials = await fetchFn(category);

      if (isNew === "new") {
        fetchedTutorials = fetchedTutorials.filter(tutorial => tutorial.isNew);
      } else if (isNew === "old") {
        fetchedTutorials = fetchedTutorials.filter(tutorial => !tutorial.isNew);
      }

      if (category === "All") {
        setGroupedTutorials({
          blender_tutorials: fetchedTutorials.filter(t => t.category === "blender_tutorials"),
          vfx_tutorials: fetchedTutorials.filter(t => t.category === "vfx_tutorials"),
          projects: fetchedTutorials.filter(t => t.category === "project_files"),
        });
      } else {
        setTutorials(fetchedTutorials);
      }
    } catch (err) {
      console.error("Error fetching tutorials:", err);
      setError("Failed to load tutorials. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [isNew]);

  useEffect(() => {
    setType(isNew);
    fetchTutorials(selectedCategory);
  }, [selectedCategory, isNew, setType, fetchTutorials]);

  const renderTutorials = () => {
    const { blender_tutorials, vfx_tutorials, projects } = groupedTutorials;
    const hasTutorials = [blender_tutorials, vfx_tutorials, projects].some(arr => arr.length > 0);

    if (selectedCategory === "All") {
      if (!hasTutorials) {
        return (
          <div className="flex flex-col items-center justify-center">
            <img src={nodata} alt="No tutorials available" className="w-60 opacity-75" />
            <p className="text-gray-400 mt-2">No tutorials available</p>
          </div>
        );
      }

      return (
        <>
          {blender_tutorials.length > 0 && (
            <TutorialCategory title="Blender Tutorials" tutorials={blender_tutorials} />
          )}
          {vfx_tutorials.length > 0 && (
            <TutorialCategory title="VFX Tutorials" tutorials={vfx_tutorials} />
          )}
          {projects.length > 0 && (
            <TutorialCategory title="Projects" tutorials={projects} />
          )}
        </>
      );
    } else {
      if (tutorials.length === 0) {
        return (
          <div className="flex flex-col justify-center items-center h-full">
            <img src={nodata} alt="No results found" className="w-full max-w-xs sm:max-w-sm md:max-w-md" />
            <p className="text-gray-400 text-lg sm:text-xl">No Results Found</p>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
          {tutorials.map((tutorial) => (
            <LearnCard key={tutorial.id || tutorial.name} tutorial={tutorial} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="relative sm:h-screen overflow-x-scroll flex gap-3 p-4 text-white lg:text-sm text-xs">
      <div className="w-full h-fit flex flex-col">
        <div className="flex max-sm:flex-col gap-2 max-sm:items-center justify-between items-center mb-6">
          <div className="flex justify-start max-sm:w-full items-start gap-5">
            <img
              src={burgermenuf}
              alt="Toggle Sidebar"
              className="w-8 mt-2 cursor-pointer bg-transparent hover:bg-gray-600 rounded-lg"
              onClick={toggleSidebar}
            />
            <div className="flex flex-col">
              <h2 className="text-2xl w-full font-bold">{selectedCategoryName}</h2>
              <p className="text-gray-400">
                {selectedCategory === "All" 
                  ? (groupedTutorials.blender_tutorials.length + groupedTutorials.vfx_tutorials.length + groupedTutorials.projects.length)
                  : tutorials.length
                } Tutorials Available
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading tutorials...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          renderTutorials()
        )}
      </div>
    </div>
  );
}

const TutorialCategory = ({ title, tutorials }) => (
  <>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
      {tutorials.map((tutorial) => (
        <LearnCard key={tutorial.id || tutorial.name} tutorial={tutorial} />
      ))}
    </div>
  </>
);