import { useRef, useState, useEffect } from "react";
import LotCard from "./LotCard";
import { Listing } from "../ts/types/listingTypes";
import { API_LISTINGS } from "../js/api/constants";
import { getHeaders } from "../js/api/headers";

const MostPopularListings = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch listings from API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${API_LISTINGS}?limit=100&_bids=true&_seller=true`, {
          method: "GET",
          headers: getHeaders(),
        });

        if (!response.ok) throw new Error("Failed to fetch popular listings");

        const result = await response.json();
        console.log("API Response:", result);

        if (!result?.data || !Array.isArray(result.data)) {
          throw new Error("Unexpected API response format");
        }

        setListings(result.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load popular listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // ✅ Update scroll buttons
  useEffect(() => {
    if (scrollRef.current) {
      updateScrollButtons();
      scrollRef.current.addEventListener("scroll", updateScrollButtons);
    }
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", updateScrollButtons);
      }
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [listings]);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth
      );
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500);
    }
  };

  // ✅ Sort by most bids and filter out ended auctions
  const popularListings = listings
    .filter((item) => new Date(item.endsAt).getTime() > new Date().getTime()) // Only active auctions
    .sort((a, b) => b._count.bids - a._count.bids) // Most bids first
    .slice(0, 10); // Top 10 most popular

  return (
    <section className="py-16 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Most Popular Listings</h2>

        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700"
          >
            ❮
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth"
          onScroll={updateScrollButtons}
        >
          {loading && <div className="text-center text-gray-600 mt-8">Loading listings...</div>}
          {error && <div className="text-center bg-red-100 text-red-600 rounded-md p-4 mt-8">{error}</div>}
          {!loading && !error && popularListings.length === 0 && (
            <div className="text-center text-gray-600 mt-8">No popular listings available.</div>
          )}

          {!loading &&
            !error &&
            popularListings.map((item) => (
              <div key={item.id} className="min-w-[300px]">
                <LotCard
                  key={item.id}
                  id={item.id} // ✅ Correctly passing the 'id' of the listing
                  image={item.media.length > 0 ? item.media[0].url : "https://placehold.co/300"}
                  title={item.title}
                  price={Array.isArray(item.bids) && item.bids.length > 0 
                    ? Math.max(...item.bids.map((bid) => bid.amount).filter(amount => !isNaN(amount) && amount > 0)) 
                    : 0}
                  bids={item._count?.bids || 0} // ✅ Number of bids
                  closingDate={item.endsAt}
                />
              </div>
            ))}
        </div>

        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700"
          >
            ❯
          </button>
        )}
      </div>
    </section>
  );
};

export default MostPopularListings;
