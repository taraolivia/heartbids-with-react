import { API_BASE } from "../../config/constants";
import { getHeaders } from "../../config/headers";


const getOtherUserProfile = async (username: string) => {
  if (!username) {
    console.warn("Username is required to fetch a profile.");
    return null;
  }

  try {


    const response = await fetch(`${API_BASE}/auction/profiles/${username}?_listings=true&_wins=true`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return null;
    }

    const profile = await response.json();


    return profile.data; // ✅ Make sure this returns the correct profile data
  } catch (error) {
    console.error("Error fetching other user profile:", error);
    return null;
  }
};

export default getOtherUserProfile;
