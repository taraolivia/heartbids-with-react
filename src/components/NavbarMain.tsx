import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HandleLogout from "../pages/auth/HandleLogout";



// ✅ Function to retrieve user profile from localStorage
const getUserProfile = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const Navbar = () => {
  const [user, setUser] = useState(getUserProfile());
  const [credits, setCredits] = useState(user?.credits ?? 0); // ✅ Track credits separately

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = getUserProfile();
      console.log("Storage change detected, updating navbar...", updatedUser); // ✅ Debugging log

      setUser(updatedUser);
      setCredits(updatedUser?.credits ?? 0); // ✅ Update credits
    };

    window.addEventListener("storage", handleStorageChange);

    // ✅ Polling every second to detect changes (React doesn't auto-detect localStorage updates)
    const interval = setInterval(() => {
      const updatedUser = getUserProfile();
      if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
        console.log("Detected user change, updating navbar...", updatedUser);
        setUser(updatedUser);
        setCredits(updatedUser?.credits ?? 0); // ✅ Update credits
      }
    }, 500); // Check every half second (adjust if needed)

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval); // ✅ Cleanup interval when unmounting
    };
  }, [user]);

  return (
    <nav className="bg-white shadow-md w-full fixed z-1000 pt-5 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Left Menu */}
        <div className="flex space-x-6">
          <Link to="/listings" className="text-black hover:text-blue-600">
            Listings
          </Link>
          <Link to="/about" className="text-black hover:text-blue-600">
            About HeartBids
          </Link>
          <Link to="/charities" className="text-black hover:text-blue-600">
            Charities
          </Link>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Link to="/" className="text-black hover:text-blue-600">
            <img
              src="/images/logo/HeartBids.png"
              alt="HeartBids Logo"
              className="h-30 mt-5"
            />
          </Link>
        </div>

        {/* Right Side - Login or Profile */}
        <div className="flex space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar?.url || "https://placehold.co/40"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <Link to="/profile" className="text-black font-semibold hover:text-blue-600">
                  {user.name}
                </Link>
              </div>

              {/* ✅ Display updated user credits */}
              <span className="bg-gray-200 px-3 py-1 rounded-lg">
                💰 {credits} Credits
              </span>

              {/* ✅ Logout Button */}
              <button
                onClick={() => {
                  HandleLogout();
                  localStorage.removeItem("user"); // ✅ Clear localStorage on logout
                  setUser(null);
                  setCredits(0);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="text-black hover:text-blue-600">
                Log In
              </Link>
              <Link
                to="/auth/Register"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Sign up to HeartBids
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
