import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_LISTINGS } from "../../js/api/constants";
import { Listing } from "../../ts/types/listingTypes";
import { useBidding } from "../../ts/hooks/useBidding";
import { useUser } from "../profile/useUser";

const SingleListing = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { placeBid, bidMessage, bidLoading } = useBidding(id!);
  const isAuctionEnded = listing?.endsAt ? new Date(listing.endsAt).getTime() < Date.now() : false;
  const { user } = useUser(); 
  const [showBio, setShowBio] = useState<boolean>(false);


  // ✅ Move highestBid ABOVE useState
  const highestBid = listing?.bids && listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : 0;

  // ✅ Initialize bidAmount based on highestBid
  const [bidAmount, setBidAmount] = useState<number>(highestBid + 1);

  // ✅ Get the last bidder's name
  const lastBidder = listing?.bids?.length ? listing.bids[listing.bids.length - 1].bidder.name : null;

  const userCantBidMessage = (() => {
    if (!user) return "❌ You must be logged in to place a bid.";

    if (typeof highestBid !== "number") return "❌ Unable to determine the highest bid.";

    if (user.credits < highestBid + 1) return "❌ You do not have enough credits to place a bid.";

    if (listing?.seller?.name === user.name) return "❌ You cannot bid on your own listing.";

    if (lastBidder === user.name) return "❌ You cannot place two bids in a row.";

    if (isAuctionEnded) return "❌ This auction has ended. Bidding is no longer available.";

    return null; // ✅ No issues, allow bidding
  })();

  console.log("userCantBidMessage:", userCantBidMessage);
  console.log("Debugging userCantBidMessage conditions:");
  console.log("user:", user);
  console.log("user.credits:", user?.credits);
  console.log("highestBid:", highestBid);
  console.log("listing.seller:", listing?.seller?.name);
  console.log("lastBidder:", lastBidder);
  console.log("isAuctionEnded:", isAuctionEnded);

  // ✅ Ensure bidAmount updates when listing updates
  useEffect(() => {
    if (listing) {
      const newHighestBid = listing.bids && listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : 0;
      setBidAmount(newHighestBid + 1);
    }
  }, [listing]); // ✅ Runs only when `listing` updates

  // ✅ Fetch Listing Data
  useEffect(() => {
    if (id) {
      console.log("Fetching listing for ID:", id);

      const fetchListing = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_LISTINGS}/${id}?_bids=true&_seller=true`); // ✅ Ensure seller is included
          const result = await response.json();

          console.log("API Response:", result); // Debugging log

          if (!result || !result.data) {
            throw new Error("Unexpected API response format");
          }

          setListing(result.data);
        } catch (err: unknown) {
          console.error("Error fetching listing:", err);
          setError(err instanceof Error ? "Error fetching listing: " + err.message : "An unknown error occurred");
        } finally {
          setLoading(false);
        }
      };

      fetchListing();
    }
  }, [id]);

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bidAmount > 0) {
      const bidData = await placeBid(bidAmount);
      if (bidData) {
        setBidAmount(0);

        // ✅ Fetch latest bid history after a successful bid
        const response = await fetch(`${API_LISTINGS}/${id}?_bids=true`);
        const result = await response.json();
        if (response.ok && result.data) {
          setListing(result.data);
        }
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>No listing found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8 space-y-4">
      <h1 className="text-3xl font-semibold text-gray-800 mt-30">{listing.title}</h1>
      <div className="flex flex-wrap gap-6 items-start mt-6">
  {/* ✅ Image on the Left */}
  {listing.media.length > 0 && (
    <img
      src={listing.media[0].url}
      alt={listing.media[0].alt}
      className="w-80 h-auto object-cover rounded-md"
    />
  )}

  {/* ✅ Description & Seller on the Right */}
  <div className="flex-1 space-y-4">
    {/* ✅ Description */}
    <p className="text-gray-600 text-lg">{listing.description}</p>

    {/* ✅ Seller Info */}
    {listing.seller && (
      <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
        <div className="flex items-center space-x-4">
          {/* ✅ Seller Avatar */}
          <img
            src={listing.seller.avatar?.url || "https://placehold.co/50"}
            alt={listing.seller.avatar?.alt || "Seller Avatar"}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            {/* ✅ Seller Name */}
            <h3 className="text-lg font-semibold text-gray-800">{listing.seller.name}</h3>

            {/* ✅ Toggle Button for Bio */}
            <button
              onClick={() => setShowBio((prev) => !prev)}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              {showBio ? "Hide Bio" : "View Bio"}
            </button>
          </div>
        </div>

        {/* ✅ Seller Bio (Collapsible) */}
        {showBio && (
          <p className="mt-3 text-gray-600 border-t pt-3">
            {listing.seller.bio || "No bio available."}
          </p>
        )}
      </div>
    )}
  </div>
</div>


      {listing.tags && listing.tags.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mt-2">
            {listing.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xl font-bold text-gray-900">Current Highest Bid: {highestBid !== null ? `€${highestBid}` : "No bids yet"}</p>
      <p className="text-sm text-gray-500">Created: {new Date(listing.created).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Ends at: {new Date(listing.endsAt).toLocaleString()}</p>
      <p className="text-md text-gray-600 mt-4">Total Bids: {listing._count.bids}</p>

      <form onSubmit={handlePlaceBid} className="p-4 border rounded shadow mt-6">
        <label htmlFor="bidAmount" className="block text-lg font-medium">
          Enter your bid:
        </label>

        {/* Bid input field */}
        <input
          id="bidAmount"
          type="number"
          min={highestBid + 1} // Prevent lower bids
          value={bidAmount === 0 ? "" : bidAmount} // Allow clearing input
          onChange={(e) => {
            const value = e.target.value;
            setBidAmount(value === "" ? highestBid + 1 : Number(value)); // Restore default if cleared
          }}
          className={`w-full p-2 mt-2 border rounded appearance-none ${userCantBidMessage ? "bg-gray-200 cursor-not-allowed" : ""}`} // Adjust styling when bids aren't allowed
          disabled={Boolean(userCantBidMessage) || isAuctionEnded} // Disable input
        />

        <button type="submit" className={`w-full p-2 mt-3 rounded ${userCantBidMessage ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`} disabled={!!userCantBidMessage || bidLoading || isAuctionEnded}>
          {userCantBidMessage || (bidLoading ? "Processing your bid..." : "Place Bid")}
        </button>

        {/* Success/Error messages for bid placement */}
        {bidMessage && <p className={`mt-2 ${bidMessage.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>{bidMessage}</p>}
      </form>

      {listing.bids && listing.bids.length > 0 ? (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">Bidding History:</h4>
          <ul className="mt-2 space-y-2">
            {listing.bids
              .slice()
              .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
              .map((bid, index) => (
                <li key={index} className="text-gray-600 text-sm">
                  <span className="font-bold">€{bid.amount}</span> -<span className="text-gray-500"> Bid placed on {new Date(bid.created).toLocaleString()}</span>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No bids placed yet.</p>
      )}
    </div>
  );
};

export default SingleListing;
