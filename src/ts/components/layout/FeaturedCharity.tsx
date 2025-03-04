import { useEffect, useState } from "react";
import AllCharities, { Charity } from "../../utilities/AllCharities";

const featuredCharities = AllCharities.filter((charity) =>
  ["Little Sparks", "Hopeful Hearts", "WildGuard"].includes(charity.name),
);

const FeaturedCharity: React.FC = () => {
  const [topCharity, setTopCharity] = useState<Charity | null>(null);

  useEffect(() => {
    const randomCharity =
      featuredCharities[Math.floor(Math.random() * featuredCharities.length)];
    setTopCharity(randomCharity);
  }, []);

  return (
    <section className=" py-20 px-4 bg-gradient-to-t from-background-50 via-secondary-100 to-primary-200">
      <div className="max-w-4xl mx-auto text-center m-auto">
        <h2 className="text-4xl font-bold text-gray-800 my-6">
          Featured Charities
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Discover some of our most impactful organizations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCharities.map((charity) => (
            <div
              key={charity.name}
              className={`relative bg-white shadow-lg rounded-lg p-6 flex flex-col pt-12 items-center text-center transition-transform ${
                topCharity?.name === charity.name
                  ? "scale-110 border-4 border-yellow-400 shadow-xl animate-glow"
                  : "hover:scale-105"
              }`}
            >
              {topCharity?.name === charity.name && (
                <div className="absolute top-2 bg-yellow-600 text-white text-base font-bold px-3 py-1 rounded-full shadow-md">
                  🌟 This Month's Top Charity
                </div>
              )}

              <img
                src={charity.logo}
                alt={charity.name}
                className="h-20 mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800">
                {charity.name}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {charity.description}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {charity.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-gray-200 text-gray-800"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCharity;
