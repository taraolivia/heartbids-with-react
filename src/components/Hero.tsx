const Hero = () => {
    return (
      <section className="bg-gradient-to-b from-gray-100 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          {/* Left Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              An auction platform where winning bids fund a charity of your choice.
            </h1>
            <p className="text-gray-600 mt-4">
              Join with <span className="font-bold text-gray-800">4600+ Bidders</span> and start giving to charity right now.
            </p>
            {/* Avatars */}
            <div className="flex items-center mt-4">
              <img
                src="https://via.placeholder.com/40"
                alt="User 1"
                className="w-10 h-10 rounded-full border-2 border-white -ml-2"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="User 2"
                className="w-10 h-10 rounded-full border-2 border-white -ml-2"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="User 3"
                className="w-10 h-10 rounded-full border-2 border-white -ml-2"
              />
            </div>
            {/* Button */}
            <button className="bg-pink-500 text-white px-6 py-3 mt-6 rounded-lg shadow-md hover:bg-pink-600">
              Browse listings
            </button>
          </div>
  
          {/* Right Image Section */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex flex-wrap justify-center md:justify-end gap-4">
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 1"
              className="w-48 h-48 rounded-lg shadow-md"
            />
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 2"
              className="w-48 h-48 rounded-lg shadow-md"
            />
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 3"
              className="w-48 h-48 rounded-lg shadow-md"
            />
            <img
              src="https://via.placeholder.com/200"
              alt="Feature 4"
              className="w-48 h-48 rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  