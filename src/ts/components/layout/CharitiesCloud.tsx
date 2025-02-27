import React from "react";
import AllCharities from "../../utilities/AllCharities";
import { Link } from "react-router-dom";

const CharitiesCloud: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary-400 via-accent-200 to-background-50 text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-12">Charities we collaborate with</h2>

        {/* Fluid Logo Layout */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-15 mb-12">
          {AllCharities.map((charity, index) => (
            <div key={charity.name} className={`flex items-center space-x-3 ${index % 2 === 0 ? "translate-y-2" : "-translate-y-2"}`}>
              <img src={charity.logo} alt={charity.name} className="h-10 md:h-12 object-contain" />
              <span className="text-base text-text-900">{charity.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to="/charities" className="p-3 bg-secondary-600 rounded-2xl text-white text-lg hover:bg-secondary-700">
        Read more about these charities
      </Link>
    </section>
  );
};

export default CharitiesCloud;
