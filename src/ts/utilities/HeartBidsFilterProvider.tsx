import React, { useState, useEffect } from "react";
import { HeartBidsFilterContext } from "./HeartBidsFilterContext";

export const HeartBidsFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showOnlyHeartBids, setShowOnlyHeartBids] = useState<boolean>(() => {
    // ✅ Load the saved filter state from localStorage
    const storedValue = localStorage.getItem("showOnlyHeartBids");
    return storedValue !== null ? JSON.parse(storedValue) : true; // Default to true
  });

  useEffect(() => {
    // ✅ Save the filter choice to localStorage whenever it changes
    localStorage.setItem("showOnlyHeartBids", JSON.stringify(showOnlyHeartBids));
  }, [showOnlyHeartBids]);

  const toggleFilter = () => setShowOnlyHeartBids((prev) => !prev);

  return (
    <HeartBidsFilterContext.Provider value={{ showOnlyHeartBids, toggleFilter }}>
      {children}
    </HeartBidsFilterContext.Provider>
  );
};
