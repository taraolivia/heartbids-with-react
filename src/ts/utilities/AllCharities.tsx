/* eslint-disable react-refresh/only-export-components */

export interface Charity {
  name: string;
  logo: string;
  description: string;
  categories: string[];
}

export const AllCharities: Charity[] = [
  {
    name: "Nourish Now",
    logo: "/images/charities/icons8-vegan-food-96.png",
    description: "Providing meals and food assistance to those in need.",
    categories: ["Humanitarian Aid", "Healthcare"],
  },
  {
    name: "Paw Haven",
    logo: "/images/charities/icons8-cat-caregivers-96.png",
    description: "Providing shelter and medical care for rescued animals.",
    categories: ["Animal Welfare", "Healthcare"],
  },
  {
    name: "Little Sparks",
    logo: "/images/charities/icons8-abc-block-96.png",
    description: "Bringing early education to underprivileged children.",
    categories: ["Education", "Children & Family"],
  },
  {
    name: "Canvas Collective",
    logo: "/images/charities/icons8-paint-96.png",
    description: "Supporting artists and funding community art programs.",
    categories: ["Arts & Culture", "Education"],
  },
  {
    name: "Verdant Earth",
    logo: "/images/charities/icons8-green-earth-96.png",
    description: "Fighting climate change through reforestation projects.",
    categories: ["Nature & Earth", "Sustainability"],
  },

  {
    name: "Carbonia",
    logo: "/images/charities/icons8-manufacturing-96.png",
    description: "Developing sustainable solutions for carbon reduction.",
    categories: ["Nature & Earth", "Climate Action"],
  },
  {
    name: "Hopeful Hearts",
    logo: "/images/charities/icons8-flying-stork-with-bundle-96.png",
    description: "Supporting children in hospitals with care and resources.",
    categories: ["Healthcare", "Children & Family"],
  },
  {
    name: "Golden Years",
    logo: "/images/charities/icons8-elder-96.png",
    description: "Enhancing the quality of life for the elderly.",
    categories: ["Senior Care", "Healthcare"],
  },
  {
    name: "Beetle Brigade",
    logo: "/images/charities/icons8-insect-96.png",
    description: "Preserving insect biodiversity and pollinator protection.",
    categories: ["Animal Welfare", "Nature & Earth"],
  },
  {
    name: "Ocean Song",
    logo: "/images/charities/icons8-orca-96.png",
    description: "Protecting marine life and ocean ecosystems.",
    categories: ["Animal Welfare", "Nature & Earth"],
  },
  {
    name: "Re-cycle",
    logo: "/images/charities/icons8-recycle-bin-96.png",
    description: "Promoting a circular economy and waste reduction.",
    categories: ["Sustainability", "Climate Action"],
  },
  {
    name: "Vital",
    logo: "/images/charities/icons8-health-96.png",
    description: "Providing access to essential medical treatments worldwide.",
    categories: ["Healthcare", "Humanitarian Aid"],
  },

  {
    name: "Atom",
    logo: "/images/charities/icons8-atom-96.png",
    description:
      "Funding scientific research and innovation for a better future.",
    categories: ["Science & Innovation", "Education"],
  },
  {
    name: "WildGuard",
    logo: "/images/charities/wildguard.png",
    description: "Protecting wildlife and restoring natural habitats.",
    categories: ["Animal Welfare", "Nature & Earth"],
  },
  {
    name: "MamaCare",
    logo: "/images/charities/icons8-mother-96.png",
    description: "Ensuring maternal healthcare and postnatal support.",
    categories: ["Healthcare", "Children & Family"],
  },
  {
    name: "Teddy Bear Trust",
    logo: "/images/charities/icons8-teddy-96.png",
    description:
      "Bringing comfort to children in crisis through toys and care.",
    categories: ["Children & Family", "Humanitarian Aid"],
  },
];

export default AllCharities;
