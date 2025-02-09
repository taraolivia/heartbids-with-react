import { useState, useEffect } from "react";
import { API_PROFILE, API_KEY } from "../../js/api/constants";
import { UserContext } from "./UserContext";


interface User {
  name: string;
  avatar?: { url: string };
  credits: number;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
  
    if (!token || !storedUser) return;
  
    const { name } = JSON.parse(storedUser);
  
    try {
      const response = await fetch(`${API_PROFILE}/${name}`, {
        headers: {
          "X-Noroff-API-Key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
      console.log("Full API Response:", result); // ✅ Log the full response
  
      if (response.ok && result.data) {
        setUser(result.data);
        localStorage.setItem("user", JSON.stringify(result.data));
      } else if (result.statusCode === 404) {
        console.warn(`User '${name}' not found.`);
        setUser(null);
        localStorage.removeItem("user"); // ✅ Remove invalid user data from localStorage
      } else {
        console.error("Profile fetch error:", result.errors?.[0]?.message || "Unknown error");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    }
  };
  
  

  useEffect(() => {
    fetchUser();

    const handleStorageChange = () => {
      fetchUser().catch(console.error);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
