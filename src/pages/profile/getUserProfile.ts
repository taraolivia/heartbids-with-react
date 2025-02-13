import { API_BASE } from "../../js/api/constants";
import { getHeaders } from "../../js/api/headers";

const getUserProfile = async () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    console.warn("❌ No user found in localStorage.");
    return null;
  }

  const { name } = JSON.parse(storedUser);

  try {
    const apiUrl = `${API_BASE}/auction/profiles/${name}?_listings=true&_wins=true&_bids=true`;
    console.log("🌐 Fetching user profile from:", apiUrl);

    const response = await fetch(apiUrl, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ API Error:", errorData);
      throw new Error(errorData.errors?.[0]?.message || "Failed to fetch profile");
    }

    const profile = await response.json();

    console.log("✅ User Profile Response:", profile);
    console.log("✅ Extracted Name from Profile:", profile?.data?.name);

    return profile.data; // ✅ Return ONLY `profile.data`
    
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    return null;
  }
};

export default getUserProfile;
