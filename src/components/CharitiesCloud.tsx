import React from "react";

interface Charity {
  name: string;
  logo: string;
}

const charities: Charity[] = [
  { name: "Waverio", logo: "https://via.placeholder.com/100x50" },
  { name: "Logipsum", logo: "https://via.placeholder.com/100x50" },
  { name: "Alterbone", logo: "https://via.placeholder.com/100x50" },
  { name: "Tinygone", logo: "https://via.placeholder.com/100x50" },
  { name: "Preso", logo: "https://via.placeholder.com/100x50" },
  { name: "Ridoria", logo: "https://via.placeholder.com/100x50" },
  { name: "Carbonia", logo: "https://via.placeholder.com/100x50" },
  { name: "Incanto", logo: "https://via.placeholder.com/100x50" },
];

const CharitiesCloud: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-900 via-purple-900 to-black text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-8">
          Charities we collaborate with
        </h2>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
          {charities.map((charity) => (
            <div key={charity.name} className="flex items-center justify-center">
              <img
                src={charity.logo}
                alt={charity.name}
                className="max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharitiesCloud;
