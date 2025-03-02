import { useContext } from "react";
import { HeartBidsFilterContext } from "./HeartBidsFilterContext";

export const useHeartBidsFilter = () => {
  const context = useContext(HeartBidsFilterContext);
  if (!context) {
    throw new Error(
      "useHeartBidsFilter must be used within a HeartBidsFilterProvider",
    );
  }
  return context;
};
