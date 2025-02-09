import { API_BASE } from "../../js/api/constants";
import { getHeaders } from "../../js/api/headers";

const getUserProfile = async () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    console.warn("No user found in localStorage.");
    return null;
  }

  const { name } = JSON.parse(storedUser);

  try {
    console.log(`Fetching profile for: ${name}`);
    
    const response = await fetch(`${API_BASE}/auction/profiles/${name}?_listings=true&_wins=true`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.errors?.[0]?.message || "Failed to fetch profile");
    }

    const profile = await response.json();
    console.log("Full Profile Data:", profile);

    return profile.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export default getUserProfile;
