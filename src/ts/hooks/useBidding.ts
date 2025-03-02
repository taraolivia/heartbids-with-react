import { useState } from "react";
import { API_LISTINGS, API_PROFILE, API_KEY } from "../config/constants";
import { useUser } from "../utilities/useUser";
import { Listing, Bid } from "../types/listingTypes";

export const useBidding = (listingId: string) => {
  const { user, setUser } = useUser();
  const [bidMessage, setBidMessage] = useState<string | null>(null);
  const [bidLoading, setBidLoading] = useState<boolean>(false);

  const updateUserCredits = async () => {
    if (!user?.name) return;

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
      if (response.ok && data.data) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {

    }
  };

  const placeBid = async (amount: number) => {
    if (!amount || amount <= 0) {
      setBidMessage("❌ Please enter a valid bid amount.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setBidMessage("❌ You must be logged in to place a bid.");
      return;
    }

    setBidLoading(true);
    setBidMessage(null);

    try {
      const listingResponse = await fetch(
        `${API_LISTINGS}/${listingId}?_bids=true`,
      );
      const listingData: { data: Listing } = await listingResponse.json();

      if (!listingResponse.ok || !listingData.data) {
        setBidMessage("❌ Error fetching latest bid data.");
        return;
      }

      const highestBid = listingData.data.bids?.length
        ? Math.max(...listingData.data.bids.map((bid: Bid) => bid.amount))
        : 0;

      if (amount <= highestBid) {
        setBidMessage(
          `❌ Your bid must be higher than the current highest bid (€${highestBid}).`,
        );
        return;
      }

      const lastBidder = listingData.data.bids?.length
        ? listingData.data.bids[listingData.data.bids.length - 1].bidder.name
        : null;

      if (lastBidder === user?.name) {
        setBidMessage("❌ You cannot place two bids in a row.");
        return;
      }

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
        setBidMessage(`✅ Bid placed successfully! Your bid: €${amount}`);
        await updateUserCredits();

        return data;
      } else {
        const errorMessage =
          data.errors?.[0]?.message ||
          data.message ||
          "❌ An unknown error occurred.";
        setBidMessage(errorMessage);
      }
    } catch (error) {

      setBidMessage("❌ A network error occurred. Please try again.");
    } finally {
      setBidLoading(false);
    }
  };

  return { placeBid, bidMessage, bidLoading };
};
