import { API_BASE } from "../config/constants";
import { getHeaders } from "../config/headers";

const getUserProfile = async () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {

    return null;
  }

  const { name } = JSON.parse(storedUser);

  try {
    const apiUrl = `${API_BASE}/auction/profiles/${name}?_listings=true&_wins=true&_bids=true`;

    const response = await fetch(apiUrl, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.errors?.[0]?.message || "Failed to fetch profile",
      );
    }

    const profile = await response.json();

    return profile.data;
  } catch (error) {

    return null;
  }
};

export default getUserProfile;
