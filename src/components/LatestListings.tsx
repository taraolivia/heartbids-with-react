import { useRef, useState, useEffect } from "react";
import LotCard from "./LotCard";
import { API_LISTINGS } from "../js/api/constants";
import { getHeaders } from "../js/api/headers";
import { Listing, LatestListingsProps } from "../ts/types/listingTypes";
import { useHeartBidsFilter } from "./useHeartBidsFilter";


const LatestListings = ({ loading, error }: LatestListingsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [listings, setListings] = useState<Listing[]>([]); 

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch(`${API_LISTINGS}?_bids=true&_seller=true&_active=true&sort=created&order=desc`, {
          method: "GET",
          headers: getHeaders(),
        });

        if (!response.ok) throw new Error("Failed to fetch listings");

        const result = await response.json();


        setListings(result.data); 
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    }

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

  const filteredListings = (listings || [])
    .filter((item) => {
      if (!item.endsAt) return false;
      const endTime = new Date(item.endsAt).getTime();
      return !isNaN(endTime) && endTime > Date.now();
    })
    .filter((item) => {
      return showOnlyHeartBids ? item.tags?.includes("HeartBids") : true; // ✅ Apply filter condition
    })
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    .slice(0, 20);
  

  return (
    <section className="py-16 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Listings</h2>

        {canScrollLeft && (
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-5 rounded-full shadow-md hover:bg-gray-700">
            ❮
          </button>
        )}

        <div ref={scrollRef} className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth" onScroll={updateScrollButtons}>
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
                  id={item.id} // Correctly passing the 'id' of the listing
                  image={item.media.length > 0 ? item.media[0].url : "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png?Expires=1833634300&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXzKjKB9EBskp3Bvq-3FtMxhTtUHE2KAukzJMqO5LbXgl8FP60SfJ~0O6McJzoOI4pemUMFl24KopwqxhMfW43C9ZLP18whF774erFlx-k3YgWa5rfL3S-vPps0KlrpfcqiZS3KBesfBFlENrQscU03jUHEEH4m8BE5BpOm8P6w-~9GcCsJ20C2zEYzluPExOP9W-q9w2QQ9X8GGuXxcrgaY568UXeteS9XSYQGnHe1I7LdLwdTqFlN59BBQrlXqTU~glSXVFBiJgcUHg3B61xF3k-aOw9M-Dt5edaqmjTlRkFSiAkknFLmEvUjreiupxnWaMFx6pmm~sham2D0PcA__"}
                  title={item.title}
                  price={Array.isArray(item.bids) && item.bids.length > 0 ? Math.max(...item.bids.map((bid) => bid.amount).filter((amount) => !isNaN(amount) && amount > 0)) : 0}
                  bids={item._count?.bids || 0}
                  closingDate={item.endsAt}
                />
              </div>
            ))}
        </div>

        {canScrollRight && (
          <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-5 rounded-full shadow-md hover:bg-gray-700">
            ❯
          </button>
        )}
      </div>
    </section>
  );
};

export default LatestListings;
