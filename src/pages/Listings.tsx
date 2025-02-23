import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import GeneralInfo from "../components/GeneralInfo";
import Footer from "../components/Footer";
import LatestListings from "../components/LatestListings";
import MostPopularListings from "../components/MostPopularListings";
import AllLots from "../components/AllLots";
import { API_LISTINGS } from "../ts/constants";
import { getHeaders } from "../ts/headers";
import { Listing } from "../ts/types/listingTypes"; // ✅ Import Listing type

const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]); // ✅ Use Listing type
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAllListings() {
      let allListings: Listing[] = [];
      let page = 1;
      let hasMore = true;
  
      try {
        while (hasMore) {
          console.log(`Fetching page ${page}...`);
          const response = await fetch(`${API_LISTINGS}?page=${page}&_bids=true&_seller=true`, {
            method: "GET",
            headers: getHeaders(),
          });
  
          if (!response.ok) throw new Error("Failed to fetch listings");
  
          const result = await response.json();
          console.log(`Page ${page} results:`, result.data.length);
  
          allListings = [...allListings, ...result.data];
  
          hasMore = !result.meta.isLastPage;
          page++;
        }
  
        console.log("🚀 Total listings fetched:", allListings.length);
        setListings(allListings);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
  
    fetchAllListings();
  }, []);
  
  

  return (
    <div>
      <Hero />

      {/* ✅ Pass listings, loading, and error to LatestListings */}
      <LatestListings listings={listings} loading={loading} error={error} />

      {/* ✅ Pass listings to MostPopularListings */}
      <MostPopularListings listings={listings} />

      {/* ✅ Pass listings to AllLots */}
      <AllLots listings={listings} />

      <GeneralInfo />
      <Footer />
    </div>
  );
};

export default Listings;
