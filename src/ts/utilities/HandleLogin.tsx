import { API_BASE } from "../config/constants";
import { getHeaders } from "../config/headers";

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


    if (!response.ok) {
      throw new Error(
        loginResult.errors?.[0]?.message ||
          "Login failed. Please check your credentials.",
      );
    }

    const username = loginResult.data?.name;
    const accessToken = loginResult.data?.accessToken;

    if (!username || !accessToken) {
      throw new Error(
        "Login response is missing required data (username or token).",
      );
    }

    localStorage.setItem("user", JSON.stringify(loginResult.data));
    localStorage.setItem("accessToken", accessToken);

    const profileResponse = await fetch(
      `${API_BASE}/auction/profiles/${username}`,
      {
        headers: getHeaders(),
      },
    );

    const profileResult = await profileResponse.json();


    if (!profileResponse.ok) {
      throw new Error(
        profileResult.errors?.[0]?.message ||
          "Failed to fetch full profile data.",
      );
    }

    localStorage.setItem("user", JSON.stringify(profileResult.data));

    return profileResult.data;
  } catch (error) {

    throw error;
  }
};

export default HandleLogin;
