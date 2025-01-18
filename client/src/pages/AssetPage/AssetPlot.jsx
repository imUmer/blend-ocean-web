import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import ShowAssets from './ShowAssets';
import { useMenu } from '../../context/MenuContext';

export default function AssetPlot() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { type } = useParams();
    const { setSelectedType, setSelectedCollection } = useMenu();
    
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(()=>{
        setSelectedType(type);
        setSelectedCollection();
    },[])
  
    return (
      <div className="flex flex-col lg:flex-row">
        {isSidebarOpen &&<Sidebar className="" toggleSidebar={toggleSidebar} /> }
        <div className="flex-1">
          <ShowAssets toggleSidebar={toggleSidebar} type={type} />
        </div>
      </div>
    );
}
