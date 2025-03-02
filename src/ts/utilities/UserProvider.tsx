import { useState, useEffect } from "react";
import { API_PROFILE, API_KEY } from "../config/constants";
import { UserContext, User } from "./UserContext";
import { Charity } from "../utilities/AllCharities";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) return;

    const localUser: User | null = JSON.parse(storedUser);
    if (!localUser) {
      console.warn("No stored user found, skipping fetch.");
      return;
    }

    try {
      const response = await fetch(`${API_PROFILE}/${localUser.name}`, {
        headers: {
          "X-Noroff-API-Key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.data) {
        const userRef = doc(db, "users", localUser.email);
        const docSnap = await getDoc(userRef);
        const selectedCharity = docSnap.exists()
          ? docSnap.data().selectedCharity
          : null;

        const mergedUser: User = {
          ...result.data,
          selectedCharity,
        };

        setUser(mergedUser);
        localStorage.setItem("user", JSON.stringify(result.data));
      } else {
        console.error(
          "Profile fetch error:",
          result.errors?.[0]?.message || "Unknown error",
        );
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    }
  };

  const updateCharity = async (charity: Charity) => {
    if (!user) return;

    setUser({ ...user, selectedCharity: charity });

    try {
      const userRef = doc(db, "users", user.email);
      await setDoc(userRef, { selectedCharity: charity }, { merge: true });
    } catch (error) {
      console.error("Error saving selected charity to Firestore:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateCharity }}>
      {children}
    </UserContext.Provider>
  );
};
