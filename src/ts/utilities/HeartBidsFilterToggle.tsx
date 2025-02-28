import { useHeartBidsFilter } from "./useHeartBidsFilter";

export const HeartBidsFilterToggle: React.FC = () => {
  const { showOnlyHeartBids, toggleFilter } = useHeartBidsFilter(); // ✅ Use global filter state

  return (
    <div className="flex text-sm justify-left items-center max-w-xl bg-background-50/40 p-1 rounded-lg w-fit space-x-3 text-text-900">      
      <span className={` ${showOnlyHeartBids ? "text-text-600" : "text-text-800"}`}>
        HeartBids Only
      </span>


      {/* ✅ Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={!showOnlyHeartBids}
          onChange={toggleFilter}
          className="sr-only peer"
        />
        <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-500 rounded-full relative transition-all">
          <div
            className={`absolute mt-[0.1em] w-5 h-5 bg-white rounded-full shadow-md transition-all transform 
            ${showOnlyHeartBids ? "translate-x-0.5" : "translate-x-6.5"}`}
          ></div>
        </div>
      </label>
      {/* ✅ Label for 'All Listings' */}
      <span className={` ${!showOnlyHeartBids ? "text-text-800" : "text-text-600"}`}>
        All Listings
      </span>

    </div>
  );
};

export default HeartBidsFilterToggle;
