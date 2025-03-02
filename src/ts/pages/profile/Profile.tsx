import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import getUserProfile from "../../utilities/getUserProfile";
import getUserBids from "../../utilities/getUserBids";
import HandleLogout from "../../utilities/HandleLogout";
import LotCard from "../../components/lots/LotCard";
import { Bid, Listing } from "../../types/listingTypes";
import { API_BASE } from "../../config/constants";
import { getHeaders } from "../../config/headers";
import SortDropdown from "../../components/ui/SortDropdown";
import TagFilter from "../../components/ui/TagFilter";
import EndedAuctionsFilter from "../../components/ui/EndedAuctionsFilter";
import Footer from "../../components/layout/Footer";
import SearchBar from "../../components/ui/SearchBar";
import { useHeartBidsFilter } from "../../utilities/useHeartBidsFilter";
import { useUser } from "../../utilities/useUser";
import { User } from "../../utilities/UserContext";
import { useLoading } from "../../utilities/LoadingProvider";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

type ExtendedListing = Listing & {
  userBid: number;
  highestBid: number;
};




const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const { setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [bidListings, setBidListings] = useState<ExtendedListing[]>([]);
  const logout = HandleLogout();
  const [wonListings, setWonListings] = useState<Listing[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("newest");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { showOnlyHeartBids } = useHeartBidsFilter();
  const filteredWonListings = wonListings.filter((lot) => !showOnlyHeartBids || lot.tags?.includes("HeartBids"));

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();

    bidListings.forEach((lot) => {
      lot.tags?.forEach((tag) => {
        tagSet.add(tag.toLowerCase()); // ✅ Normalize to lowercase
      });
    });

    return Array.from(tagSet)
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1)) // ✅ Capitalize first letter
      .sort((a, b) => a.localeCompare(b)); // ✅ Sort alphabetically
  }, [bidListings]); // ✅ Updates when bidListings change
  const [includeEnded, setIncludeEnded] = useState<boolean>(true);
  const [showOnlyHighestBids, setShowOnlyHighestBids] = useState<boolean>(false);

  // ✅ Apply all filters including HeartBids filter
  const filteredBids = bidListings
    .filter((lot) => searchQuery.length === 0 || lot.title.toLowerCase().includes(searchQuery.toLowerCase()) || (lot.description && lot.description.toLowerCase().includes(searchQuery.toLowerCase())))
    .filter(
      (lot) => selectedTags.length === 0 || lot.tags?.some((tag) => selectedTags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())) // ✅ Case-insensitive match
    )
    .filter((lot) => includeEnded || new Date(lot.endsAt).getTime() > Date.now())
    .filter((lot) => !showOnlyHighestBids || lot.userBid === lot.highestBid)
    .filter((lot) => !showOnlyHeartBids || lot.tags?.includes("HeartBids"));

  const sortedFilteredBids = [...filteredBids].sort((a, b) => {
    switch (selectedSort) {
      case "newest":
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      case "mostBids":
        return (b.bids?.length ?? 0) - (a.bids?.length ?? 0);
      case "highestPrice":
        return b.highestBid - a.highestBid;
      case "lowestPrice":
        return a.highestBid - b.highestBid;
      case "endingSoon":
        return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime();
      default:
        return 0;
    }
  });

  const fetchUserWins = async (username: string) => {
    try {
      const response = await fetch(`${API_BASE}/auction/profiles/${username}/wins?_bids=true&_seller=true`, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch won auctions");

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching won auctions:", error);
      return [];
    }
  };

  useEffect(() => {
    setBidListings([]);

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await getUserProfile();
        if (!profile) throw new Error("Failed to fetch user profile");

        const updatedUser: User = {
          ...profile,
          selectedCharity: user?.selectedCharity || profile.selectedCharity || null,
        };

        setUser(updatedUser); // ✅ Pass the final `User` object

        const userWins = await fetchUserWins(profile.name);
        setWonListings(userWins);

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

        const loadUserListings = async () => {
          if (!profile.listings || profile.listings.length === 0) {
            setListings([]);
            return;
          }

          const detailedListings = await Promise.all(
            profile.listings.map(async (listing: Listing) => {
              const fullListing = await fetchFullListingDetails(listing.id);
              return fullListing || listing;
            })
          );
          

          setListings(detailedListings);
        };

        await loadUserListings();

        const userBids: Bid[] = await getUserBids(profile.name);
        if (!userBids.length) return;
        
        const listingMap: Record<string, ExtendedListing> = {};

        for (const bid of userBids) {
          if (!bid.listing?.id) continue;
        
          const listingId = bid.listing.id;
        
          try {
            if (!listingMap[listingId]) {
              const fullListing = await fetchFullListingDetails(listingId);
              if (!fullListing) continue;
        
              listingMap[listingId] = {
                ...fullListing,
                userBid: bid.amount ?? 0, // ✅ Always define `userBid`
                highestBid: fullListing.bids?.length
                  ? Math.max(...fullListing.bids.map((b: Bid) => b.amount))
                  : 0, // ✅ Always define `highestBid`
              };
            } else {
              listingMap[listingId].userBid = Math.max(listingMap[listingId].userBid, bid.amount ?? 0);
            }
          } catch (error) {
            console.error(`Error fetching listing ${listingId}:`, error);
          }
        }
        
        // ✅ Ensure bid listings are stored as `ExtendedListing[]`
        setBidListings(Object.values(listingMap) as ExtendedListing[]);
        
        
        
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser, user?.selectedCharity, setLoading]);

  const handleDelete = (listingId: string) => {
    setListings((prevListings) => prevListings.filter((listing: Listing) => listing.id !== listingId));
  };

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-gray-600">Failed to load profile.</div>;

  return (
    <div className="min-h-screen w-full">
        <LoadingOverlay /> 
      <div className="max-w-6xl mx-auto bg-primary-100 pb-12 shadow-xl rounded-lg overflow-hidden">
        {/* ✅ Profile Banner */}
        <div className="relative w-full lg:h-90 md:h-72 h-54  bg-gray-200">{user.banner?.url && <img src={user.banner.url} alt={user.banner.alt || "User Banner"} className="w-full h-full object-cover" />}</div>

        {/* ✅ Profile Header */}
        <div className="relative -mt-15 flex  items-center py-6 bg-primary-100/40 backdrop-blur-sm text-black rounded-lg">
          <div className=" flex flex-wrap m-auto content-evenly justify-evenly gap-10 w-full">
            <div className="flex-1 flex justify-center relative -mt-15">
              <div className="relative w-40 h-40 sm:w-32 sm:h-40 md:w-40 md:h-40 lg:w-40 lg:h-40">
                <img src={user.avatar?.url || "default-avatar.png"} alt={user.avatar?.alt || "User Avatar"} className="w-full h-full rounded-full object-cover border-4 border-white shadow-md" onError={(e) => (e.currentTarget.src = "/default-avatar.png")} />

                {/* ✅ Charity Icon - Now Positioned Properly Inside */}
                {user.selectedCharity && (
                  <img
                    src={user.selectedCharity.logo}
                    alt={`${user.selectedCharity.name} Logo`}
                    className="absolute bottom-1 right-1 w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 
                   rounded-full border-2 border-white bg-white p-1 shadow-md"
                  />
                )}
              </div>
            </div>

            {/* ✅ User Name (Remains Unchanged) */}
            <div className="lg:max-w-1/2 flex-2 w-fit min-w-60">
              <div className="flex gap-3">
                <h1 className="text-3xl font-bold">{user.name}</h1>
              </div>

              {user.bio && <p className="text-gray-600 pt-2 pr-6">{user.bio}</p>}

              {/* ✅ Action Buttons */}
              <div className="mt-6 text-sm">
                <div className="flex justify-start gap-4 flex-wrap">
                  <Link to="/listing/create" className="bg-primary-300 text-black px-4 py-2 rounded-lg hover:bg-green-200 transition">
                    ➕ <span className="hidden sm:inline">Create </span> Post
                  </Link>
                  <Link to="/profile/editprofile" className="bg-secondary-200 text-black px-4 py-2 rounded-lg hover:bg-blue-200 transition">
                    ✏️ <span className="hidden sm:inline">Edit </span>Profile
                  </Link>
                  <button onClick={logout} className="bg-accent-200 text-black px-4 py-2 rounded-lg hover:bg-red-200 transition">
  🚪 <span className="hidden sm:inline">Log out</span>
</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Profile Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 text-center p-4">
          <div>
            <span className="text-xl font-semibold text-gray-900">🏆 {filteredWonListings.length || 0}</span>
            <p className="text-gray-500">Wins</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">📦 {user._count?.listings || 0}</span>
            <p className="text-gray-500">Listings</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">💰 {user.credits}</span>
            <p className="text-gray-500">Credits</p>
          </div>
        </div>

        {/* ✅ User Won Auctions */}
        <div className="px-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">🏆 Auctions You've Won</h2>
          <p className="text-gray-600 mb-4">These are the listings you've won.</p>

          {filteredWonListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 m-auto">
              {filteredWonListings.map((lot) => (
                <LotCard key={lot.id} id={lot.id} image={lot.media?.[0]?.url ?? "/HeartBids.png"} title={lot.title} price={lot.bids?.length ? Math.max(...lot.bids.map((b) => b.amount)) : 0} bids={lot.bids?.length ?? 0} closingDate={lot.endsAt} showClosingDate={false} tags={lot.tags ?? []} showTags={true} showSeller={true} seller={lot.seller ?? "Unknown Seller"} showControls={false} />
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-500">You haven't won any auctions yet.</p>
            </div>
          )}
        </div>

        {/* ✅ User Listings */}
        <div className="px-6 my-15">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📦 Your Listings</h2>
          <p className="text-gray-600 text-lg mb-6">These are the auctions you've created.</p>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 m-auto">
              {listings.map((lot) => (
                <div className="w-96" key={lot.id}>
                  <LotCard id={lot.id} image={lot.media?.[0]?.url ?? "/HeartBids.png"} title={lot.title} price={lot.bids && lot.bids.length > 0 ? Math.max(...lot.bids.map((b) => b.amount)) : 0} bids={lot.bids ? lot.bids.length : 0} closingDate={lot.endsAt} showClosingDate={true} tags={lot.tags ?? []} showTags={true} showSeller={false} showControls={true} description={lot.description ?? ""} created={lot.created} updated={lot.updated} showDescription={true} showCreatedUpdated={true} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500 text-lg">No listings yet. Start selling today!</p>
              <Link to="/listing/create" className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                ➕ Create a Listing
              </Link>
            </div>
          )}
        </div>

        <div className="px-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">💰 Bids You’ve Placed</h2>
          <p className="text-gray-600 mb-4">Auctions where you’ve placed bids.</p>

          <div className="flex  gap-4 items-end mb-4 flex-wrap">
          <SortDropdown
  selectedSort={selectedSort}
  onSortChange={setSelectedSort}
  bidListings={bidListings}
  setSortedListings={(sorted) =>
    setBidListings(
      sorted.map((listing) => ({
        ...listing,
        userBid: listing.userBid ?? 0, // Ensure no undefined values
        highestBid: listing.highestBid ?? 0,
      })) as ExtendedListing[]
    )
  }
/>

            <SearchBar onSearch={setSearchQuery} />
          </div>

          <TagFilter selectedTags={selectedTags} onTagChange={setSelectedTags} availableTags={availableTags} />
          <EndedAuctionsFilter includeEnded={includeEnded} onToggle={() => setIncludeEnded(!includeEnded)} />

          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="highestBidFilter" checked={showOnlyHighestBids} onChange={() => setShowOnlyHighestBids(!showOnlyHighestBids)} className="w-5 h-5 accent-pink-500 cursor-pointer" />
            <label htmlFor="highestBidFilter" className="text-gray-800 cursor-pointer">
              Show only listings where I am the highest bidder
            </label>
          </div>

          {/* ✅ Render Filtered Listings */}
          {filteredBids.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 m-auto">
              {sortedFilteredBids.map((lot) => (
                <LotCard key={lot.id} id={lot.id} image={lot.media?.length > 0 ? lot.media[0].url : "/HeartBids.png"} title={lot.title} price={lot.highestBid} bids={lot.bids?.length ?? 0} closingDate={lot.endsAt ?? ""} tags={lot.tags ?? []} showTags={true} showSeller={true} seller={lot.seller ?? "Unknown Seller"} showControls={false} userBid={lot.userBid} showClosingDate={true} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No matching auctions found.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
