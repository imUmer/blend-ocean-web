const About = () => {
    return (
      <section className=" flex-1 text-white py-12 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          {/* Title */}
          <h2 className="text-lg sm:text-2xl font-bold mb-6">ABOUT US!</h2>
  
          {/* Content */}
          <p className="text-xs sm:text-sm leading-relaxed">
            Welcome to <span className="font-semibold">Blend Ocean</span>, the ultimate open-source library of 3D models for Blender users.
            Our library is designed to provide Blender users with a vast collection of high-quality 3D models,
            textures, and HDRIs that can be used for a variety of purposes such as animation, game development,
            architectural visualization, augmented reality (AR), and more.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed mt-4">
            We are constantly updating and expanding our library to ensure that it remains current and relevant, with new models being added monthly.
            Our library is compatible with the latest version of Blender.
          </p>
        </div>
      </section>
    );
  };
  
  export default About;
  