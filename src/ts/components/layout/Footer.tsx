import { Link } from "react-router-dom";
import HandleLogout from "../../utilities/HandleLogout";

const getUserProfile = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  return JSON.parse(storedUser);
};

const user = getUserProfile(); 

const Footer: React.FC = () => {
  const logout = HandleLogout(); 

  return (
    <footer className="font-serif ">
      {/* Top Section: Logo, Quote, CTA */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <img src="/HeartBids.png" alt="HeartBids Logo" className="w-40 mx-auto md:mx-0" />
          </div>

          {/* Quote */}
          <div className="text-center mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">Find Unique Auctions & Place Your Bids!</h2>
          </div>

          {/* CTA Button */}
          <div>
            <a href="/listings" className="inline-block bg-accent-400 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:bg-accent-500 transition">
              Browse Listings
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-8 m-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 m-auto">
          <div className="flex flex-row flex-wrap m-auto justify-evenly gap-5">
            {/* About Section */}
            <div className="flex flex-col text-left lg:w-1/3 lg:min-w-96 ">
              <div className="flex flex-col self-center text-left">
                <p className="text-base text-gray-900 max-w-92">HeartBids is an auction platform designed to facilitate meaningful contributions to charitable causes. By auctioning items, services, and craftsmanship, users support organizations that rely on community-driven funding.</p>
              </div>
            </div>

            {/* Company Section */}
            <div className="flex flex-col xl:text-left text-center  min-w-42">
              <div className="flex flex-col self-center xl:text-left text-center">
                <h3 className="text-lg font-semibold text-gray-900 xl:text-left text-center">Company</h3>
                <ul className="mt-4 space-y-2 xl:items-center self-center">
                  <li>
                    <Link to="/about" className="text-sm text-gray-900 hover:text-gray-900">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/charities" className="text-sm text-gray-900 hover:text-gray-900">
                      Charities
                    </Link>
                  </li>
                  <li>
                    <Link to="/listings" className="text-sm text-gray-900 hover:text-gray-900">
                      Auction Listings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help Section */}
            <div className="flex flex-col xl:text-left text-center  min-w-42">
              <div className="flex flex-col self-center xl:text-left text-center">
                <h3 className="text-lg font-semibold text-gray-900">Help</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-sm text-gray-900 hover:text-gray-900">
                      Customer Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-900 hover:text-gray-900">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-900 hover:text-gray-900">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* ✅ Account Section (Profile or Log In/Register) */}
            <div className="flex flex-col xl:text-left text-center  min-w-42">
              <div className="flex flex-col self-center text-left">
                <h3 className="text-lg font-semibold text-gray-900">Account</h3>
                <ul className="mt-4 space-y-2">
                  {user ? (
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-wrap justify-center items-center gap-3">
                      <img src={user.avatar?.url || "/default-avatar.png"} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                      <span className="text-sm text-gray-900 font-semibold">{user.name}</span>
                      </div>
                      <Link to="/profile" className="text-sm text-blue-600 hover:underline">
                        View Profile
                      </Link>
                      <button onClick={logout} className="text-sm text-red-600 hover:underline text-left">
                      Logout
                    </button>
                    </div>
                  ) : (
                    <>
                      <li>
                        <a href="/auth/login/" className="text-sm text-gray-900 hover:text-gray-900">
                          Log In
                        </a>
                      </li>
                      <li>
                        <a href="/auth/register/" className="text-sm text-gray-900 hover:text-gray-900">
                          Register
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
