import { useState } from "react";
import { useUser } from "../../utilities/useUser";
import AllCharities, { Charity } from "../../utilities/AllCharities";

interface CharitySelectorProps {
  selectedCharity?: Charity | null; // ✅ Optional for registration use
  onSelectCharity?: (charity: Charity) => void; // ✅ Optional for registration use
}

const CharitySelector: React.FC<CharitySelectorProps> = ({ selectedCharity, onSelectCharity }) => {
  const userContext = useUser(); // ✅ Get user context
  const user = userContext?.user;
  const updateCharity = userContext?.updateCharity;
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (charityName: string) => {
    const chosenCharity = AllCharities.find((c) => c.name === charityName);
    if (!chosenCharity) return;

    if (onSelectCharity) {
      onSelectCharity(chosenCharity); // ✅ Registration form updates state
    } else if (updateCharity) {
      updateCharity(chosenCharity); // ✅ Logged-in users update Firestore
    }

    setIsOpen(false);
  };

  return (
    <div className="relative overflow-visible w-full">
      <label className="text-sm">Select a Charity:</label>

      {/* ✅ Button to open dropdown */}
      <button
        type="button"
        className="flex items-center justify-between w-fit mt-4 px-4 py-2 rounded shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {(selectedCharity || user?.selectedCharity) ? (
          <div className="flex items-center gap-3">
            <img
              src={(selectedCharity || user?.selectedCharity)?.logo}
              alt={`${(selectedCharity || user?.selectedCharity)?.name} Logo`}
              className="w-8 h-8"
            />
            <span>{(selectedCharity || user?.selectedCharity)?.name}</span>
          </div>
        ) : (
          <span>Choose your Charity</span>
        )}
        <span className="ml-4">▼</span>
      </button>

      {/* ✅ Dropdown menu */}
      {isOpen && (
        <ul className="absolute z-[9999] max-h-52 overflow-y-auto left-0 w-fit px-4 py-2 mt-2 bg-white rounded shadow-lg">
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
