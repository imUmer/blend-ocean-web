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
          videoSrc: "https://www.youtube.com/watch?v=hNzQ1G3bZI0",
          details: {
            title: "How to download Blender in 2023",
            tutorial: "Tutorial_01",
            category: "Blender Tutorials",
            date: "Jan 5, 2023",
            downloadLink: "https://example.com/download1",
            supportLink: "https://patreon.com/support1",
          },
        },
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Blender Beginner's Guide",
          description: "A complete beginner's guide to Blender.",
          videoSrc: "https://www.youtube.com/watch?v=hNzQ1G3bZI0&pp=ygUIYmxlbmRlciA%3D",
          details: {
            title: "Blender Beginner's Guide",
            tutorial: "Tutorial_02",
            category: "Blender Tutorials",
            date: "Feb 10, 2023",
            downloadLink: "https://example.com/download2",
            supportLink: "https://patreon.com/support2",
          },
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
          videoSrc: "https://www.youtube.com/watch?v=example3",
          details: {
            title: "Cloth burning VFX using Blender & AE",
            tutorial: "Tutorial_03",
            category: "VFX Tutorials",
            date: "Mar 15, 2023",
            downloadLink: "https://example.com/download3",
            supportLink: "https://patreon.com/support3",
          },
        },
        {
          image: "https://thumbs.dreamstime.com/b/no-photo-available-icon-isolated-dark-background-simple-vector-logo-no-photo-available-icon-isolated-dark-background-269301619.jpg",
          title: "Lightning VFX in Blender",
          description: "Learn lightning effects with Blender.",
          videoSrc: "https://www.youtube.com/watch?v=example4",
          details: {
            title: "Lightning VFX in Blender",
            tutorial: "Tutorial_04",
            category: "VFX Tutorials",
            date: "Apr 20, 2023",
            downloadLink: "https://example.com/download4",
            supportLink: "https://patreon.com/support4",
          },
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
                videoSrc={video.videoSrc}
                details={video.details}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}