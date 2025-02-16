import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HandleLogout from "../pages/auth/HandleLogout";
import { useHeartBidsFilter } from "../components/useHeartBidsFilter"; // ✅ Import the hook
import { HeartBidsFilterToggle } from "../components/HeartBidsFilterToggle"; // ✅ Import the component
import getUserProfile from "../pages/profile/getUserProfile"; // ✅ Correct import

const Navbar = () => {
  interface User {
    name: string;
    avatar?: { url: string };
    credits: number;
  }
  
  const [user, setUser] = useState<User | null>(null);
    const [credits, setCredits] = useState<number>(0);
  const location = useLocation();

  // ✅ Get the global HeartBids filter state
  const { showOnlyHeartBids } = useHeartBidsFilter();
  console.log("Filtering listings by HeartBids:", showOnlyHeartBids);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getUserProfile(); // ✅ Await profile data
        if (profile) {
          setUser(profile);
          setCredits(profile.credits ?? 0);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();

    const handleStorageChange = () => {
      fetchUser();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Function to determine active link styling
  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-black hover:text-blue-600";

      return (
        <nav className="bg-white shadow-md w-full fixed z-1000 pt-3 pb-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ✅ First Row: Logo & Navigation */}
            <div className="flex items-center justify-between h-16">
              {/* Left Menu */}
              <div className="flex space-x-6">
                <Link to="/listings" className={getLinkClass("/listings")}>
                  Listings
                </Link>
                <Link to="/about" className={getLinkClass("/about")}>
                  About HeartBids
                </Link>
                <Link to="/charities" className={getLinkClass("/charities")}>
                  Charities
                </Link>
              </div>
      
              {/* Center Logo */}
              <div className="flex justify-center flex-1">
                <Link to="/" className={getLinkClass("/")}>
                  <img
                    src="/images/logo/HeartBids(1).png"
                    alt="HeartBids Logo"
                    className="h-12" // ✅ Adjusted height for better layout
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
                      <Link to="/profile" className={getLinkClass("/profile")}>
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
                        localStorage.removeItem("user");
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
                    <Link to="/auth/login" className={getLinkClass("/auth/login")}>
                      Log In
                    </Link>
                    <Link
                      to="/auth/register"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Sign up to HeartBids
                    </Link>
                  </>
                )}
              </div>
            </div>
      
            {/* ✅ Second Row: HeartBids Filter (Centered) */}
            <div className="flex justify-center mt-2">
              <HeartBidsFilterToggle />
            </div>
          </div>
        </nav>
      );
      
};

export default Navbar;
