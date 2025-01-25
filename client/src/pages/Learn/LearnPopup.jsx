import React from "react";

export default function LearnPopup({ videoSrc, details, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/* Popup Container */}
      <div className="bg-neutral-900 rounded-lg shadow-lg overflow-hidden w-[90%] md:w-[80%] lg:w-[70%] max-h-[90vh] flex flex-col md:flex-row">
        {/* Left Side: Video */}
        <div className="w-full md:w-2/3 bg-black relative">
          <iframe
            src={videoSrc.replace("watch?v=", "embed/")}
            title={details?.title || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[350px] md:h-[500px] object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          ></iframe>
          {/* Play Icon for Mobile */}
          {!videoSrc && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">No Video</span>
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/3 p-6 flex flex-col justify-between text-white">
          {/* Details */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gradient">{details?.title}</h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-300">
              <li>
                <strong className="text-lime-500">Tutorial: </strong> {details?.tutorial}
              </li>
              <li>
                <strong className="text-lime-500">Category: </strong> {details?.category}
              </li>
              <li>
                <strong className="text-lime-500">Date: </strong> {details?.date}
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => window.open(details?.downloadLink, "_blank")}
              className="bg-gray-950 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:bg-slate-900 transition"
            >
              Download
            </button>
            <button
              onClick={() => window.open(details?.supportLink, "_blank")}
              className="bg-lime-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-lime-600 transition"
            >
              Patreon (No More Ads)
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
