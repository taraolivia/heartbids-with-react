import { useState } from "react";
import LotCard from "./LotCard";
import SortDropdown from "./SortDropdown";
import { Listing } from "../ts/types/listingTypes";
import { useHeartBidsFilter } from "./useHeartBidsFilter";

interface AllLotsProps {
  listings: Listing[]; // ✅ Accept listings as a prop
}

const AllLots: React.FC<AllLotsProps> = ({ listings }) => {


  const [includeEnded, setIncludeEnded] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 30; // Number of listings per page
  const validListings = Array.isArray(listings) ? listings : []; // ✅ Ensure listings is always an array

  let filteredListings = includeEnded 
    ? validListings // ✅ Show all listings if `includeEnded` is checked
    : validListings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now()); // ✅ Only active listings
  

    const totalPages = Math.max(1, Math.ceil(filteredListings.length / perPage)); // ✅ Ensure at least 1 page

    console.log("🚀 Total listings received:", listings.length);
    console.log("✅ Total active listings:", listings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now()).length);
    console.log("⚠️ Total ended listings:", listings.filter((lot) => new Date(lot.endsAt).getTime() <= Date.now()).length);
    console.log("🔍 Total listings after filtering (based on checkbox):", filteredListings.length);
    console.log("📄 Total pages available:", totalPages);
    


  // ✅ Get the HeartBids filter state
  const { showOnlyHeartBids } = useHeartBidsFilter();

  if (showOnlyHeartBids) {
    filteredListings = filteredListings.filter((listing) => listing.tags?.includes("HeartBids"));
  }

  const combinedLots = filteredListings;


  // ✅ Apply sorting
  const sortedLots = [...combinedLots];
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

  // ✅ Apply pagination AFTER sorting
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
          <input type="checkbox" id="includeEnded" checked={includeEnded} onChange={() => setIncludeEnded(!includeEnded)} className="w-5 h-5 accent-pink-500 cursor-pointer" />
          <label htmlFor="includeEnded" className="text-gray-800 cursor-pointer">
            Include ended auctions
          </label>
        </div>

        {paginatedLots.length === 0 ? (
          <div className="text-center text-gray-600 mt-8">No lots available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-auto">
            {paginatedLots.map((lot) => (
              <LotCard key={lot.id} id={lot.id} image={lot.media.length > 0 ? lot.media[0].url : "/images/logo/HeartBids.png"} title={lot.title} price={Array.isArray(lot.bids) && lot.bids.length > 0 ? Math.max(...lot.bids.map((bid) => bid.amount)) : 0} bids={lot._count?.bids || 0} closingDate={lot.endsAt} tags={lot.tags ?? []} showTags={true} showSeller={true} seller={lot.seller} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center my-10 mt-16">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || totalPages === 0} // ✅ Ensure Next button is disabled correctly
            className={`px-4 py-2 mx-1 ${currentPage === 1 || totalPages === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            Previous
          </button>

          <span className="px-4 py-2 mx-1 bg-gray-200">{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages || totalPages === 0} // ✅ Prevent navigating past the last page
            className={`px-4 py-2 mx-1 ${currentPage >= totalPages || totalPages === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllLots;
