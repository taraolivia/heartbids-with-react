import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getSingleListing from "../../utils/getSingleListing";
import placeBid from "../../utils/placeBid";

const SingleListing: React.FC = () => {
  const { id } = useParams(); // Get listing ID from the URL
  const [listing, setListing] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      const data = await getSingleListing(id as string);
      setListing(data);
    };

    fetchListing();
  }, [id]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!bidAmount || bidAmount <= 0) {
      setError("Please enter a valid bid amount.");
      return;
    }

    try {
      await placeBid(id as string, bidAmount);
      setSuccess("Bid placed successfully!");
      setBidAmount(""); // Reset bid input

      // Refresh listing data to update bid history
      const updatedListing = await getSingleListing(id as string);
      setListing(updatedListing);
    } catch (err) {
      setError("Failed to place bid. Try again.");
    }
  };

  if (!listing) {
    return <div className="min-h-screen flex items-center justify-center">Loading listing...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Listing Header */}
        <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
        <p className="text-gray-600 mt-2">{listing.description}</p>

        {/* Listing Image */}
        <div className="mt-4">
          <img
            src={listing.media[0]?.url || "https://placehold.co/600x400"}
            alt={listing.media[0]?.alt || "Auction Image"}
            className="w-full rounded-lg"
          />
        </div>

        {/* Bidding Section */}
        <div className="mt-6 bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900">Current Bids</h2>
          {listing.bids.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {listing.bids.map((bid: any, index: number) => (
                <li key={index} className="p-2 bg-white rounded-md shadow">
                  <strong>{bid.bidder.name}</strong> bid <span className="font-semibold">€{bid.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2">No bids yet. Be the first to bid!</p>
          )}
        </div>

        {/* Place Bid Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900">Place a Bid</h2>
          <form onSubmit={handleBidSubmit} className="mt-4">
            <input
              type="number"
              min="1"
              value={bidAmount}
              onChange={(e) => setBidAmount(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter bid amount"
              required
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Place Bid
            </button>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>

        {/* Seller Info */}
        <div className="mt-6 bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900">Seller Information</h2>
          <div className="flex items-center mt-2">
            <img
              src={listing.seller.avatar?.url || "https://placehold.co/50"}
              alt={listing.seller.avatar?.alt || "Seller Avatar"}
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-2 text-lg">{listing.seller.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
