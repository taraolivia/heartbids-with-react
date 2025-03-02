import { createContext } from "react";
import { Listing } from "../types/listingTypes";

interface ListingsContextType {
  listings: Listing[];
  loading: boolean;
  error: string | null;
}

export const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined,
);
