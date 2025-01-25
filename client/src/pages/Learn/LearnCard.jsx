import React from "react";

export default function LearnCard({ image, title, description, link }) {
  return (
    <div className="bg-neutral-800 rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-2">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-500 text-sm font-semibold hover:underline"
        >
          WATCH VIDEO &gt;
        </a>
      </div>
    </div>
  );
}