import React from "react";

const ModelCard = ({ model }) => {
  return (
    <div className=" bg-black/30 w-full rounded-lg shadow hover:shadow-lg">
      <p className="text-lime-400 font-bold pl-2">•</p>
      <div className="flex items-center justify-center px-3 h-48 overflow-hidden mb-3">
        <img
          src={model.image}
          alt={model.name}
          className="h-auto max-w-full rounded-lg"
        />
      </div>
      <p className="text-xs font-light px-2 py-2">{model.name}</p>
    </div>
  );
};

export default ModelCard;
