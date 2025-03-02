import { useState } from "react";
import AllCharities, { Charity } from "../utilities/AllCharities";
import FeaturedCharity from "../components/layout/FeaturedCharity";
import Footer from "../components/layout/Footer";
import GeneralInfo from "../components/layout/GeneralInfo";
import MostPopularListings from "../components/lots/MostPopularListings";
import FAQ from "../components/layout/FAQ";

const Charities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from all charities
  const categories = ["All", ...new Set(AllCharities.flatMap((charity) => charity.categories))];

  // Filter charities based on selected category
  const filteredCharities = selectedCategory && selectedCategory !== "All" ? AllCharities.filter((charity) => charity.categories.includes(selectedCategory)) : AllCharities;

  return (
    <div>
      <div className="pt-2">
        <FeaturedCharity />
      </div>

      <section className="py-16 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">All charities on HeartBids</h2>
          <p className="text-lg text-gray-600 mb-10">Discover the amazing organizations making a difference through HeartBids.</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 
                ${selectedCategory === category || (category === "All" && !selectedCategory) ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Charities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCharities.map((charity: Charity) => (
              <div key={charity.name} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
                {/* Charity Logo */}
                <img src={charity.logo} alt={charity.name} className="h-16 mb-4" />
                {/* Charity Name */}
                <h3 className="text-lg font-semibold text-gray-800">{charity.name}</h3>
                {/* Charity Description */}
                <p className="text-sm text-gray-600 mt-2">{charity.description}</p>
                {/* Charity Categories (Multiple Tags) */}
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {charity.categories.map((cat) => (
                    <span key={cat} className="text-xs font-medium px-3 py-1 rounded-full bg-gray-200 text-gray-800">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* General Info Section */}
      <GeneralInfo />

      {/* Popular Lots */}
      <MostPopularListings />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Charities;
