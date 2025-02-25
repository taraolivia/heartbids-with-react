import { useRef, useState, useEffect } from "react";
import LotCard from "./LotCard";
import { LatestListingsProps } from "../../ts/types/listingTypes";
import { useHeartBidsFilter } from "../utilities/useHeartBidsFilter";

const LatestListings: React.FC<LatestListingsProps> = ({ listings = [], loading, error }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
  }, [listings]); 

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      setTimeout(updateScrollButtons, 500);
    }
  };

  const { showOnlyHeartBids } = useHeartBidsFilter(); // ✅ Get global filter state

  const filteredListings = Array.isArray(listings)
    ? listings
        .filter((item) => {
      if (!item.endsAt) return false;
      const endTime = new Date(item.endsAt).getTime();
      return !isNaN(endTime) && endTime > Date.now();
    })
    .filter((item) => {
      return showOnlyHeartBids ? item.tags?.includes("HeartBids") : true;
    })
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    .slice(0, 20)
    : [];

  return (
    <section className="py-10 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Listings</h2>

        {canScrollLeft && (
          <button onClick={scrollLeft} className="text-2xl z-50 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-7 py-4 cursor-pointer rounded-full shadow-md hover:bg-gray-700">
            ❮
          </button>
        )}

        <div ref={scrollRef} className="flex overflow-x-auto gap-10 py-10 no-scrollbar scroll-smooth" onScroll={updateScrollButtons}>
          {loading && <div className="text-center text-gray-600 mt-8">Loading listings...</div>}
          {error && <div className="text-center bg-red-100 text-red-600 rounded-md p-4 mt-8">{error}</div>}
          {!loading && !error && filteredListings.length === 0 && <div className="text-center text-gray-600 mt-8">No listings available at the moment.</div>}

          {!loading &&
            !error &&
            filteredListings.length > 0 &&
            filteredListings.map((item) => (
              <div key={item.id} className="min-w-[300px]">
                <LotCard
                  key={item.id}
                  id={item.id}
                  image={item.media?.[0]?.url || "fallback-image-url.png"}
                  title={item.title}
                  price={Array.isArray(item.bids) && item.bids.length > 0 ? Math.max(...item.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0)) : 0}
                  bids={item._count?.bids || 0}
                  closingDate={item.endsAt}
                  tags={item.tags ?? []}
                  showTags={true}
                  showSeller={true}
                  seller={item.seller}
                />
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

export default LatestListings;
