type EndedAuctionsFilterProps = {
    includeEnded: boolean;
    onToggle: () => void;
  };
  
  const EndedAuctionsFilter = ({ includeEnded, onToggle }: EndedAuctionsFilterProps) => {
    return (
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="includeEnded"
          checked={includeEnded}
          onChange={onToggle}
          className="w-5 h-5 accent-pink-500 cursor-pointer"
        />
        <label htmlFor="includeEnded" className="text-gray-800 cursor-pointer">
          Include ended auctions
        </label>
      </div>
    );
  };
  
  export default EndedAuctionsFilter;
  