import React from "react";

export default function LearnPopup({ tutorial, onClose }) {
  if (!tutorial) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/* Popup Container */}
      <div className="bg-neutral-900 rounded-lg shadow-lg overflow-hidden w-[90%] md:w-[80%] lg:w-[70%] max-h-[90vh] flex flex-col md:flex-row">
        {/* Left Side: Video */}
        <div className="w-full md:w-2/3 bg-black relative">
          <iframe
            src={tutorial.videoSrc.replace("watch?v=", "embed/")}
            title={tutorial.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[350px] md:h-[500px] object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          ></iframe>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/3 p-6 flex flex-col justify-between text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">{tutorial.title}</h2>
          <ul className="space-y-3 text-sm md:text-base text-gray-300">
            <li><strong className="text-lime-500">Tutorial: </strong>{tutorial.tutorial}</li>
            <li><strong className="text-lime-500">Category: </strong>{tutorial.categoryname}</li>
            <li><strong className="text-lime-500">Date: </strong>{tutorial.date}</li>
          </ul>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button onClick={() => window.open(tutorial.downloadLink, "_blank")} className="bg-gray-950 text-white font-bold py-2 px-4 rounded-lg shadow-md">
              Download
            </button>
            <button onClick={() => window.open(tutorial.supportLink, "_blank")} className="bg-lime-500 text-white font-bold py-2 px-4 rounded-lg">
              Patreon (No Ads)
            </button>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-700 text-white rounded-full w-10 h-10">
          ✕
        </button>
      </div>
    </div>
  );
}
