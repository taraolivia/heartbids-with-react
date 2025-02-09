import { useRef, useState, useEffect } from "react";
import LotCard from "./LotCard";

type AuctionListing = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  media: { url: string; alt: string }[];
  created: string;
  updated: string;
  endsAt: string;
  _count: {
    bids: number;
  };
};

type MostPopularListingsProps = {
  listings: AuctionListing[];
};

const MostPopularListings = ({ listings }: MostPopularListingsProps) => {
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
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

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
          {popularListings.length === 0 && (
            <div className="text-center text-gray-600 mt-8">No popular listings available.</div>
          )}

          {popularListings.map((item) => (
            <div key={item.id} className="min-w-[300px]">
              <LotCard
                  image={item.media.length > 0 ? item.media[0].url : "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png?Expires=1833634300&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXzKjKB9EBskp3Bvq-3FtMxhTtUHE2KAukzJMqO5LbXgl8FP60SfJ~0O6McJzoOI4pemUMFl24KopwqxhMfW43C9ZLP18whF774erFlx-k3YgWa5rfL3S-vPps0KlrpfcqiZS3KBesfBFlENrQscU03jUHEEH4m8BE5BpOm8P6w-~9GcCsJ20C2zEYzluPExOP9W-q9w2QQ9X8GGuXxcrgaY568UXeteS9XSYQGnHe1I7LdLwdTqFlN59BBQrlXqTU~glSXVFBiJgcUHg3B61xF3k-aOw9M-Dt5edaqmjTlRkFSiAkknFLmEvUjreiupxnWaMFx6pmm~sham2D0PcA__"}
                  title={item.title}
                price={item._count?.bids || 0}
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
