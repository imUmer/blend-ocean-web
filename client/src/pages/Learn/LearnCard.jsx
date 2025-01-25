import React, { useState } from "react";
import LearnPopup from "./LearnPopup";

export default function LearnCard({ image, title, description, videoSrc, details }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-neutral-800 rounded-lg shadow-md overflow-hidden">
      {/* Card Content */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-2">{description}</p>
        <button
          onClick={handleOpenPopup}
          className="text-lime-500 text-sm font-semibold hover:underline"
        >
          WATCH VIDEO &gt;
        </button>
      </div>

      {/* Popup Component */}
      {showPopup && (
        <LearnPopup
          videoSrc={videoSrc}
          details={details}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
