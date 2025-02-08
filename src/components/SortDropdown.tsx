type SortDropdownProps = {
    selectedSort: string;
    onSortChange: (sortType: string) => void;
  };
  
  const SortDropdown = ({ selectedSort, onSortChange }: SortDropdownProps) => {
    return (
      <div className="mb-6">
        <label htmlFor="sort" className="block text-gray-800 font-semibold mb-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500"
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
  