import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_LISTINGS } from "../../js/api/constants";
import { Listing } from "../../ts/types/listingTypes";
import { useBidding } from "../../ts/hooks/useBidding";

const SingleListing = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const { placeBid, bidMessage, bidLoading } = useBidding(id!);

  useEffect(() => {
    if (id) {
      console.log("Fetching listing for ID:", id); // ✅ Log the ID being used in API call
  
      const fetchListing = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_LISTINGS}/${id}?_bids=true`);
          const result = await response.json();
          
          console.log("API Response:", result); // ✅ Debugging log
  
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
        setListing((prev) =>
          prev
            ? {
                ...prev,
                _count: { bids: prev._count.bids + 1 },
                bids: [
                  ...(prev.bids || []),
                  { amount: bidAmount, bidder: { name: "You", email: "" }, created: new Date().toISOString() },
                ],
              }
            : prev
        );
        setBidAmount(0);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>No listing found</div>;

  const highestBid =
    listing.bids && listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8 space-y-4">
      <h1 className="text-3xl font-semibold text-gray-800">{listing.title}</h1>
      <p className="text-gray-600 text-lg">{listing.description}</p>

      {listing.media.length > 0 && (
        <img src={listing.media[0].url} alt={listing.media[0].alt} className="w-80 h-auto object-center rounded-md" />
      )}

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

      <p className="text-xl font-bold text-gray-900">
        Current Highest Bid: {highestBid !== null ? `€${highestBid}` : "No bids yet"}
      </p>
      <p className="text-sm text-gray-500">Created: {new Date(listing.created).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Ends at: {new Date(listing.endsAt).toLocaleString()}</p>
      <p className="text-md text-gray-600 mt-4">Total Bids: {listing._count.bids}</p>

      <form onSubmit={handlePlaceBid} className="p-4 border rounded shadow mt-6">
        <label htmlFor="bidAmount" className="block text-lg font-medium">
          Enter your bid:
        </label>
        <input
          id="bidAmount"
          type="number"
          min="1"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          className="w-full p-2 mt-2 border rounded"
        />
        <button type="submit" className="w-full p-2 mt-3 bg-blue-500 text-white rounded disabled:opacity-50" disabled={bidLoading}>
          {bidLoading ? "Placing Bid..." : "Place Bid"}
        </button>
        {bidMessage && <p className="mt-2 text-red-500">{bidMessage}</p>}
      </form>

      {/* ✅ Display Bidding History (sorted newest to oldest) */}
{listing.bids && listing.bids.length > 0 ? (
  <div className="mt-4">
    <h4 className="text-lg font-semibold text-gray-800">Bidding History:</h4>
    <ul className="mt-2 space-y-2">
      {listing.bids
        .slice()
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()) // ✅ Newest first
        .map((bid, index) => (
          <li key={index} className="text-gray-600 text-sm">
            <span className="font-bold">€{bid.amount}</span> - 
            <span className="text-gray-500"> Bid placed on {new Date(bid.created).toLocaleString()}</span>
          </li>
        ))}
    </ul>
  </div>
) : (
  <p className="text-gray-500 mt-2">No bids placed yet.</p> // ✅ Show message if no bids exist
)}

    </div>
  );
};

export default SingleListing;
