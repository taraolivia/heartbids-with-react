import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full fixed z-1000 pt-5 pb-5 ">
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
            src="public\images\logo\HeartBids.png"
            alt="HeartBids Logo"
            className="h-30 mt-5"
          />
        </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex space-x-4">
          <Link to="/auth/login" className="text-black hover:text-blue-600">
            Log In
          </Link>
          <Link
            to="/auth/Register"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Sign up to HeartBids
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
