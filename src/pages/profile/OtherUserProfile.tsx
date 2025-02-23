import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getOtherUserProfile from "./GetOtherUserProfile";
import LotCard from "../../components/LotCard"; // ✅ Keeping the same listing layout
import { UserProfile, Bid, Listing } from "../../ts/types/listingTypes";
import Footer from "../../components/Footer";

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
    <div className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* ✅ Profile Banner */}
        <div className="relative w-full h-80 md:h-72 bg-gray-200">
          <img
            src={userProfile.banner?.url || "/images/default-banner.jpg"}
            alt={userProfile.banner?.alt || "User Banner"}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== "/images/default-banner.jpg") {
                e.currentTarget.src = "/images/default-banner.jpg"; // ✅ Prevents infinite loop
              }
            }}
          />
        </div>

        {/* ✅ Profile Header (Avatar + Name + Bio) */}
        <div className="relative -mt-15 flex items-center p-6 bg-green-100/50 backdrop-blur-sm text-black rounded-lg">
          <div className="max-w-8/10 flex m-auto content-center justify-center gap-10">
            <img
              src={userProfile.avatar?.url ? userProfile.avatar.url : "/default-avatar.png"}
              alt={userProfile.avatar?.alt || "User Avatar"}
              className="w-30 h-30 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-50 lg:h-50 aspect-square rounded-full object-cover p-1 -mt-15 border-4 border-white shadow-md"
              onError={(e) => {
                if (e.currentTarget.src !== window.location.origin + "/default-avatar.png") {
                  e.currentTarget.src = "/images/default-avatar.png"; // ✅ Prevents infinite loop & ensures fallback
                }
              }}
            />

            <div>
              <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              <p className="text-gray-600">{userProfile.bio || ""}</p>
            </div>
          </div>
        </div>

        {/* ✅ Profile Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-100 text-center p-4">
          <div>
            <span className="text-xl font-semibold text-gray-900">🏆 {userProfile._count?.wins || 0}</span>
            <p className="text-gray-500">Wins</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">📦 {userProfile._count?.listings || 0}</span>
            <p className="text-gray-500">Listings</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">💰 {userProfile.credits}</span>
            <p className="text-gray-500">Credits</p>
          </div>
        </div>

        {/* ✅ User Listings */}
        <div className="px-6 my-10">
          <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}'s Listings</h2>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-auto">
              {listings.map((listing) => (
                <LotCard
                  key={listing.id}
                  id={listing.id}
                  image={listing.media?.[0]?.url ?? "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png?Expires=1833634300&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXzKjKB9EBskp3Bvq-3FtMxhTtUHE2KAukzJMqO5LbXgl8FP60SfJ~0O6McJzoOI4pemUMFl24KopwqxhMfW43C9ZLP18whF774erFlx-k3YgWa5rfL3S-vPps0KlrpfcqiZS3KBesfBFlENrQscU03jUHEEH4m8BE5BpOm8P6w-~9GcCsJ20C2zEYzluPExOP9W-q9w2QQ9X8GGuXxcrgaY568UXeteS9XSYQGnHe1I7LdLwdTqFlN59BBQrlXqTU~glSXVFBiJgcUHg3B61xF3k-aOw9M-Dt5edaqmjTlRkFSiAkknFLmEvUjreiupxnWaMFx6pmm~sham2D0PcA__"}
                  title={listing.title}
                  price={listing.bids?.length ? Math.max(...listing.bids.map((bid: Bid) => bid.amount)) : 0}
                  bids={listing._count?.bids ?? 0}
                  closingDate={listing.endsAt ?? ""}
                  tags={listing.tags}
                  seller={userProfile}
                  showTags={true}
                  showSeller={false} // ✅ Hides the seller info since we are already on the seller's page
                  showControls={false} // ✅ No edit/delete controls
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-500">This user has not posted any listings.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
