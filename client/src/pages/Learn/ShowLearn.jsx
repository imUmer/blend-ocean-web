import React from "react";
import LearnCard from "./LearnCard";

export default function ShowLearn() {
  const categories = [
    {
      title: "Blender Tutorials",
      description: "Blender",
      videos: [
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "How to download Blender in 2023",
          description: "Learn how to get started with Blender.",
          link: "https://www.youtube.com/watch?v=example1",
        },
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Blender Beginner's Guide",
          description: "A complete beginner's guide to Blender.",
          link: "https://www.youtube.com/watch?v=example2",
        },
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Blender Beginner's Guide",
          description: "A complete beginner's guide to Blender.",
          link: "https://www.youtube.com/watch?v=example2",
        },
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Blender Beginner's Guide",
          description: "A complete beginner's guide to Blender.",
          link: "https://www.youtube.com/watch?v=example2",
        },
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Blender Beginner's Guide",
          description: "A complete beginner's guide to Blender.",
          link: "https://www.youtube.com/watch?v=example2",
        },
      ],
    },
    {
      title: "VFX Tutorials",
      description: "Blender, After Effects, Photoshop...",
      videos: [
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Cloth burning VFX using Blender & AE",
          description: "Create realistic VFX effects.",
          link: "https://www.youtube.com/watch?v=example3",
        },
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Lightning VFX in Blender",
          description: "Learn lightning effects with Blender.",
          link: "https://www.youtube.com/watch?v=example4",
        },
      ],
    },
  ];

  return (
    <div className="p-8 bg-neutral-900 text-white space-y-8">
      {categories.map((category, index) => (
        <div key={index}>
          <h2 className="text-xl font-bold">{category.title}</h2>
          <p className="text-sm text-gray-400 mb-4">{category.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {category.videos.map((video, idx) => (
              <LearnCard
                key={idx}
                image={video.image}
                title={video.title}
                description={video.description}
                link={video.link}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}