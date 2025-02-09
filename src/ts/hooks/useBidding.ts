import { useState } from "react";
import { API_LISTINGS, API_PROFILE, API_KEY  } from "../../js/api/constants";
import { useUser } from "../../pages/profile/useUser";

export const useBidding = (listingId: string) => {
    const { user, setUser } = useUser();
    const [bidMessage, setBidMessage] = useState<string | null>(null);
    const [bidLoading, setBidLoading] = useState<boolean>(false);
  
    const updateUserCredits = async () => {
      if (!user) return; // ✅ Prevents errors if user is null
  
      const token = localStorage.getItem("accessToken");
      if (!token) return;
  
      try {
        const response = await fetch(`${API_PROFILE}/${user.name}`, {
          headers: {
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        console.log("Updated User Data:", data); // ✅ Debugging log
  
        if (response.ok && data.data) {
          setUser(data.data);
          localStorage.setItem("user", JSON.stringify(data.data)); // ✅ Sync with localStorage
          window.dispatchEvent(new Event("storage")); // ✅ Force navbar update
        }
      } catch (error) {
        console.error("Error updating user credits:", error);
      }
    };
  
    const placeBid = async (amount: number) => {
      if (!amount || amount <= 0) {
        setBidMessage("Please enter a valid bid amount.");
        return;
      }
  
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setBidMessage("You must be logged in to place a bid.");
        return;
      }
  
      setBidLoading(true);
      setBidMessage(null);
  
      try {
        const response = await fetch(`${API_LISTINGS}/${listingId}/bids`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setBidMessage(`Bid placed successfully! Your bid: €${amount}`);
          await updateUserCredits(); // ✅ Ensures credits update after bidding
          return data;
        } else {
          setBidMessage(data.message || "Failed to place bid.");
        }
      } catch (error) {
        console.error("Bidding error:", error);
        setBidMessage("An error occurred. Please try again.");
      } finally {
        setBidLoading(false);
      }
    };
  
    return { placeBid, bidMessage, bidLoading };
  };
  