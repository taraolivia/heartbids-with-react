import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getUserProfile from "./getUserProfile";
import getUserBids from "../../components/getUserBids";
import HandleLogout from "../auth/HandleLogout";
import LotCard from "../../components/LotCard";
import { UserProfile, Bid, Listing } from "../../ts/types/listingTypes";
import { API_BASE } from "../../js/api/constants";
import { getHeaders } from "../../js/api/headers";


const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]); // ✅ Declare listings properly
  const [bidListings, setBidListings] = useState<(Listing & { userBid: number; highestBid: number })[]>([]); // ✅ Stores associated listings
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (!profile) throw new Error("Failed to fetch user profile");
  
        setUser(profile);
  
        // ✅ Fetch full listing details including bids
        const fetchFullListingDetails = async (listingId: string) => {
          try {
            const response = await fetch(`${API_BASE}/auction/listings/${listingId}?_bids=true&_seller=true`, {
              method: "GET",
              headers: getHeaders(),
            });
  
            if (!response.ok) throw new Error(`Failed to fetch listing details for ID: ${listingId}`);
  
            const result = await response.json();
            return result.data;
          } catch (error) {
            console.error(`Error fetching listing ${listingId}:`, error);
            return null;
          }
        };
  
        // ✅ Fetch and update listings with bid data
        const loadUserListings = async () => {
          if (!profile.listings || profile.listings.length === 0) {
            setListings([]);
            return;
          }
  
          const detailedListings = await Promise.all(
            profile.listings.map(async (listing) => {
              const fullListing = await fetchFullListingDetails(listing.id);
              return fullListing || listing; // ✅ Use full listing if available, otherwise fallback to basic
            })
          );
  
          setListings(detailedListings);
        };
  
        await loadUserListings();
  
        // ✅ Fetch user's bids separately
        const userBids: Bid[] = await getUserBids(profile.name);
        if (!userBids.length) return;
  
        // ✅ Store highest bid per listing
        const listingMap: Record<string, Listing & { userBid: number; highestBid: number }> = {};
  
        for (const bid of userBids) {
          if (!bid.listing?.id) continue;
  
          const listingId = bid.listing.id;
  
          try {
            if (!listingMap[listingId]) {
              const fullListing = await fetchFullListingDetails(listingId);
              if (!fullListing) continue;
  
              listingMap[listingId] = {
                ...fullListing,
                userBid: bid.amount, // ✅ Store user's highest bid on this listing
                highestBid: fullListing.bids?.length
                  ? Math.max(...fullListing.bids.map((b: Bid) => b.amount)) // ✅ Find highest bid from all users
                  : 0,
              };
            } else {
              // ✅ If listing already exists, update user's highest bid if it's higher
              listingMap[listingId].userBid = Math.max(listingMap[listingId].userBid, bid.amount);
            }
          } catch (error) {
            console.error(`Error fetching listing ${listingId}:`, error);
          }
        }
  
        setBidListings(Object.values(listingMap)); // ✅ Convert map to an array
  
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);
  
  
    
  
  const handleDelete = (listingId: string) => {
    setListings((prevListings) => prevListings.filter((listing) => listing.id !== listingId));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-gray-600">Failed to load profile.</div>;

  return (
    <div className="min-h-screen py-4 px-2 w-full">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden pt-20">
        
        {/* ✅ Profile Banner */}
        <div className="relative w-full h-60 md:h-72 bg-gray-200">
          {user.banner?.url && (
            <img src={user.banner.url} alt={user.banner.alt || "User Banner"} className="w-full h-full object-cover" />
          )}
        </div>

        {/* ✅ Profile Header */}
        <div className="relative -mt-16 flex items-center space-x-6 p-6 bg-green-100/50 backdrop-blur-sm text-black rounded-lg">
          <img
            src={user.avatar?.url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
            alt={user.avatar?.alt || "User Avatar"}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            {user.bio && <p className="text-gray-600">{user.bio}</p>}
          </div>
        </div>

        {/* ✅ Profile Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-100 text-center p-4">
          <div>
            <span className="text-xl font-semibold text-gray-900">💰 {user.credits}</span>
            <p className="text-gray-500">Credits</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">📦 {user._count?.listings || 0}</span>
            <p className="text-gray-500">Listings</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">🏆 {user._count?.wins || 0}</span>
            <p className="text-gray-500">Wins</p>
          </div>
        </div>

        {/* ✅ Action Buttons */}
        <div className="mt-6 px-6">
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between shadow-md">
            <Link to="/profile/edit" className="bg-blue-400 text-black px-4 py-2 rounded-lg hover:bg-blue-200 transition">
              ✏️ Edit Profile
            </Link>
            <Link to="/listing/create" className="bg-green-400 text-black px-4 py-2 rounded-lg hover:bg-green-200 transition">
              ➕ Create Post
            </Link>
            <button
              onClick={HandleLogout}
              className="bg-red-400 text-black px-4 py-2 rounded-lg hover:bg-red-200 transition"
            >
              🚪 Log Out
            </button>
          </div>
        </div>

{/* ✅ User Listings */}
<div className="px-6 mt-10">
  <h2 className="text-3xl font-bold text-gray-800 mb-2">My Listings</h2>
  <p className="text-gray-600 text-lg mb-6">These are the auctions you've created.</p>

  {listings.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {listings.map((lot) => (
        <div key={lot.id}           className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition border border-gray-300 min-w-[300px] max-w-[350px] mx-auto"
>
          <LotCard
            id={lot.id}
            image={lot.media?.[0]?.url ?? "https://placehold.co/300x200"}
            title={lot.title}
            price={lot.bids && lot.bids.length > 0 ? Math.max(...lot.bids.map((b) => b.amount)) : 0} // ✅ Fix highest bid
            bids={lot.bids ? lot.bids.length : 0} // ✅ Fix bid count
            closingDate={lot.endsAt}
            showSeller={false}
            showControls={true}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <p className="text-gray-500 text-lg">No listings yet. Start selling today!</p>
      <Link
        to="/listing/create"
        className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        ➕ Create a Listing
      </Link>
    </div>
  )}
</div>







        <div className="px-6 mt-6">
  <h2 className="text-2xl font-bold text-gray-900">Bids You’ve Placed</h2>
  <p className="text-gray-600 mb-4">Auctions where you’ve placed bids.</p>

  {bidListings.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-auto m-auto">
    {bidListings.map((lot) => (
        <LotCard
          key={lot.id}
          id={lot.id}
          image={lot.media?.[0]?.url ?? "/images/logo/HeartBids.png"}
          title={lot.title}
          price={lot.highestBid} // ✅ The highest bid from all users
          bids={lot.bids?.length ?? 0}
          closingDate={lot.endsAt ?? ""}
          userBid={lot.userBid} // ✅ Your highest bid separately
          showSeller={false}
          showControls={false}
        />
      ))}
    </div>
  ) : (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
      <p className="text-gray-500">You haven’t placed any bids yet.</p>
    </div>
  )}
</div>




      </div>
    </div>
  );
};

export default Profile;
