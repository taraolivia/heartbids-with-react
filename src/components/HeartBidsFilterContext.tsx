import { createContext } from "react";

// ✅ Define the context type
interface HeartBidsFilterContextType {
  showOnlyHeartBids: boolean;
  toggleFilter: () => void;
}

// ✅ Export the context separately (fixes ESLint issue)
export const HeartBidsFilterContext = createContext<HeartBidsFilterContextType | undefined>(undefined);
