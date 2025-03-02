import { useState, useEffect } from "react";
import { HeartBidsFilterContext } from "./HeartBidsFilterContext";

export const HeartBidsFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showOnlyHeartBids, setShowOnlyHeartBids] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("showOnlyHeartBids");
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem(
      "showOnlyHeartBids",
      JSON.stringify(showOnlyHeartBids),
    );
  }, [showOnlyHeartBids]);

  const toggleFilter = () => setShowOnlyHeartBids((prev) => !prev);

  return (
    <HeartBidsFilterContext.Provider
      value={{ showOnlyHeartBids, toggleFilter }}
    >
      {children}
    </HeartBidsFilterContext.Provider>
  );
};
