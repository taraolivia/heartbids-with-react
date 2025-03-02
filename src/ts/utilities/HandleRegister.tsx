import { API_BASE } from "../config/constants";

const HandleRegister = async (formData: {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  venueManager?: boolean;
}) => {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": "95144b64-e941-4738-b289-cc867b27e27c",
      },
      body: JSON.stringify({
        ...formData,
        avatar: formData.avatar?.url
          ? {
              url: formData.avatar.url.trim(),
              alt: formData.avatar.alt.trim() || "User avatar",
            }
          : undefined,
        banner: formData.banner?.url
          ? {
              url: formData.banner.url.trim(),
              alt: formData.banner.alt.trim() || "User banner",
            }
          : undefined,
      }),
    });

    const result = await response.json();
    console.log("Registration Response:", result);

    if (!response.ok) {
      throw new Error(
        result.errors?.[0]?.message ||
          "Registration failed. Please check your details.",
      );
    }

    return result.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export default HandleRegister;
