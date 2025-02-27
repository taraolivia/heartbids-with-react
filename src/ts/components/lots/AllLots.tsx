import { useState, useEffect } from "react";
import LotCard from "./LotCard";
import SortDropdown from "../ui/SortDropdown";
import { Listing } from "../../types/listingTypes";
import { useHeartBidsFilter } from "../../utilities/useHeartBidsFilter";
import SearchBar from "../ui/SearchBar";

interface AllLotsProps {
  listings: Listing[];
}

const AllLots: React.FC<AllLotsProps> = ({ listings }) => {
  const [includeEnded, setIncludeEnded] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 30;

  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const [searchQuery, setSearchQuery] = useState("");

  const { showOnlyHeartBids } = useHeartBidsFilter();

  // ✅ Update filtered listings whenever filters or search change
  useEffect(() => {
    let updatedListings = includeEnded
      ? listings // ✅ Show all listings if "Include Ended" is checked
      : listings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now()); // ✅ Only active listings

    // ✅ Apply HeartBids filter
    if (showOnlyHeartBids) {
      updatedListings = updatedListings.filter((listing) => listing.tags?.includes("HeartBids"));
    }

    // ✅ Apply Search
    if (searchQuery.trim()) {
      updatedListings = updatedListings.filter((listing) => listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || (listing.description && listing.description.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    setFilteredListings(updatedListings);
    setCurrentPage(1); // ✅ Reset pagination when filters or search change
  }, [includeEnded, showOnlyHeartBids, searchQuery, listings]);

  // ✅ Search handler updates the searchQuery state
  const handleSearch = (query: string) => {
    setSearchQuery(query); // ✅ Triggers `useEffect` to filter correctly
  };

  // ✅ Sorting after filtering
  const sortedLots = [...filteredListings];
  switch (sortType) {
    case "newest":
      sortedLots.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      break;
    case "oldest":
      sortedLots.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
      break;
    case "mostBids":
      sortedLots.sort((a, b) => (b._count?.bids || 0) - (a._count?.bids || 0));
      break;
    case "leastBids":
      sortedLots.sort((a, b) => (a._count?.bids || 0) - (b._count?.bids || 0));
      break;
    case "highestPrice":
      sortedLots.sort((a, b) => {
        const aHighestBid = Array.isArray(a.bids) && a.bids.length > 0 ? Math.max(...a.bids.map((bid) => bid.amount)) : 0;
        const bHighestBid = Array.isArray(b.bids) && b.bids.length > 0 ? Math.max(...b.bids.map((bid) => bid.amount)) : 0;
        return bHighestBid - aHighestBid;
      });
      break;
    case "lowestPrice":
      sortedLots.sort((a, b) => {
        const aHighestBid = Array.isArray(a.bids) && a.bids.length > 0 ? Math.max(...a.bids.map((bid) => bid.amount)) : 0;
        const bHighestBid = Array.isArray(b.bids) && b.bids.length > 0 ? Math.max(...b.bids.map((bid) => bid.amount)) : 0;
        return aHighestBid - bHighestBid;
      });
      break;
    case "endingSoon":
      sortedLots.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime());
      break;
    default:
      break;
  }

  // ✅ Pagination AFTER filtering & sorting
  const totalPages = Math.max(1, Math.ceil(sortedLots.length / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const paginatedLots = sortedLots.slice(startIndex, startIndex + perPage);

  return (
    <section className="px-6 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">All Lots</h2>

        {/* Sorting Dropdown */}
        <SortDropdown selectedSort={sortType} onSortChange={setSortType} bidListings={listings} setSortedListings={() => {}} />

        {/* Include Ended Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" id="includeEnded" checked={includeEnded} onChange={() => setIncludeEnded(!includeEnded)} className="w-5 h-5 accent-500 cursor-pointer" />
          <label htmlFor="includeEnded" className="text-gray-800 cursor-pointer">
            Include ended auctions
          </label>
        </div>

        {/* Search Component */}
        <SearchBar onSearch={handleSearch} />

        {/* ✅ Results count */}
        <p className="text-gray-600 text-sm mb-4">{filteredListings.length} results</p>

        {paginatedLots.length === 0 ? (
          <div className="text-center text-gray-600 mt-8">No lots available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-auto">
            {paginatedLots.map((lot) => (
              <LotCard key={lot.id} id={lot.id} image={lot.media.length > 0 ? lot.media[0].url : "/public/HeartBids.png"} title={lot.title} price={Array.isArray(lot.bids) && lot.bids.length > 0 ? Math.max(...lot.bids.map((bid) => bid.amount)) : 0} bids={lot._count?.bids || 0} closingDate={lot.endsAt} tags={lot.tags ?? []} showTags={true} showSeller={true} seller={lot.seller} />
            ))}
          </div>
        )}

       {/* ✅ Hide pagination if only 1 page */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 my-10 mt-16">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg transition ${
        currentPage === 1
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      Previous
    </button>

    <span className="text-gray-800 font-medium">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage >= totalPages}
      className={`px-4 py-2 rounded-lg transition ${
        currentPage >= totalPages
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      Next
    </button>
  </div>
)}

      </div>
    </section>
  );
};

export default AllLots;
