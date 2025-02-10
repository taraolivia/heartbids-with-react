import { useState, useEffect } from "react";
import LotCard from "./LotCard";
import SortDropdown from "./SortDropdown";
import { API_LISTINGS } from "../js/api/constants";
import { getHeaders } from "../js/api/headers";
import { Listing } from "../ts/types/listingTypes";

const AllLots = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [includeEnded, setIncludeEnded] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 30; // Number of listings per page
  const [totalPages, setTotalPages] = useState(1); // ✅ FIX: Dynamically update total pages

  useEffect(() => {
    async function fetchAllListings() {
      const allListings: Listing[] = [];
      let page = 1;
      let hasMore = true;

      try {
        while (hasMore) {
          const response = await fetch(`${API_LISTINGS}?_bids=true&_seller=true&page=${page}`, {
            method: "GET",
            headers: getHeaders(),
          });

          if (!response.ok) throw new Error("Failed to fetch listings");

          const result: { data: Listing[]; meta: { isLastPage: boolean } } = await response.json();
          console.log(`Page ${page} Response:`, result);

          allListings.push(...result.data);
          hasMore = !result.meta.isLastPage;
          page++;
        }

        console.log(`Total Listings Fetched: ${allListings.length}`);

        setListings(allListings);
        setTotalPages(Math.ceil(allListings.length / perPage)); // ✅ FIX: Calculate total pages dynamically
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    }

    fetchAllListings();
  }, []);

  // ✅ Separate active and ended auctions
  const activeLots = listings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now());
  const endedLots = listings.filter((lot) => new Date(lot.endsAt).getTime() <= Date.now());

  const combinedLots = includeEnded ? [...activeLots, ...endedLots] : activeLots;

  // ✅ Apply sorting AFTER fetching all listings
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">All Lots</h2>

        {/* Sorting Dropdown */}
        <SortDropdown selectedSort={sortType} onSortChange={setSortType} />

        {/* Include Ended Checkbox */}
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

        {paginatedLots.length === 0 ? (
          <div className="text-center text-gray-600 mt-8">No lots available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedLots.map((lot) => (
              <LotCard
                key={lot.id}
                id={lot.id}
                image={lot.media.length > 0 ? lot.media[0].url : "https://via.placeholder.com/300"}
                title={lot.title}
                price={
                  Array.isArray(lot.bids) && lot.bids.length > 0
                    ? Math.max(...lot.bids.map((bid) => bid.amount))
                    : 0
                }
                bids={lot._count?.bids || 0}
                closingDate={lot.endsAt}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            Previous
          </button>

          <span className="px-4 py-2 mx-1 bg-gray-200">{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllLots;
