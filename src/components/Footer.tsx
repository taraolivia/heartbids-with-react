import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Top Section: Logo, Quote, CTA */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <img
              src="/path-to-logo.png"
              alt="HeartBids Logo"
              className="w-24 mx-auto md:mx-0"
            />
          </div>

          {/* Quote */}
          <div className="text-center mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">
              Find Unique Auctions & Place Your Bids!
            </h2>
          </div>

          {/* CTA Button */}
          <div>
            <a
              href="/browse-listings"
              className="inline-block bg-pink-600 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition"
            >
              Browse Listings
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">About HeartBids</h3>
              <p className="text-sm text-gray-600">
                HeartBids is an auction platform designed to facilitate meaningful
                contributions to charitable causes. By auctioning items, services, and
                craftsmanship, users support organizations that rely on
                community-driven funding.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Charities
                  </a>
                </li>
                <li>
                  <a href="/Listings" className="text-sm text-gray-600 hover:text-gray-900">
                    Auction Listings
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Help</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Account Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Account</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/auth/login/" className="text-sm text-gray-600 hover:text-gray-900">
                    Log In
                  </a>
                </li>
                <li>
                  <a href="/auth/register/" className="text-sm text-gray-600 hover:text-gray-900">
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
