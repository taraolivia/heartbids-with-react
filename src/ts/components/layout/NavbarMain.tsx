import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HandleLogout from "../../utilities/HandleLogout";
import { HeartBidsFilterToggle } from "../../utilities/HeartBidsFilterToggle";
import getUserProfile from "../../utilities/getUserProfile";

const Navbar = () => {
  interface User {
    name: string;
    avatar?: { url: string };
    credits: number;
  }

  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const logout = HandleLogout();



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

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#user-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-black hover:text-blue-600";

  return (
    <div className="group w-full fixed z-50 font-serif">
      <nav className="navbar font-serif bg-background-50  w-full fixed z-40 text-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 z-50">
          <div className="flex items-center justify-between h-25 relative z-50">
            <button
              className="md:hidden justify-self-start text-left  text-3xl focus:outline-none flex-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>

            <div className="hidden md:flex space-x-6 flex-1 text-md w-full">
              <Link to="/listings" className={getLinkClass("/listings")}>
                Listings
              </Link>
              <Link to="/about" className={getLinkClass("/about")}>
                About
              </Link>
              <Link to="/charities" className={getLinkClass("/charities")}>
                Charities
              </Link>
            </div>

            <div className="flex justify-center relative z-50 flex-1 w-full">
              <Link to="/" className={getLinkClass("/")}>
                <img
                  src="/HeartBids.png"
                  alt="HeartBids Logo"
                  className="h-25 md:h-40 md:mt-18 z-50 relative"
                />
              </Link>
            </div>

            <div className="flex space-x-4 flex-1 justify-end">
              {user ? (
                <div className="relative">
                  <button
                    id="user-dropdown"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none hover:cursor-pointer"
                  >
                    <img
                      src={user.avatar?.url || "/default-avatar.png"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full aspect-square object-cover"
                    />
                    <span className="font-medium hidden md:inline">
                      {user.name}
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-4 w-48 bg-white border-amber-100 rounded-lg shadow-lg z-[100]">
                      <div className="px-4 py-2 text-gray-700">
                        💰 {credits} Credits
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-end gap-3 text-sm">
                    <Link
                      to="/auth/login"
                      className={getLinkClass("/auth/login")}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/auth/register"
                      className="bg-secondary-500 text-white px-3 py-1 rounded-lg hover:bg-secondary-600"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full top-20 left-0 bg-background-50/90 backdrop-blur-md shadow-md">
            <div className="flex flex-col items-left space-y-8 px-5 py-30">
              <Link
                to="/listings"
                className="text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Listings
              </Link>
              <Link
                to="/about"
                className="text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                About HeartBids
              </Link>
              <Link
                to="/charities"
                className="text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Charities
              </Link>
              <HeartBidsFilterToggle />
            </div>
          </div>
        )}

        <div className="pb-4 pt-6 absolute w-full top-24 left-0 bg-background-50/20 backdrop-blur-xs transition duration-300 group-hover:bg-background-50 z-0 hidden md:flex">
          <div className="max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex justify-start">
            <HeartBidsFilterToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
