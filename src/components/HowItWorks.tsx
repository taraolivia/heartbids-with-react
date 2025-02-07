import React from "react";

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Sign up",
    description: "Sign up for creating your first online store with ease.",
  },
  {
    number: 2,
    title: "Add your products",
    description: "Add your products to your store and customize.",
  },
  {
    number: 3,
    title: "Sell and earn",
    description: "Sell and earn as much as you can. Grow fast.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How it works</h2>
          <p className="text-gray-600 mt-2">
            With lots of unique blocks, you can easily build a page without
            coding. Build your next landing page.
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
              <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">
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
