import React from "react";

const steps = [
  {
    number: 1,
    title: "Create an Account",
    description:
      "Sign up for free and get 1000 credits to start bidding on exciting items.",
  },
  {
    number: 2,
    title: "List Your Items",
    description:
      "Have something valuable to auction? Easily create a listing with images and details.",
  },
  {
    number: 3,
    title: "Place Bids & Win",
    description:
      "Explore live auctions and place bids on items you love. The highest bidder wins!",
  },
  {
    number: 4,
    title: "Earn & Spend Credits",
    description:
      "Sell your items to earn more credits, and use them to bid on exclusive listings.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How HeartBids Works</h2>
          <p className="text-gray-600 mt-2">
            Join thousands of bidders and sellers in an easy-to-use auction marketplace.
            Create listings, place bids, and win unique items today!
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-sm"
            >
              {/* Step Number */}
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">
                {step.number}
              </div>
              {/* Step Title */}
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              {/* Step Description */}
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
