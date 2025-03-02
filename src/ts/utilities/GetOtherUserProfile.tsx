import { API_BASE } from "../config/constants";
import { getHeaders } from "../config/headers";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const getOtherUserProfile = async (username: string) => {
  if (!username) {
    console.warn("Username is required to fetch a profile.");
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE}/auction/profiles/${username}?_listings=true&_wins=true`,
      {
        headers: getHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return null;
    }

    const profile = await response.json();
    const userProfile = profile.data;

    let selectedCharity = null;
    try {
      const userRef = doc(db, "users", userProfile.email);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        selectedCharity = docSnap.data().selectedCharity || null;
      }
    } catch (error) {
      console.error(
        "Error fetching user's selected charity from Firebase:",
        error,
      );
    }

    return { ...userProfile, selectedCharity };
  } catch (error) {
    console.error("Error fetching other user profile:", error);
    return null;
  }
};

export default getOtherUserProfile;
