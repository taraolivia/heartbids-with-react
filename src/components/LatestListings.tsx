import { useRef, useState, useEffect } from "react";
import LotCard from "./LotCard";

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
};

type LatestListingsProps = {
  listings: AuctionListing[];
  loading: boolean;
  error: string | null;
};

const LatestListings = ({ listings, loading, error }: LatestListingsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ✅ Check scroll position
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth
      );
    }
  };

  useEffect(() => {
    updateScrollButtons(); // Run on mount
    window.addEventListener("resize", updateScrollButtons); // Update on resize
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500); // Update button visibility after scroll
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500); // Update button visibility after scroll
    }
  };

  // ✅ Show only active auctions
  const filteredListings = listings
    .filter((item) => new Date(item.endsAt).getTime() > new Date().getTime())
    .slice(0, 20);

  return (
    <section className="py-16 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Listings</h2>

        {/* ✅ Left Arrow Button (only visible when scrolling is possible) */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-5 rounded-full shadow-md hover:bg-gray-700"
          >
            ❮
          </button>
        )}

        {/* ✅ Scrollable Listings */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth"
          onScroll={updateScrollButtons}
        >
          {loading && <div className="text-center text-gray-600 mt-8">Loading listings...</div>}
          {error && <div className="text-center bg-red-100 text-red-600 rounded-md p-4 mt-8">{error}</div>}
          {!loading && !error && filteredListings.length === 0 && (
            <div className="text-center text-gray-600 mt-8">No listings available at the moment.</div>
          )}

          {!loading &&
            !error &&
            filteredListings.length > 0 &&
            filteredListings.map((item) => (
              <div key={item.id} className="min-w-[300px]">
                <LotCard
                  image={item.media.length > 0 ? item.media[0] : "https://placehold.co/300x200"}
                  title={item.title}
                  price={item._count?.bids || 0}
                  bids={item._count?.bids || 0}
                  closingDate={item.endsAt}
                />
              </div>
            ))}
        </div>

        {/* ✅ Right Arrow Button (only visible when scrolling is possible) */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-5 rounded-full shadow-md hover:bg-gray-700"
          >
            ❯
          </button>
        )}
      </div>
    </section>
  );
};

export default LatestListings;
