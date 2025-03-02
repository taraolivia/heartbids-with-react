import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_LISTINGS } from "../../config/constants";
import { Listing, Bid } from "../../types/listingTypes";
import { useBidding } from "../../hooks/useBidding";
import { useUser } from "../../utilities/useUser";
import AuctionCountdown from "../../components/ui/AuctionCountdown";
import CopyLinkButton from "../../components/ui/CopyLinkButton";
import Footer from "../../components/layout/Footer";
import getOtherUserProfile from "../../utilities/GetOtherUserProfile";
import LazyLoadImage from "../../utilities/LazyLoadImage";

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
        // ✅ Fetch the listing (from Noroff API)
        const response = await fetch(`${API_LISTINGS}/${id}?_bids=true&_seller=true`);
        const result = await response.json();

        if (!result?.data) throw new Error("Unexpected API response format");

        let formattedListing = { ...result.data };

        // ✅ Fetch the seller's profile (to include selectedCharity)
        const sellerProfile = await getOtherUserProfile(result.data.seller.name);
        if (sellerProfile) {
          formattedListing = {
            ...formattedListing,
            seller: {
              ...formattedListing.seller,
              selectedCharity: sellerProfile.selectedCharity || null,
            },
          };
        }

        const updatedBids = await Promise.all(
          result.data.bids.map(async (bid: Bid) => {
            const bidderProfile = await getOtherUserProfile(bid.bidder.name);
            return {
              ...bid,
              bidder: {
                ...bid.bidder,
                selectedCharity: bidderProfile?.selectedCharity || null,
              },
            };
          })
        );

        formattedListing = {
          ...formattedListing,
          bids: updatedBids,
        };

        console.log("Final Listing with Bids:", formattedListing); // ✅ Debugging log

        setListing(formattedListing);
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
  console.log(listing.seller.selectedCharity);
  console.log("Seller Data:", listing.seller);
  console.log("Selected Charity:", listing.seller?.selectedCharity);

  return (
    <div className="mx-auto py-6 space-y-4">
      <div className="relative w-full h-60 bg-gray-200 -mt-20 overflow-hidden">
        {/* ✅ Glass Effect Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xs"></div>

        {/* ✅ Image (Placed Below the Glass Effect) */}
        <LazyLoadImage src={listing.media?.length > 0 ? listing.media[0].url : "/images/default-banner.jpg"} alt={listing.media?.length > 0 ? listing.media[0].alt : "Default Listing Banner"} className="w-full object-cover h-full" />
        {/* ✅ Copy Link Button (Bottom Right) */}
        <CopyLinkButton url={window.location.href} />
      </div>
      <div className="w-8/10 m-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-gray-800">{listing.title}</h1>
        <div className="flex flex-wrap gap-6 items-start mt-6 ">
          <div className="flex flex-1 flex-col min-w-62">
            {listing.media.length > 0 && <LazyLoadImage src={listing.media[0].url} alt={listing.media[0].alt} className="h-auto object-cover rounded-md" />}
            <p className="text-gray-600 text-base">
              {new Date(listing.endsAt) < new Date()
                ? "This auction has ended"
                : `This listing ends on: ${new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(listing.endsAt))}`}
            </p>
          </div>

          <div className="flex-1 space-y-4 min-w-82">
            <p className="text-text-900 text-lg">{listing.description}</p>
            {/* ✅ Display All Tags Below the Title */}
            {Array.isArray(listing.tags) && listing.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {listing.tags.map((tag) => (
                  <span key={tag} className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <span className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-md mt-2">#</span>
            )}
            {/* ✅ Countdown */}
            <AuctionCountdown closingDate={listing.endsAt} />
            <p className="text-xl font-bold text-gray-900">Current Highest Bid: {highestBid ? `€${highestBid}` : "No bids yet"}</p>
            {listing.seller && (
              <div className="p-4 rounded-lg mt-4 border border-primary-300">
                <div className="flex items-center  space-x-4">
                  {/* ✅ Profile link wraps avatar + name */}
                  <Link to={`/profile/${listing.seller.name}`} className="flex items-center space-x-3 hover:underline">
                    <img
                      src={listing.seller.avatar?.url || "/default-avatar.png"}
                      alt={listing.seller.avatar?.alt || `${listing.seller.name}'s avatar`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      onError={(e) => {
                        if (!e.currentTarget.src.includes("default-avatar.png")) {
                          e.currentTarget.src = "/images/default-avatar.png"; // ✅ Ensures fallback only happens once
                        }
                      }}
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {listing.seller.name}
                        {listing.seller?.selectedCharity?.logo && <img src={listing.seller.selectedCharity.logo} alt={`${listing.seller.selectedCharity.name} Logo`} className="w-6 h-6 inline ml-2 rounded-full" />}
                      </p>
                    </div>
                  </Link>
                </div>
                {/* ✅ Only show bio if it exists */}
                {listing.seller.bio && <p className="mt-3 text-gray-600 border-t border-accent-200 pt-3">{listing.seller.bio}</p>}
              </div>
            )}{" "}
          </div>
        </div>

        <div className="w-full flex gap-6  justify-items-start align-top  mt-4 flex-wrap-reverse">
          <div className="flex-1 min-w-62">
            {bidsArray.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800">Bidding History:</h4>
                <ul className="mt-2 space-y-2 p-1 bg-secondary-50">
                  {bidsArray
                    .slice()
                    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                    .map((bid) => (
                      <li key={bid.id} className="flex items-center space-x-2 text-gray-600 text-sm p-2">
                        {/* ✅ Prevent navigation if not logged in */}
                        <Link to={`/profile/${bid.bidder.name}`} className="flex items-center space-x-2 hover:underline relative" onClick={handleUserClick}>
                          <img src={bid.bidder?.avatar?.url?.trim() ? bid.bidder.avatar.url : "/default-avatar.png"} alt={bid.bidder?.avatar?.alt?.trim() || `${bid.bidder?.name || "User"}'s avatar`} className="w-6 h-6 rounded-full object-cover" onError={(e) => (e.currentTarget.src = "/default-avatar.png")} />
                          <span className="font-semibold text-gray-800  flex flex-row gap-1">
                            {bid.bidder.name}
                            {bid.bidder.selectedCharity?.logo && <img src={bid.bidder.selectedCharity.logo} alt={`${bid.bidder.selectedCharity.name} Logo`} className="w-5 h-5 opacity-80" />}
                          </span>
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
                        <Link to="/auth/login" className="px-4 py-2 bg-secondary-500 text-white rounded-lg">
                          Log In
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-62 mt-4">
            <h4 className="text-lg font-semibold text-gray-800"> Bid on this listing:</h4>
            <form onSubmit={handlePlaceBid} className="p-4 border-2 border-accent-400 rounded shadow mt-6">
              <label htmlFor="bidAmount" className="block text-lg font-medium"></label>
              <input id="bidAmount" type="number" min={highestBid + 1} value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} className={`w-full p-2 mt-2 border rounded ${userCantBidMessage ? "bg-gray-200 cursor-not-allowed" : ""}`} disabled={!!userCantBidMessage} />
              <button type="submit" className={`w-full p-2 mt-3 rounded ${userCantBidMessage ? "bg-gray-400 text-white cursor-not-allowed" : "bg-secondary-500 text-white hover:bg-secondary-600"}`} disabled={!!userCantBidMessage || bidLoading || isAuctionEnded}>
                {userCantBidMessage || (bidLoading ? "Processing your bid..." : "Place Bid")}
              </button>
            </form>

            {bidMessage && <p className={`mt-2 ${bidMessage.startsWith("✅") ? "text-primary-500" : "text-red-500"}`}>{bidMessage}</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SingleListing;
