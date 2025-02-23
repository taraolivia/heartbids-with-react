import { useRef, useState, useEffect } from "react";
import LotCard from "./LotCard";
import { Listing } from "../ts/types/listingTypes";
import { useHeartBidsFilter } from "./useHeartBidsFilter";

interface MostPopularListingsProps {
  listings?: Listing[]; // ✅ Make listings optional
}

const MostPopularListings: React.FC<MostPopularListingsProps> = ({ listings = [] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ✅ Get HeartBids filter state
  const { showOnlyHeartBids } = useHeartBidsFilter();

  // ✅ Filter out expired listings
  let filteredListings = Array.isArray(listings) ? listings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now()) : [];

  // ✅ Apply HeartBids filter if enabled
  if (showOnlyHeartBids) {
    filteredListings = filteredListings.filter((lot) => lot.tags?.includes("HeartBids"));
  }

  // ✅ Sort by the number of bids (most bids first)
  const sortedListings = filteredListings.sort((a, b) => (b._count?.bids || 0) - (a._count?.bids || 0)).slice(0, 10);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      updateScrollButtons();
      scrollElement.addEventListener("scroll", updateScrollButtons);
    }

    window.addEventListener("resize", updateScrollButtons);

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", updateScrollButtons);
      }
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [sortedListings]);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth);
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
    <section className="py-5 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800">Most Popular Listings</h2>

        {canScrollLeft && (
          <button onClick={scrollLeft} className="text-2xl z-50 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-7 py-4 cursor-pointer rounded-full shadow-md hover:bg-gray-700">
            ❮
          </button>
        )}

        <div ref={scrollRef} className="flex overflow-x-auto gap-10 py-10 no-scrollbar scroll-smooth" onScroll={updateScrollButtons}>
          {sortedListings.length === 0 && <div className="text-center text-gray-600 mt-8">No popular listings available.</div>}

          {sortedListings.map((item) => (
            <div key={item.id} className="min-w-[300px]">
              <LotCard id={item.id} image={item.media?.[0]?.url || "fallback-image-url.png"} title={item.title} price={item.bids?.length ? Math.max(...item.bids.map((bid) => bid.amount)) : 0} bids={item._count?.bids || 0} closingDate={item.endsAt} tags={item.tags ?? []} showTags={true} showSeller={true} seller={item.seller} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button onClick={scrollRight} className="text-2xl z-50 absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-7 py-4 cursor-pointer rounded-full shadow-md hover:bg-gray-700">
            ❯
          </button>
        )}
      </div>
    </section>
  );
};

export default MostPopularListings;
