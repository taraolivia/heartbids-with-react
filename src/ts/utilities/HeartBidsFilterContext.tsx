import { createContext } from "react";

interface HeartBidsFilterContextType {
  showOnlyHeartBids: boolean;
  toggleFilter: () => void;
}

export const HeartBidsFilterContext = createContext<
  HeartBidsFilterContextType | undefined
>(undefined);
