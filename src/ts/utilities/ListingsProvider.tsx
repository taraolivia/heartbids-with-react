import { useState, useEffect } from "react";
import { API_LISTINGS } from "../config/constants";
import { getHeaders } from "../config/headers";
import { ListingsContext } from "./ListingsContext"; 
import { Listing } from "../types/listingTypes";

export const ListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllListings() {
      let allListings: Listing[] = [];
      let page = 1;
      let hasMore = true;

      try {
        while (hasMore) {
          const response = await fetch(`${API_LISTINGS}?page=${page}&_bids=true&_seller=true`, {
            method: "GET",
            headers: getHeaders(),
          });

          if (!response.ok) throw new Error("Failed to fetch listings");

          const result = await response.json();
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
    <ListingsContext.Provider value={{ listings, loading, error }}>
      {children}
    </ListingsContext.Provider>
  );
};
