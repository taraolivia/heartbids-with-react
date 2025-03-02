import { useContext, useMemo } from "react";
import { ListingsContext } from "./ListingsContext";

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error("useListings must be used within a ListingsProvider");
  }

  const { listings, loading, error } = context;

  const availableTags = useMemo(() => {
    const tagMap = new Map<string, string>();
    listings.forEach((listing) => {
      listing.tags?.forEach((tag) => {
        const lowerTag = tag.toLowerCase();
        if (!tagMap.has(lowerTag)) {
          tagMap.set(
            lowerTag,
            tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
          );
        }
      });
    });
    return Array.from(tagMap.values()).sort((a, b) => a.localeCompare(b));
  }, [listings]);

  return { listings, loading, error, availableTags };
};
