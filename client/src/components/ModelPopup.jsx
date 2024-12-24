import React, { useState } from "react";

const ModelPopup = ({ model, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(
    model?.images?.length > 0
      ? model.images[0]
      : "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg"
  );

  if (!model) return null; // Return nothing if no model is selected

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        {/* New Model */}

        <div className="absolute top-2 left-2">
          <h1
            className={`${model.isNew ? "" : "hidden"} px-3 py-1 bg-lime-500 text-black font-medium rounded`}
          >
            {model.isNew ? "New" : ""}
          </h1>
        </div>


        <div className="flex flex-wrap md:flex-nowrap">
          {/* Left: Image Gallery */}
          <div className="w-full md:w-2/3">
            {/* Large Image */}
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={model.title}
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 max-md:justify-center overflow-x-auto">
              {model?.images?.length > 0 ? (
                model.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Model ${index}`}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                      selectedImage === image ? "border-2 border-lime-400" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No additional images available.
                </p>
              )}
            </div>
          </div>

          {/* Right: Model Details */}
          <div className="w-full md:w-1/3 pl-6">
            <h2 className="text-2xl font-bold text-lime-400 mb-2">
              {model.title}
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              <strong>Type:</strong> {model.type}
            </p>

            <p className="text-gray-300 mb-4">
              <strong>Category:</strong> {model.category}
            </p>

            <p className="text-gray-300 mb-4">
              <strong>Release Date:</strong>{" "}
              {new Date(model.releaseDate).toLocaleDateString()}
            </p>

            <p className="text-gray-300 mb-4">
              <strong>Downloads:</strong> {model.downloads}
            </p>

            <p className="text-gray-300 mb-4">
              <strong>Export Formats:</strong> {model.exportFormats.join(", ")}
            </p>

            <ul className="flex flex-col text-sm text-lime-400 mb-4 gap-2">
              <li>
                <strong >Early Access:</strong>{" "}
                <span className="text-gray-400">{model.earlyAccess ? "Yes" : "No"}</span>
              </li>
            </ul>
            
            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                className="bg-gray-950 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:bg-slate-900"
                onClick={() => alert("Download initiated")}
              >
                Download
              </button>
              <button
                className="bg-lime-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-lime-600"
                onClick={() => alert("Redirecting to Patreon")}
              >
                Patreon (No More Ads)
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPopup;
