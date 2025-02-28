import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // Reset search results
  };

  return (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search listings..."
        className="border border-gray-300 rounded-lg px-4 py-2 min-w-fit bg-white"
      />
      <button onClick={handleSearch} className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 cursor-pointer">
        Search
      </button>{" "}
      {query && (
        <button onClick={handleClear} className=" text-gray-700 hover:text-black text-sm cursor-pointer w-fit">
          ❌ Clear search
        </button>
      )}
    </div>
  );
};

export default SearchBar;
