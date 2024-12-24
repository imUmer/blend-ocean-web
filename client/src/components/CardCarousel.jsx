import React, { useRef } from "react";

const CardCarousel = () => {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const cards = [
    { id: 1, title: "Card 1", description: "Description of Card 1" },
    { id: 2, title: "Card 2", description: "Description of Card 2" },
    { id: 3, title: "Card 3", description: "Description of Card 3" },
    { id: 4, title: "Card 4", description: "Description of Card 4" },
    { id: 5, title: "Card 5", description: "Description of Card 5" },
    { id: 6, title: "Card 6", description: "Description of Card 6" },
  ];

  return (
    <div className="relative max-w-7xl mx-auto p-6">
      {/* Carousel Header */}
      <h1 className="text-center text-3xl font-bold text-white mb-6 uppercase">
        Featured Models
      </h1>

      {/* Carousel Container */}
      <div className="relative">
        {/* Buttons */}
        <button
          onClick={() => scrollCarousel("left")}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-md z-10"
        >
          &#10094;
        </button>
        <button
          onClick={() => scrollCarousel("right")}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-md z-10"
        >
          &#10095;
        </button>

        {/* Cards */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="min-w-[250px] bg-gray-900 rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              <p className="text-gray-400">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
