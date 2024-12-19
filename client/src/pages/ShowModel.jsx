import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Gallery from '../components/Gallery';
import { MenuProvider } from "../context/MenuContext";

const ShowModel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {isSidebarOpen &&<Sidebar toggleSidebar={toggleSidebar} /> }
      <div className="flex-1">
        <Gallery toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ShowModel;
