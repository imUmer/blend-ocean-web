import React from "react";

const ModelCard = ({ model }) => {
console.log("haha"+model.title);
  return (
    <div className=" bg-black/30 w-full hover:bg-gray-700 hover:text-lime-500 cursor-pointer rounded-lg shadow hover:shadow-lg"> 
          {model.earlyAccess === true ? <p className="text-lime-400 font-bold pl-2">•</p> : <p className="text-slate-400 font-bold pl-2">•</p> }  
      <div className="flex items-center justify-center px-3 h-48 overflow-hidden mb-3">
        <img
          src={model.image || "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg"}
          alt={model.title}
          className="h-auto rounded-lg"
        />
      </div>
      <p className="text-xs font-light px-2 py-2">{model.title}</p>
    </div>
  );
};

export default ModelCard;
