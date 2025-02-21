import React from "react";

interface Charity {
  name: string;
  logo: string;
}

const charities: Charity[] = [
  { name: "Vital", logo: "/images/charities/icons8-health-96.png" },
    { name: "Paw Haven", logo: "/images/charities/icons8-cat-caregivers-96.png" },
    { name: "Little Sparks", logo: "/images/charities/icons8-abc-block-96.png" },
    { name: "Canvas Collective", logo: "/images/charities/icons8-paint-96.png" },
    { name: "Verdant Earth", logo: "/images/charities/icons8-green-earth-96.png" },
    { name: "Nourish Now", logo: "/images/charities/icons8-vegan-food-96.png" },
    { name: "Carbonia", logo: "/images/charities/icons8-manufacturing-96.png" },
    { name: "WildGuard", logo: "/images/charities/wildguard.png" },

    { name: "Hopeful Hearts", logo: "/images/charities/icons8-flying-stork-with-bundle-96.png" },
    { name: "Teddy Bear Trust", logo: "/images/charities/icons8-teddy-96.png" },
    { name: "Golden Years", logo: "/images/charities/icons8-elder-96.png" },
    { name: "Beetle Brigade", logo: "/images/charities/icons8-insect-96.png" },
    { name: "Ocean Song", logo: "/images/charities/icons8-orca-96.png" },
    { name: "MamaCare", logo: "/images/charities/icons8-mother-96.png" },

    { name: "Atom", logo: "/images/charities/icons8-atom-96.png" },
    { name: "Re-cycle", logo: "/images/charities/icons8-recycle-bin-96.png" }
  ];
  

const CharitiesCloud: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-300 via-purple-300 to-white text-center">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        Charities we collaborate with
      </h2>
  
      {/* Fluid Logo Layout */}
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-15">
        {charities.map((charity, index) => (
          <div 
            key={charity.name} 
            className={`flex items-center space-x-3 ${
              index % 2 === 0 ? 'translate-y-2' : '-translate-y-2'
            }`}
          >
            <img
              src={charity.logo}
              alt={charity.name}
              className="h-10 md:h-12 object-contain"
            />
            <span className="text-base text-gray-800">{charity.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default CharitiesCloud;
