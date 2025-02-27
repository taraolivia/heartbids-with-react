import { useContext } from "react";
import { UserContext } from "./UserContext"; // ✅ Import from new file

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
