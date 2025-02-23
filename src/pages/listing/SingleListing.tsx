import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_LISTINGS } from "../../ts/constants";
import { Listing, Bid } from "../../ts/types/listingTypes";
import { useBidding } from "../../ts/hooks/useBidding";
import { useUser } from "../profile/useUser";
import AuctionCountdown from "../../components/AuctionCountdown";

const SingleListing = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { placeBid, bidMessage, bidLoading } = useBidding(id!);
  const { user } = useUser();

  const storedUser = localStorage.getItem("user");
  const isLoggedIn = !!storedUser;

  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const handleUserClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthPrompt(true);
    }
  };

  
  const bidsArray: Bid[] = listing?.bids ? [...listing.bids].sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()) : [];
  const highestBid = bidsArray.length > 0 ? Math.max(...bidsArray.map((bid) => bid.amount)) : 0;
  const lastBidder = bidsArray.length > 0 ? bidsArray[bidsArray.length - 1].bidder.name : null;
  const isAuctionEnded = listing?.endsAt ? new Date(listing.endsAt).getTime() < Date.now() : false;

  
  const [bidAmount, setBidAmount] = useState<number>(highestBid + 1);

  
  const userCantBidMessage = (() => {
    if (isAuctionEnded) return "❌ This auction has ended. Bidding is no longer available.";
    if (listing?.seller?.name === user?.name) return "❌ You cannot bid on your own listing.";
    if (lastBidder === user?.name) return "❌ You cannot place two bids in a row.";
    if (!user) return "❌ You must be logged in to place a bid.";
    if (user.credits < highestBid + 1) return "❌ You do not have enough credits to place a bid on this listing.";
    return null;
  })();

  
  useEffect(() => {
    setBidAmount(highestBid + 1);
  }, [highestBid]);

  
  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_LISTINGS}/${id}?_bids=true&_seller=true`);
        const result = await response.json();
        if (!result?.data) throw new Error("Unexpected API response format");

        setListing(result.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError(err instanceof Error ? "Error fetching listing: " + err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  
  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (bidAmount > highestBid && lastBidder !== user.name) {
      const bidData = await placeBid(bidAmount);
      if (bidData) {
        setBidAmount(highestBid + 2);

        
        setListing((prevListing) => {
          if (!prevListing) return prevListing;

          const updatedBids: Bid[] = [
            ...bidsArray,
            {
              id: bidData.id,
              amount: bidAmount,
              bidder: { name: user.name, email: user.email ?? "" },
              created: new Date().toISOString(),
            },
          ].sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()); 

          return { ...prevListing, bids: updatedBids };
        });

        
        const response = await fetch(`${API_LISTINGS}/${id}?_bids=true&_seller=true`);
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg  space-y-4 pt-40">
      <h1 className="text-3xl font-semibold text-gray-800">{listing.title}</h1>

      <div className="flex flex-wrap gap-6 items-start mt-6">
        {listing.media.length > 0 && <img src={listing.media[0].url} alt={listing.media[0].alt} className="w-80 h-auto object-cover rounded-md" />}

        <div className="flex-1 space-y-4">
          <p className="text-gray-600 text-lg">{listing.description}</p>

          {listing.seller && (
            <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
              <div className="flex items-center space-x-4">
                {/* ✅ Profile link wraps avatar + name */}
                <Link to={`/profile/${listing.seller.name}`} className="flex items-center space-x-3 hover:underline">
                  <img src={listing.seller.avatar?.url || "https://placehold.co/50"} alt={listing.seller.avatar?.alt || `${listing.seller.name}'s avatar`} className="w-12 h-12 rounded-full object-cover" />
                  <h3 className="text-lg font-semibold text-gray-800">{listing.seller.name}</h3>
                </Link>
              </div>
              {/* ✅ Only show bio if it exists */}
              {listing.seller.bio && <p className="mt-3 text-gray-600 border-t pt-3">{listing.seller.bio}</p>}
            </div>
          )}
<p className="text-gray-600 text-lg">
  {new Date(listing.endsAt) < new Date()
    ? "This auction has ended"
    : `This listing ends on: ${new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(listing.endsAt))}`}
</p>
    {/* ✅ Countdown */}
    <AuctionCountdown closingDate={listing.endsAt} />
        </div>
      </div>

      <p className="text-xl font-bold text-gray-900">Current Highest Bid: {highestBid ? `€${highestBid}` : "No bids yet"}</p>

      <form onSubmit={handlePlaceBid} className="p-4 border rounded shadow mt-6">
        <label htmlFor="bidAmount" className="block text-lg font-medium">
          Enter your bid:
        </label>
        <input id="bidAmount" type="number" min={highestBid + 1} value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} className={`w-full p-2 mt-2 border rounded ${userCantBidMessage ? "bg-gray-200 cursor-not-allowed" : ""}`} disabled={!!userCantBidMessage} />
        <button type="submit" className={`w-full p-2 mt-3 rounded ${userCantBidMessage ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`} disabled={!!userCantBidMessage || bidLoading || isAuctionEnded}>
          {userCantBidMessage || (bidLoading ? "Processing your bid..." : "Place Bid")}
        </button>
      </form>

      {bidMessage && <p className={`mt-2 ${bidMessage.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>{bidMessage}</p>}

      {bidsArray.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">Bidding History:</h4>
          <ul className="mt-2 space-y-2 p-1 bg-blue-100">
            {bidsArray
              .slice()
              .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()) 
              .map((bid) => (
                <li key={bid.id} className="flex items-center space-x-2 text-gray-600 text-sm p-2">
                  {/* ✅ Prevent navigation if not logged in */}
                  <Link to={`/profile/${bid.bidder.name}`} className="flex items-center space-x-2 hover:underline" onClick={handleUserClick}>
                    <img src={bid.bidder.avatar?.url || "/default-avatar.png"} alt={bid.bidder.avatar?.alt || `${bid.bidder.name}'s avatar`} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold text-gray-800">{bid.bidder.name}</span>
                  </Link>
                  <span>bid</span>
                  <span className="font-bold">€{bid.amount}</span>
                  <span className="text-gray-500">on {new Date(bid.created).toLocaleString()}</span>
                </li>
              ))}
          </ul>

          {/* ✅ Soft Popup */}
          {showAuthPrompt && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <p className="text-gray-800 font-semibold">You need to be logged in to view profiles.</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button onClick={() => setShowAuthPrompt(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                    Cancel
                  </button>
                  <Link to="/auth/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleListing;
