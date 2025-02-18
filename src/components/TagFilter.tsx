import React, { useState, useEffect, useRef } from "react";

interface TagFilterProps {
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  availableTags: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onTagChange, availableTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTagChange = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag) // Remove tag if already selected
      : [...selectedTags, tag]; // Add tag if not selected

    onTagChange(updatedTags);
  };

  const handleClearAll = () => {
    onTagChange([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatToggleText = () => {
    if (selectedTags.length === 0) return "Select tags";
    if (selectedTags.length <= 3) return selectedTags.join(", ");
    return `${selectedTags.slice(0, 3).join(", ")} +${selectedTags.length - 3}`;
  };

  return (
    <div className="relative mb-6">
      <label className="block text-gray-800 font-semibold mb-2">Filter by Tags:</label>

      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-left focus:ring-2 focus:ring-pink-500 flex justify-between items-center"
      >
        <span>{formatToggleText()}</span>
        <span className="ml-2">▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <div className="p-2 max-h-48 overflow-y-auto">
            {availableTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="form-checkbox text-pink-500"
                />
                <span className="text-gray-800">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* "Clear All" Button (Below Dropdown) */}
      {selectedTags.length > 0 && (
        <div className="mt-3 text-right">
          <button
            onClick={handleClearAll}
            className="text-red-500 text-sm font-semibold hover:text-red-700"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
