import React from "react";

export default function LearnPopup({ videoSrc, details, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/* Popup Container */}
      <div className="bg-neutral-900 rounded-lg shadow-lg overflow-hidden w-[90%] md:w-[80%] lg:w-[70%] max-h-[90vh] flex flex-col md:flex-row">
        {/* Left Side: Video */}
        <div className="w-full md:w-1/2 bg-black relative">
          <iframe
            src={videoSrc.replace("watch?v=", "embed/")}
            title={details?.title || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          ></iframe>
          {/* Play Icon for Mobile */}
          {!videoSrc && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">No Video</span>
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between text-white">
          {/* Details */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{details?.title}</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <strong>Tutorial: </strong> {details?.tutorial}
              </li>
              <li>
                <strong>Category: </strong> {details?.category}
              </li>
              <li>
                <strong>Date: </strong> {details?.date}
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-4">
            <button
              onClick={() => window.open(details?.downloadLink, "_blank")}
              className="w-full bg-lime-500 text-black text-sm font-semibold py-2 rounded-lg hover:bg-lime-400"
            >
              PROJECT FILE DOWNLOAD
            </button>
            <button
              onClick={() => window.open(details?.supportLink, "_blank")}
              className="w-full bg-lime-600 text-black text-sm font-semibold py-2 rounded-lg hover:bg-lime-500"
            >
              Support us on Patreon
              <br />
              <span className="text-xs text-gray-900">No more ADS</span>
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
