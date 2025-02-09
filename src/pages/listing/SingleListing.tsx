import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_LISTINGS } from '../../js/api/constants';

// Define types
type Bid = {
  amount: number;
  bidder: { name: string; email: string }; // Adjust based on API response
  created: string;
};

type Listing = {
  id: string;
  title: string;
  description: string | null;
  created: string;
  updated: string;
  endsAt: string;
  media: Array<{ url: string; alt: string }>;
  tags: string[];
  _count: {
    bids: number;
  };
  bids?: Bid[];
};

const SingleListing = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        setLoading(true);
        try {
          // ✅ Fetch listing with bid history
          const response = await fetch(`${API_LISTINGS}/${id}?_bids=true`);
          const result = await response.json();

          if (!result || !result.data) {
            throw new Error("Unexpected API response format");
          }

          setListing(result.data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError("Error fetching listing: " + err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchListing();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!listing) {
    return <div>No listing found</div>;
  }

  // ✅ Determine the highest bid as the "current price"
  const highestBid = listing.bids && listing.bids.length > 0 ? Math.max(...listing.bids.map(bid => bid.amount)) : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8 space-y-4">
      <h1 className="text-3xl font-semibold text-gray-800 mt-30">{listing.title}</h1>
      <p className="text-gray-600 text-lg">{listing.description}</p>

      {/* Display Media (Image) */}
      {listing.media.length > 0 && (
        <img
          src={listing.media[0].url}
          alt={listing.media[0].alt}
          className="w-80 h-auto object-center rounded-md"
        />
      )}

            {/* Render Tags */}
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

      {/* ✅ Display Highest Bid as Price */}
      <p className="text-xl font-bold text-gray-900">
        Current Highest Bid: {highestBid !== null ? `€${highestBid}` : "No bids yet"}
      </p>
            {/* Render other details */}
            <p className="text-sm text-gray-500">Created: {new Date(listing.created).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Ends at: {new Date(listing.endsAt).toLocaleString()}</p>

      {/* ✅ Move Total Bids to the Bottom */}
      <p className="text-md text-gray-600 mt-4">Total Bids: {listing._count.bids}</p>

{/* ✅ Display Bidding History (sorted newest to oldest) */}
{listing.bids && listing.bids.length > 0 && (
  <div className="mt-4">
    <h4 className="text-lg font-semibold text-gray-800">Bidding History:</h4>
    <ul className="mt-2 space-y-2">
      {listing.bids
        .slice() // ✅ Copy the array to avoid mutating state directly
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()) // ✅ Newest first
        .map((bid, index) => (
          <li key={index} className="text-gray-600 text-sm">
            €{bid.amount} - <span className="text-gray-500">Bid placed on {new Date(bid.created).toLocaleString()}</span>
          </li>
        ))}
    </ul>
  </div>
)}





    </div>
  );
};

export default SingleListing;
