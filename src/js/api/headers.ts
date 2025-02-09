import { API_KEY } from "./constants";

export function getHeaders({ apiKey = true, authToken = true, contentType = true } = {}) {
  const headers = new Headers();

  if (apiKey && API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY); // ✅ Use correct header name
  }

  if (authToken) {
    const accessToken = localStorage.getItem("accessToken"); 
    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    } else {
      console.warn("No access token found. User might need to log in.");
    }
  }

  if (contentType) {
    headers.append("Content-Type", "application/json");
  }

  console.log("Headers being sent:", Object.fromEntries(headers.entries())); // ✅ Log headers for debugging

  return headers;
}
