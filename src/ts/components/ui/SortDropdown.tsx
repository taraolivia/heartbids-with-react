import { Listing } from "../../types/listingTypes";

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (sortType: string) => void;
  bidListings: (Listing & { userBid?: number; highestBid?: number })[];
  setSortedListings: (
    list: (Listing & { userBid?: number; highestBid?: number })[],
  ) => void;
}

const getHighestBid = (listing: Listing & { highestBid?: number }): number => {
  return (
    listing.highestBid ??
    (listing.bids?.length ? Math.max(...listing.bids.map((b) => b.amount)) : 0)
  );
};

const SortDropdown: React.FC<SortDropdownProps> = ({
  selectedSort,
  onSortChange,
  bidListings,
  setSortedListings,
}) => {
  const handleSortChange = (sortType: string) => {
    onSortChange(sortType);

    const sortedList = [...bidListings].sort((a, b) => {
      switch (sortType) {
        case "newest":
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case "mostBids":
          return (b.bids?.length ?? 0) - (a.bids?.length ?? 0);
        case "highestPrice":
          return getHighestBid(b) - getHighestBid(a);
        case "lowestPrice":
          return getHighestBid(a) - getHighestBid(b);

        case "endingSoon":
          return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime();
        default:
          return 0;
      }
    });

    setSortedListings(
      sortedList.map((listing) => ({
        ...listing,
        userBid: listing.userBid ?? 0,
        highestBid: listing.highestBid ?? 0,
      })),
    );
  };

  return (
    <div>
      <label
        htmlFor="sort"
        className="block text-gray-800 font-semibold"
      ></label>
      <select
        id="sort"
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500  bg-white"
      >
        <option value="newest">Newest</option>
        <option value="mostBids">Most Bids</option>
        <option value="highestPrice">Highest Price</option>
        <option value="lowestPrice">Lowest Price</option>
        <option value="endingSoon">Ending Soonest</option>
      </select>
    </div>
  );
};

export default SortDropdown;
