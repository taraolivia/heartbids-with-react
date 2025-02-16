import React from "react";
import { useHeartBidsFilter } from "./useHeartBidsFilter";

export const HeartBidsFilterToggle: React.FC = () => {
  const { showOnlyHeartBids, toggleFilter } = useHeartBidsFilter(); // ✅ Use global filter state

  return (
    <div className="flex items-center space-x-3 text-gray-800">      {/* ✅ Label for 'HeartBids Only' */}
      <span className={`font-medium ${showOnlyHeartBids ? "text-blue-500" : "text-gray-500"}`}>
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
            className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-all transform 
            ${showOnlyHeartBids ? "translate-x-1" : "translate-x-7"}`}
          ></div>
        </div>
      </label>
      {/* ✅ Label for 'All Listings' */}
      <span className={`font-medium ${!showOnlyHeartBids ? "text-blue-500" : "text-gray-500"}`}>
        All Listings
      </span>

    </div>
  );
};

export default HeartBidsFilterToggle;
