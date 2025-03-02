import { useRef, useState, useEffect } from "react";
import LotCard from "./LotCard";
import { useListings } from "../../utilities/UseListings";
import { useHeartBidsFilter } from "../../utilities/useHeartBidsFilter";

const MostPopularListings: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { listings, loading, error } = useListings(); // ✅ Get listings from context
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { showOnlyHeartBids } = useHeartBidsFilter();

  // ✅ Move useEffect to the top (before any return)
  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollRef.current) {
        setCanScrollLeft(scrollRef.current.scrollLeft > 0);
        setCanScrollRight(scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth);
      }
    };

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
  }, [listings]); // ✅ Depend on listings so effect re-runs when data changes

  if (loading) return <p className="text-center text-gray-600">Loading listings...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // ✅ Filter out expired listings
  let filteredListings = listings.filter((lot) => new Date(lot.endsAt).getTime() > Date.now());

  // ✅ Apply HeartBids filter if enabled
  if (showOnlyHeartBids) {
    filteredListings = filteredListings.filter((lot) => lot.tags?.includes("HeartBids"));
  }

  // ✅ Sort by number of bids (most bids first)
  const sortedListings = filteredListings.sort((a, b) => (b._count?.bids || 0) - (a._count?.bids || 0)).slice(0, 10);

  return (
    <section className="py-5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800">Most Popular Listings</h2>

        {canScrollLeft && (
          <button onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })} className="text-2xl z-50 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-7 py-4 cursor-pointer rounded-full shadow-md hover:bg-gray-700">
            ❮
          </button>
        )}

        <div ref={scrollRef} className="flex overflow-x-auto gap-10 py-10 no-scrollbar scroll-smooth">
          {sortedListings.length === 0 && <div className="text-center text-gray-600 mt-8">No popular listings available.</div>}

          {sortedListings.map((item) => (
            <div key={item.id}>
              <LotCard
                id={item.id}
                image={item.media?.[0]?.url || "/images/HeartBids.png"}
                title={item.title}
                price={item.bids?.length ? Math.max(...item.bids.map((bid) => bid.amount)) : 0}
                bids={item._count?.bids || 0}
                closingDate={item.endsAt}
                tags={item.tags ?? []}
                showTags={true}
                showSeller={true}
                seller={{
                  ...item.seller,
                  selectedCharity: item.seller?.selectedCharity ?? undefined,
                }}
              />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })} className="text-2xl z-50 absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-7 py-4 cursor-pointer rounded-full shadow-md hover:bg-gray-700">
            ❯
          </button>
        )}
      </div>
    </section>
  );
};

export default MostPopularListings;
