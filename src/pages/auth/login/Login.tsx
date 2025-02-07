import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your actual login logic (e.g., API call)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-green-200 to-green-50 items-center justify-center">
        <img
          src="/path-to-image.jpg"
          alt="Yarn and Knitting Needles"
          className="object-cover h-full"
        />
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <h1 className="text-4xl font-bold text-green-900">Welcome back</h1>
        <p className="mt-4 text-gray-600">
          Log in to HeartBids to place bids, list items, and choose a charity to
          support with your winning auctions.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </div>

          {/* Create Account Link */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Create free account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
