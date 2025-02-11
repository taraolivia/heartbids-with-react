import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getUserProfile from "./getUserProfile";
import HandleLogout from "../auth/HandleLogout";
import LotCard from "../../components/LotCard";
import { UserProfile, Bid, Listing } from "../../ts/types/listingTypes";

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]); // ✅ Fix: Proper state management

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
        setListings(profile.listings); // ✅ Fix: Store listings correctly
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading profile...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Failed to load profile.</div>;
  }

  return (
    <div className="min-h-screen py-4 px-2 w-full">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* ✅ Profile Banner */}
        <div className="relative w-full h-60 md:h-72 bg-gray-200">
          {user.banner?.url && (
            <img src={user.banner.url} alt={user.banner.alt || "User Banner"} className="w-full h-full object-cover" />
          )}
        </div>

        {/* ✅ Profile Header (Avatar + Name + Bio) */}
        <div className="relative -mt-16 flex items-center space-x-6 p-6 bg-green-100/50 backdrop-blur-sm text-black rounded-lg">
          <img
            src={user.avatar?.url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
            alt={user.avatar?.alt || "User Avatar"}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.bio || "No bio available."}</p>
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
        <div className="px-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
          <p className="text-gray-600 mb-4">Auctions you have created.</p>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {listings.map((listing) => (
                <LotCard
                  key={listing.id}
                  id={listing.id}
                  image={listing.media?.[0]?.url ?? "https://placehold.co/300x200"}
                  title={listing.title}
                  price={listing.bids?.length ? Math.max(...listing.bids.map((bid: Bid) => bid.amount)) : 0}
                  bids={listing._count?.bids ?? 0}
                  closingDate={listing.endsAt ?? ""}
                  description={listing.description ?? ""}
                  tags={listing.tags}
                  created={listing.created}
                  updated={listing.updated}
                  showDescription={true}
                  showTags={true}
                  showCreatedUpdated={true}
                  seller={user}
                  showSeller={false}
                  showControls={true} // ✅ Buttons only appear on Profile page
                  onDelete={handleDelete} // ✅ Removes listings dynamically
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No listings yet. Start selling today!</p>
              <Link to="/listing/create/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Create a Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
