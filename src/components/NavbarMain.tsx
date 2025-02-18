import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HandleLogout from "../pages/auth/HandleLogout";
import { useHeartBidsFilter } from "../components/useHeartBidsFilter";
import { HeartBidsFilterToggle } from "../components/HeartBidsFilterToggle";
import getUserProfile from "../pages/profile/getUserProfile";

const Navbar = () => {
  interface User {
    name: string;
    avatar?: { url: string };
    credits: number;
  }

  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const logout = HandleLogout();

  const { showOnlyHeartBids } = useHeartBidsFilter();
  console.log("Filtering listings by HeartBids:", showOnlyHeartBids);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getUserProfile();
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#user-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const getLinkClass = (path: string) => (location.pathname === path ? "text-blue-600 font-semibold" : "text-black hover:text-blue-600");

  return (
    <nav className="bg-white shadow-md w-full fixed z-50 pt-3 pb-3">
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
              <img src="/images/logo/HeartBids(1).png" alt="HeartBids Logo" className="h-12" />
            </Link>
          </div>

          {/* Right Side - Login or Profile */}
          <div className="flex space-x-4">
            {user ? (
              <div className="relative">
                {/* ✅ Avatar & Dropdown Button */}
                <button id="user-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                  <img src={user.avatar?.url || "https://placehold.co/40"} alt={user.name} className="w-10 h-10 rounded-full" />
                  <span className="font-medium">{user.name}</span>
                  <svg className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ✅ Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <div className="px-4 py-2 text-gray-700">💰 {credits} Credits</div>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                      View Profile
                    </Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/auth/login" className={getLinkClass("/auth/login")}>
                  Log In
                </Link>
                <Link to="/auth/register" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
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
