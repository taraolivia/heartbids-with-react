import { API_BASE } from "../config/constants";
import { getHeaders } from "../config/headers";

const getUserBids = async (username: string) => {
  try {
    const apiUrl = `${API_BASE}/auction/profiles/${username}/bids?_listings=true`;

    const response = await fetch(apiUrl, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error (bids):", errorData);
      return null;
    }

    const bids = await response.json();

    return bids.data;
  } catch (error) {
    console.error("Error fetching user bids:", error);
    return null;
  }
};

export default getUserBids;
