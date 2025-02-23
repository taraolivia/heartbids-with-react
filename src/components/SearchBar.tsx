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
    <div className="flex gap-2 mb-4 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ Trigger search on Enter
        placeholder="Search listings..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-14 top-2.5 text-gray-500 hover:text-black text-sm cursor-pointer"
        >
          ❌ Clear search
        </button>
      )}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
