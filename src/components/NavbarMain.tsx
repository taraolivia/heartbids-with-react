import { Link } from "react-router-dom";
import HandleLogout from "../pages/auth/HandleLogout";


// ✅ Retrieves user data from localStorage
const getUserProfile = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  return JSON.parse(storedUser);
};

const user = getUserProfile(); // ✅ Directly read from localStorage without useState

const Navbar = () => {
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
            // ✅ If user is logged in, show profile & credits
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

              {/* ✅ Display user credits */}
              <span className="bg-gray-200 px-3 py-1 rounded-lg">
                💰 {user.credits ?? 0} Credits
              </span>

              {/* ✅ Logout Button */}
              <button
                onClick={HandleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            // ✅ If user is NOT logged in, show login/signup buttons
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
