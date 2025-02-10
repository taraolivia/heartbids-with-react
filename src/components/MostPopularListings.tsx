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

  useEffect(() => {
    const fetchListings = async (): Promise<void> => {
      const allListings: Listing[] = [];
      let page = 1;
      let hasMore = true;

      try {
        while (hasMore) {
          const response = await fetch(`${API_LISTINGS}?_bids=true&_seller=true&page=${page}`, {
            method: "GET",
            headers: getHeaders(),
          });

          if (!response.ok) {
            console.error(`Error fetching page ${page}`);
            throw new Error("Failed to fetch listings");
          }

          const result: { data: Listing[]; meta: { isLastPage: boolean } } = await response.json();
          console.log(`Page ${page} Response:`, result);

          allListings.push(...result.data);
          hasMore = !result.meta.isLastPage;
          page++;
        }

        console.log(`Total Listings Fetched: ${allListings.length}`);

        // ✅ Filter only active listings
        const activeListings = allListings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now());

        // ✅ Correct Sorting by Number of Bids
        const sortedListings = activeListings
          .sort((a, b) => {
            const aBidCount = a._count?.bids || 0; // ✅ Use correct count
            const bBidCount = b._count?.bids || 0;
            return bBidCount - aBidCount; // ✅ Higher bid count first
          })
          .slice(0, 10); // ✅ Keep only the top 10 most popular listings

        console.log("Sorted Top 10 Listings:", sortedListings);

        setListings(sortedListings);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load popular listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

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
          {!loading && !error && listings.length === 0 && (
            <div className="text-center text-gray-600 mt-8">No popular listings available.</div>
          )}

          {!loading &&
            !error &&
            listings.map((item) => (
              <div key={item.id} className="min-w-[300px]">
                <LotCard
                  key={item.id}
                  id={item.id}
                  image={item.media?.[0]?.url || "https://placehold.co/300"}
                  title={item.title}
                  price={
                    Array.isArray(item.bids) && item.bids.length > 0
                      ? Math.max(...item.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0))
                      : 0
                  }
                  bids={item._count?.bids || 0}
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
