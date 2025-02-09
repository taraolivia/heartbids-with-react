import { API_BASE } from "../../../js/api/constants";
import { getHeaders } from "../../../js/api/headers";

const HandleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": "95144b64-e941-4738-b289-cc867b27e27c",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      }),
    });

    const loginResult = await response.json();
    console.log("Login Response:", loginResult); // ✅ Log response for debugging

    if (!response.ok) {
      throw new Error(loginResult.errors?.[0]?.message || "Login failed. Please check your credentials.");
    }

    const username = loginResult.data?.name;
    const accessToken = loginResult.data?.accessToken;

    if (!username || !accessToken) {
      throw new Error("Login response is missing required data (username or token).");
    }

    // ✅ Store user data and accessToken separately in localStorage
    localStorage.setItem("user", JSON.stringify(loginResult.data));
    localStorage.setItem("accessToken", accessToken);

    // ✅ Fetch full profile data
    const profileResponse = await fetch(`${API_BASE}/auction/profiles/${username}`, {
      headers: getHeaders(),
    });

    const profileResult = await profileResponse.json();
    console.log("Full Profile Data:", profileResult); // ✅ Log full user profile

    if (!profileResponse.ok) {
      throw new Error(profileResult.errors?.[0]?.message || "Failed to fetch full profile data.");
    }

    // ✅ Store full profile data in localStorage (overwriting incomplete login data)
    localStorage.setItem("user", JSON.stringify(profileResult.data));

    return profileResult.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default HandleLogin;
