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

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch(`${API_LISTINGS}?limit=100&_bids=true`, {
          method: "GET",
          headers: getHeaders(),
        });

        if (!response.ok) throw new Error("Failed to fetch listings");

        const result = await response.json();
        console.log("API Response:", result);

        if (!result?.data || !Array.isArray(result.data)) {
          throw new Error("Unexpected API response format");
        }

        setListings(result.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    }

    fetchListings();
  }, []);

  // Separate active and ended auctions
  const activeLots = listings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now());
  const endedLots = listings.filter((lot) => new Date(lot.endsAt).getTime() <= Date.now());

  const displayedLots = includeEnded
    ? [...activeLots, ...endedLots].slice(0, 30) // Include ended if checkbox enabled
    : activeLots.slice(0, 30);

  // Apply sorting
  const sortedLots = [...displayedLots];
  switch (sortType) {
    case "newest":
      sortedLots.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      break;
    case "oldest":
      sortedLots.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
      break;
    case "mostBids":
      sortedLots.sort((a, b) => b._count.bids - a._count.bids);
      break;
    case "leastBids":
      sortedLots.sort((a, b) => a._count.bids - b._count.bids);
      break;
    case "highestPrice":
      sortedLots.sort((a, b) => {
        const aHighestBid = Array.isArray(a.bids) && a.bids.length > 0
          ? Math.max(...a.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0))
          : 0;
  
        const bHighestBid = Array.isArray(b.bids) && b.bids.length > 0
          ? Math.max(...b.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0))
          : 0;
  
        return bHighestBid - aHighestBid;
      });
      break;
      case "lowestPrice":
        sortedLots.sort((a, b) => {
          const aHighestBid = Array.isArray(a.bids) && a.bids.length > 0
            ? Math.max(...a.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0))
            : 0; // Use 0 for listings with no bids
      
          const bHighestBid = Array.isArray(b.bids) && b.bids.length > 0
            ? Math.max(...b.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0))
            : 0; // Use 0 for listings with no bids
      
          return aHighestBid - bHighestBid; // Sort from lowest to highest
        });
        break;
      
      
      
      
      
    case "endingSoon":
      sortedLots.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime());
      break;
    default:
      break; // Default to "newest"
  }
  

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

        {sortedLots.length === 0 ? (
          <div className="text-center text-gray-600 mt-8">No lots available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedLots.map((lot) => (
              <LotCard
                key={lot.id}
                id={lot.id}
                image={lot.media.length > 0 ? lot.media[0].url : "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png?Expires=1833634300&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXzKjKB9EBskp3Bvq-3FtMxhTtUHE2KAukzJMqO5LbXgl8FP60SfJ~0O6McJzoOI4pemUMFl24KopwqxhMfW43C9ZLP18whF774erFlx-k3YgWa5rfL3S-vPps0KlrpfcqiZS3KBesfBFlENrQscU03jUHEEH4m8BE5BpOm8P6w-~9GcCsJ20C2zEYzluPExOP9W-q9w2QQ9X8GGuXxcrgaY568UXeteS9XSYQGnHe1I7LdLwdTqFlN59BBQrlXqTU~glSXVFBiJgcUHg3B61xF3k-aOw9M-Dt5edaqmjTlRkFSiAkknFLmEvUjreiupxnWaMFx6pmm~sham2D0PcA__"}
                title={lot.title}
                price={
                  Array.isArray(lot.bids) && lot.bids.length > 0
                    ? Math.max(...lot.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0))
                    : 0
                }
                bids={lot._count?.bids || 0}
                closingDate={lot.endsAt}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLots;
