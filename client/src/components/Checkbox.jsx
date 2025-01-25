import React from "react";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer gap-2 b text-gray-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="appearance-none cursor-pointer w-4 h-4 border border-gray-100 border-spacing-2 rounded-sm checked:bg-lime-400 checked:border-black checked:border-2  focus:outline-none"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;