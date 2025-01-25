import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useMenu } from '../../context/MenuContext';
import ShowLearn from './ShowLearn';
import LearnSidebar from './LearnSidebar';

export default function LearnPlot() {
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
        {isSidebarOpen &&<LearnSidebar className="" toggleSidebar={toggleSidebar} /> }
        <div className="flex-1">
          <ShowLearn toggleSidebar={toggleSidebar} type={type} />
        </div>
      </div>
    );
}

