import { useState } from "react";
import { useUser } from "../../utilities/useUser";
import AllCharities from "../../utilities/AllCharities";

const CharitySelector = () => {
  const { user, updateCharity } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (charityName: string) => {
    const chosenCharity = AllCharities.find((c) => c.name === charityName);
    if (!chosenCharity) return;

    updateCharity(chosenCharity);
    setIsOpen(false); // ✅ Close dropdown after selection
  };

  return (
    <div className="relative overflow-visible w-full">
      <label className="text-sm">Your chosen charity:</label>

      {/* ✅ Button to open dropdown */}
      <button
        type="button"
        className="flex items-center justify-between w-fit mt-4 px-4 py-2 rounded bg-background-50 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user?.selectedCharity ? (
          <div className="flex items-center gap-3">
            <img
              src={user.selectedCharity.logo}
              alt={`${user.selectedCharity.name} Logo`}
              className="w-6 h-6"
            />
            <span>{user.selectedCharity.name}</span>
          </div>
        ) : (
          <span>Choose your Charity</span>
        )}
        <span className="ml-4">▼</span>
      </button>

      {/* ✅ Dropdown menu */}
      {isOpen && (
        <ul className="absolute z-[9999] max-h-52 overflow-y-auto left-0 w-fit px-4 py-2 mt-2 bg-white rounded shadow-lg ">
          {AllCharities.map((charity) => (
            <li
              key={charity.name}
              onClick={() => handleSelect(charity.name)}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={charity.logo} alt={charity.name} className="w-6 h-6" />
              <span>{charity.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharitySelector;
