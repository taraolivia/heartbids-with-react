import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import GeneralInfo from "../components/GeneralInfo";
import Footer from "../components/Footer";
import LatestListings from "../components/LatestListings";
import MostPopularListings from "../components/MostPopularListings";
import AllLots from "../components/AllLots";

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

const Listings = () => {
  const [listings, setListings] = useState<AuctionListing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch("https://api.noroff.dev/api/v1/auction/listings?limit=50"); 
        if (!response.ok) throw new Error("Failed to fetch listings");

        const result = await response.json();
        console.log("API Response:", result);

        if (!result || !Array.isArray(result)) {
          throw new Error("Unexpected API response format");
        }

        // Sort by newest first
        const sortedListings = result.sort(
          (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
        );

        setListings(sortedListings);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, []);

  return (
    <div>
      <Hero />

      {/* ✅ Pass listings, loading, and error to the new LatestListings component */}
      <LatestListings listings={listings} loading={loading} error={error} />

      {/* ✅ Most Popular Listings */}
      <MostPopularListings listings={listings} />

      {/* ✅ All Lots (Grid View) */}
      <AllLots listings={listings} />

      <GeneralInfo />

      <Footer />
    </div>
  );
};

export default Listings;
