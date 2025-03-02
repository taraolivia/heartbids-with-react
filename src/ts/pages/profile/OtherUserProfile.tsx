import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import getOtherUserProfile from "../../utilities/GetOtherUserProfile";
import LotCard from "../../components/lots/LotCard";
import { UserProfile, Listing } from "../../types/listingTypes";
import Footer from "../../components/layout/Footer";
import { API_BASE } from "../../config/constants";
import { getHeaders } from "../../config/headers";
import { useLoading } from "../../utilities/LoadingProvider";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const startLoading = useCallback(() => setLoading(true), [setLoading]);
  const stopLoading = useCallback(() => setLoading(false), [setLoading]);

  useEffect(() => {
    if (!username) return;

    startLoading();
    getOtherUserProfile(username)
      .then(async (data) => {
        if (!data) {
          setError("User not found");
          stopLoading();
          return;
        }
        setUserProfile(data);

        const detailedListings = await Promise.all(
          ((data.listings as Listing[]) || []).map(async (listing: Listing) => {
            const response = await fetch(
              `${API_BASE}/auction/listings/${listing.id}?_bids=true&_seller=true`,
              {
                method: "GET",
                headers: getHeaders(),
              },
            );

            if (!response.ok) return listing;

            const result = await response.json();
            return result.data as Listing;
          }),
        );

        setListings(detailedListings);
        stopLoading();
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile");
        stopLoading();
      });
  }, [username, startLoading, stopLoading]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <LoadingOverlay />
      <div className="max-w-6xl mx-auto bg-primary-100 pb-12 shadow-xl rounded-lg overflow-hidden">
        <div className="relative w-full lg:h-90 md:h-72 h-54 bg-gray-200">
          {userProfile.banner?.url && (
            <img
              src={userProfile.banner.url}
              alt={userProfile.banner.alt || "User Banner"}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="relative -mt-15 flex items-center py-6 bg-primary-100/40 backdrop-blur-sm text-black rounded-lg">
          <div className="flex flex-wrap m-auto content-evenly justify-evenly gap-10 w-full">
            <div className="flex-1 flex justify-center relative -mt-15">
              <div className="relative w-40 h-40 sm:w-32 sm:h-40 md:w-40 md:h-40 lg:w-40 lg:h-40">
                <img
                  src={userProfile.avatar?.url || "/default-avatar.png"}
                  alt={userProfile.avatar?.alt || "User Avatar"}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
                />

                {userProfile.selectedCharity && (
                  <img
                    src={userProfile.selectedCharity.logo}
                    alt={`${userProfile.selectedCharity.name} Logo`}
                    className="absolute bottom-1 right-1 w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 
                           rounded-full border-2 border-white bg-white p-1 shadow-md"
                  />
                )}
              </div>
            </div>

            <div className="lg:max-w-1/2 flex-2 w-fit min-w-60">
              <div className="flex gap-3">
                <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              </div>
              {userProfile.bio && (
                <p className="text-gray-600 pt-2">{userProfile.bio}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-gray-200 text-center p-4">
          <div>
            <span className="text-xl font-semibold text-gray-900">
              🏆 {userProfile._count?.wins || 0}
            </span>
            <p className="text-gray-500">Wins</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">
              📦 {userProfile._count?.listings || 0}
            </span>
            <p className="text-gray-500">Listings</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">
              💰 {userProfile.credits}
            </span>
            <p className="text-gray-500">Credits</p>
          </div>
        </div>

        <div className="px-6 my-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {userProfile.name}'s Listings
          </h2>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-auto">
              {listings.map((listing) => (
                <LotCard
                  key={listing.id}
                  id={listing.id}
                  image={listing.media?.[0]?.url ?? "/default-image.png"}
                  title={listing.title}
                  price={
                    listing.bids && listing.bids.length > 0
                      ? Math.max(...listing.bids.map((b) => b.amount))
                      : 0
                  }
                  bids={listing.bids ? listing.bids.length : 0}
                  closingDate={listing.endsAt ?? ""}
                  tags={listing.tags ?? []}
                  seller={userProfile}
                  showTags={true}
                  showSeller={false}
                  showControls={false}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-500">
                This user has not posted any listings.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
