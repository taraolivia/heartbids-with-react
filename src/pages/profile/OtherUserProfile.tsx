import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getOtherUserProfile from "./GetOtherUserProfile";
import LotCard from "../../components/LotCard"; // ✅ Keeping the same listing layout
import { UserProfile, Bid, Listing } from "../../ts/types/listingTypes";

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>(); // Get username from URL
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    if (username) {
      setLoading(true);
      getOtherUserProfile(username)
        .then((data) => {
          if (!data) {
            setError("User not found");
            setLoading(false);
            return;
          }
          setUserProfile(data);
          setListings(data.listings || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
          setError("Failed to load profile");
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading profile...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  if (!userProfile) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen py-4 px-2 w-full pt-25">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* ✅ Profile Banner */}
        <div className="relative w-full h-60 md:h-72 bg-gray-200">
          {userProfile.banner?.url && (
            <img src={userProfile.banner.url} alt={userProfile.banner.alt || "User Banner"} className="w-full h-full object-cover" />
          )}
        </div>

        {/* ✅ Profile Header (Avatar + Name + Bio) */}
        <div className="relative -mt-16 flex items-center space-x-6 p-6 bg-green-100/50 backdrop-blur-sm text-black rounded-lg">
          <img
            src={userProfile.avatar?.url || "/default-avatar.png"}
            alt={userProfile.avatar?.alt || "User Avatar"}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{userProfile.name}</h1>
            <p className="text-gray-600">{userProfile.bio || "No bio available."}</p>
          </div>
        </div>

        {/* ✅ Profile Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-100 text-center p-4">
          <div>
            <span className="text-xl font-semibold text-gray-900">💰 {userProfile.credits}</span>
            <p className="text-gray-500">Credits</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">📦 {userProfile._count?.listings || 0}</span>
            <p className="text-gray-500">Listings</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">🏆 {userProfile._count?.wins || 0}</span>
            <p className="text-gray-500">Wins</p>
          </div>
        </div>

        {/* ✅ User Listings */}
        <div className="px-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}'s Listings</h2>
          <p className="text-gray-600 mb-4">Active auctions from this user.</p>

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
                  seller={userProfile}
                  showDescription={true}
                  showTags={true}
                  showCreatedUpdated={true}
                  showSeller={false} // ✅ Hides the seller info since we are already on the seller's page
                  showControls={false} // ✅ No edit/delete controls
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-500">This user has no active listings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
