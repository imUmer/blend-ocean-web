import React from "react";

const ModelCard = ({ model, handleModelClick }) => {
  return (
    <div className="relative bg-black/40 w-full hover:bg-gray-700 hover:text-lime-500 cursor-pointer rounded-lg shadow hover:shadow-lg" onClick={() => handleModelClick(model)} >
          {/* {model.earlyAccess === true ? <p className="text-lime-400 font-bold pl-2">•</p> : <p className="text-slate-400 font-bold pl-2">•</p> }   */}
          <svg className="absolute top-2 left-2" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7">
            <circle id="new_texture_3" data-name="new texture 3" cx="3.5" cy="3.5" r="3.5" fill={`${model.earlyAccess ? "#abff00" : "#888888"}`}/>
          </svg>

      <div className="flex items-center justify-center m-0.5 rounded-tl-lg rounded-tr-lg h-48 overflow-hidden ">
        <img
          src={model?.image || "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg"}
          alt={model.title}
          className="h-auto rounded-lg"
        />
      </div>
      <p className="text-xs font-light px-2 py-2">{model.title}</p>
    </div>
  );
};

export default ModelCard;
