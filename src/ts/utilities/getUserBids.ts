import { API_BASE } from "../config/constants";
import { getHeaders } from "../config/headers";

const getUserBids = async (username: string) => {
  try {
    const apiUrl = `${API_BASE}/auction/profiles/${username}/bids?_listings=true`;

    const response = await fetch(apiUrl, {
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data?.data ?? null; 
  } catch (error) {
    console.error("Fetch error:", error); // Optional: Log network errors
    return null;
  }
};

export default getUserBids;
