import support from '../assets/images/support.png';

const Support = () => {
    const supporters = [
      "Blend Ocean", "Mark Meijs", "SuRiU", "Cierwen Newell", "Le Tien An", "BigGunRaze",
      "Zane Erickson", "Raymond Wong", "Drafthouse", "Jeff Goad", "Alessandro Ramarini",
      "Ludovic Duchamp", "Jamie Mertz", "Ing.arch.Peter Marcinko", "Daniel Donofrio",
      "Igor YVerity St Clair-Prime", "Elizaveta Zyuzina", "Thomas JACKSON",
    ];
  
    return (
      <div className="bg-black text-white py-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">SUPPORTED BY</h2>
          <div className="flex flex-wrap md:justify-center justify-around md:gap-20 gap-6 mt-4">
          <img
              src={support}
              alt="TestRail Logo"
              className="h-14 w-auto"
            />
            <img
              src={support}
              alt="TestRail Logo"
              className="h-14 w-auto"
            />
            <img
              src={support}
              alt="TestRail Logo"
              className="h-14 w-auto"
            />
            <img
              src={support}
              alt="TestRail Logo"
              className="h-14 w-auto"
            />
          </div>
        </div>
  
        {/* Message Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 p-5">
          <p className="text-sm sm:text-base">
            Your contributions have made it possible for us to continue our work
            in a sustainable manner. With your support, we are able to expand our
            collection of assets and enhance the quality of what we offer.
          </p>
          <p className="text-sm sm:text-base mt-2">
            Thank you for making a difference.
          </p>
        </div>
  
        {/* Call-to-Action Button */}
        <div className="text-center mb-10">
          <button className="text-xs sm:text-base px-6 py-2 bg-lime-500 text-black font-semibold rounded-full hover:bg-lime-600 transition">
            BECOME A PATRON
          </button>
        </div>
  
        {/* Supporters Section */}
        <div className="text-center">
          <h3 className="text-md sm:text-xl p-5 font-semibold mb-4">Created With Love Of Patrons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm p-2">
            {supporters.map((supporter, index) => (
              <p key={index}>{supporter}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Support;  