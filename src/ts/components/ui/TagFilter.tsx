import React, { useState, useEffect, useRef } from "react";

interface TagFilterProps {
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  availableTags: string[];
}

// ✅ Function to capitalize only the first letter of a tag
const capitalize = (tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onTagChange, availableTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Normalize tags: Merge similar tags while preserving correct capitalization
  const tagMap = new Map<string, string>(); // lowercase -> Capitalized version
  availableTags.forEach((tag) => {
    const lowerTag = tag.toLowerCase();
    const capitalizedTag = capitalize(lowerTag);

    // ✅ Ensure we store all versions but always display the capitalized one
    if (!tagMap.has(lowerTag)) {
      tagMap.set(lowerTag, capitalizedTag);
    }
  });

  // ✅ Convert to a sorted array
  const normalizedTags = Array.from(tagMap.values()).sort((a, b) => a.localeCompare(b));

  // ✅ Handle tag selection
  const handleTagChange = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    const capitalizedTag = tagMap.get(lowerTag) || tag; // Ensure correct capitalization

    const updatedTags = selectedTags.includes(capitalizedTag)
      ? selectedTags.filter((t) => t.toLowerCase() !== lowerTag) // Remove case-insensitively
      : [...selectedTags, capitalizedTag];

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

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-left focus:ring-2 focus:ring-pink-500 flex justify-between items-center"
      >
        <span>{formatToggleText()}</span>
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <div className="p-2 max-h-48 overflow-y-auto">
            {normalizedTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.some((selected) => selected.toLowerCase() === tag.toLowerCase())} // ✅ Case-insensitive match
                  onChange={() => handleTagChange(tag)}
                  className="form-checkbox text-pink-500"
                />
                <span className="text-gray-800">{tag}</span> {/* ✅ Always capitalized */}
              </label>
            ))}
          </div>
        </div>
      )}

      {selectedTags.length > 0 && (
        <div className="mt-3 text-right">
          <button
            onClick={handleClearAll}
            className="text-red-500 text-sm font-semibold hover:text-red-700"
          >
            Clear Tags
          </button>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
