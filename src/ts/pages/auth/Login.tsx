import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleLogin from "../../utilities/HandleLogin";
import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅ For redirecting after login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // ✅ Clear previous errors

    try {
      await HandleLogin(email, password); // ✅ Calls the login function correctly

      navigate("/"); // ✅ Redirect after login
      window.location.reload(); // ✅ Reload to update navbar
    } catch (err) {
      // ✅ Typecast 'err' to properly extract the error message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className=" bg-gradient-to-t from-primary-200 to-background-50 ">
      <div className="max-w-7xl mt-20 flex flex-wrap-reverse m-auto ">
        {/* Left Section: Image */}
        <div className="md:flex md:w-1/2 max-w-5xl items-center justify-center mt-10">
          <img src="/images/yarn.jpg" alt="Yarn and Knitting Needles" className="object-cover" />
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1 className="text-4xl font-bold text-primary-700">Welcome back</h1>
          <p className="mt-4 text-gray-600">Log in to HeartBids to place bids, list items, and choose a charity to support with your winning auctions.</p>

          {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Input */}
            <div>
              <label className="text-gray-900">Email address</label>
              <input id="email" name="email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-gray-900">Password (8+ characters)</label>
              <input id="password" name="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
            </div>

            {/* Login Button */}
            <div>
              <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-3 rounded-2xl shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                Log in
              </button>
            </div>

            {/* Create Account Link */}
            <p className="text-left text-base text-gray-500">
              Don’t have an account?{" "}
              <Link to="/auth/register" className="text-secondary-600 hover:underline">
                Create free account
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
