const GeneralInfo = () => {
  return (
    <section className="bg-gradient-to-b from-background-50 to-primary-200 py-16 font-serif">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-text-900 text-xl text-center font-serif">
        <p className="  mt-4  mx-auto text-left">
          HeartBids is an auction platform where every winning bid supports a
          good cause. Sellers list things like handmade crafts, custom artwork,
          surprise packages, and unique experiences. When you win an auction,
          you get to choose which charity from our list receives the proceeds.
          Find something you love, place your bid, and make a difference with
          every auction.{" "}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-800">1K+</h3>
            <p className="text-gray-600">Auctions held this month</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">12K+</h3>
            <p className="text-gray-600">Verified sellers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">€1397+</h3>
            <p className="text-gray-600">Donated to charity</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralInfo;
