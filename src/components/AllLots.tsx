import { useState } from "react";
import LotCard from "./LotCard";
import SortDropdown from "./SortDropdown"; // ✅ Import sorting component

type Seller = {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
};

type AuctionListing = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  media: string[];
  created: string;
  updated: string;
  endsAt: string;
  _count: {
    bids: number;
  };
  seller?: Seller;
};

type AllLotsProps = {
  listings: AuctionListing[];
};

const AllLots = ({ listings }: AllLotsProps) => {
  const [includeEnded, setIncludeEnded] = useState(false);
  const [sortType, setSortType] = useState("newest"); // ✅ Default sorting: Newest

  // ✅ Separate active and ended auctions
  const activeLots = listings.filter((lot) => new Date(lot.endsAt).getTime() > new Date().getTime());
  const endedLots = listings.filter((lot) => new Date(lot.endsAt).getTime() <= new Date().getTime());

  let displayedLots: AuctionListing[] = [];

  if (!includeEnded) {
    displayedLots = activeLots.slice(0, 30); // ✅ Show at least 30 active auctions (if available)
  } else {
    const needed = 30 - activeLots.length;
    displayedLots = [...activeLots, ...endedLots.slice(0, needed)]; // ✅ Fill with ended auctions if needed
  }

  // ✅ Apply sorting based on selected filter
  switch (sortType) {
    case "mostBids":
      displayedLots.sort((a, b) => b._count.bids - a._count.bids);
      break;
    case "highestPrice":
      displayedLots.sort((a, b) => (b._count.bids || 0) - (a._count.bids || 0)); // ✅ Sorting by bids since price isn't in API
      break;
    case "lowestPrice":
      displayedLots.sort((a, b) => (a._count.bids || 0) - (b._count.bids || 0)); // ✅ Sorting by bids as a placeholder for price
      break;
    case "endingSoon":
      displayedLots.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime());
      break;
    default:
      break; // Newest is already in default order
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">All Lots</h2>

        {/* ✅ Sorting Dropdown */}
        <SortDropdown selectedSort={sortType} onSortChange={setSortType} />

        {/* ✅ Checkbox to toggle ended auctions */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="includeEnded"
            checked={includeEnded}
            onChange={() => setIncludeEnded(!includeEnded)}
            className="w-5 h-5 accent-pink-500 cursor-pointer"
          />
          <label htmlFor="includeEnded" className="text-gray-800 cursor-pointer">
            Include ended auctions
          </label>
        </div>

        {displayedLots.length === 0 ? (
          <div className="text-center text-gray-600 mt-8">No lots available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedLots.map((lot) => (
              <LotCard
  image={lot.media.length > 0 ? lot.media[0] : "https://placehold.co/300x200"}
  title={lot.title}
  price={lot._count?.bids || 0}
  bids={lot._count?.bids || 0}
  closingDate={lot.endsAt}
  description={lot.description}
  tags={lot.tags}
  created={lot.created}
  updated={lot.updated}
  showDescription={false}
  showTags={false}
  showCreatedUpdated={false}
  seller={lot.seller} 
  showSeller={true} 
/>

            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLots;
