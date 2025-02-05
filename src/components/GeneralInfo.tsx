const GeneralInfo = () => {
    return (
      <section className="bg-gradient-to-b from-gray-100 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading and Description */}
          <h2 className="text-3xl font-bold text-gray-800">About HeartBids</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            HeartBids is a platform where every winning bid supports a good cause. Find unique items and make a difference with every auction.
          </p>
  
          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600">
              Browse Listings
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
              Learn More
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
              Become a Seller
            </button>
          </div>
  
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">1K+</h3>
              <p className="text-gray-600">Auctions held this month</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">12K+</h3>
              <p className="text-gray-600">Verified sellers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">€1397+</h3>
              <p className="text-gray-600">Donated to charity</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default GeneralInfo;
  