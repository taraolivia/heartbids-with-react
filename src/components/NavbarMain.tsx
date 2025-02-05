import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cream shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left Menu */}
        <div className="flex space-x-6">
          <Link to="/listings" className="font-bold text-black hover:text-blue-600">
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
          <img
            src="https://via.placeholder.com/100x100" // Replace with actual logo
            alt="HeartBids Logo"
            className="h-10 object-contain"
          />
        </div>

        {/* Right Buttons */}
        <div className="flex space-x-4">
          <button className="text-black hover:text-blue-600">Log In</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Sign up to HeartBids
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
