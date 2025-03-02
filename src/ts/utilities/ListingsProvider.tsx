import { useState, useEffect, useCallback } from "react";
import { API_LISTINGS } from "../config/constants";
import { getHeaders } from "../config/headers";
import { ListingsContext } from "./ListingsContext";
import { Listing } from "../types/listingTypes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useLoading } from "./LoadingProvider";

export const ListingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoadingState] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  const startGlobalLoading = useCallback(() => setLoading(true), [setLoading]);
  const stopGlobalLoading = useCallback(() => setLoading(false), [setLoading]);

  useEffect(() => {
    const fetchSellerCharity = async (sellerEmail: string) => {
      try {
        const userRef = doc(db, "users", sellerEmail);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          return docSnap.data().selectedCharity || null;
        }
      } catch (error) {

      }
      return null;
    };

    const fetchAllListings = async () => {
      let allListings: Listing[] = [];
      let page = 1;
      let hasMore = true;

      try {
        startGlobalLoading();
        setLoadingState(true);

        while (hasMore) {
          const response = await fetch(
            `${API_LISTINGS}?page=${page}&_bids=true&_seller=true`,
            {
              method: "GET",
              headers: getHeaders(),
            },
          );

          if (!response.ok) throw new Error("Failed to fetch listings");

          const result = await response.json();
          allListings = [...allListings, ...result.data];

          hasMore = !result.meta.isLastPage;
          page++;
        }

        const listingsWithCharity = await Promise.all(
          allListings.map(async (listing) => {
            if (listing.seller?.email) {
              const sellerCharity = await fetchSellerCharity(
                listing.seller.email,
              );
              return {
                ...listing,
                seller: { ...listing.seller, selectedCharity: sellerCharity },
              };
            }
            return listing;
          }),
        );


        setListings(listingsWithCharity);
      } catch (err) {

        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        stopGlobalLoading();
        setLoadingState(false);
      }
    };

    fetchAllListings();
  }, [startGlobalLoading, stopGlobalLoading]);

  return (
    <ListingsContext.Provider value={{ listings, loading, error }}>
      {children}
    </ListingsContext.Provider>
  );
};
