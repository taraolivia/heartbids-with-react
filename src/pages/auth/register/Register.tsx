import React, { useState } from "react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with actual registration logic (e.g., API call)
    console.log("Registering with", { name, email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-green-200 to-green-50 items-center justify-center">
        <img
          src="/path-to-image.jpg" // Replace with your image path
          alt="Yarn and Knitting Needles"
          className="object-cover h-full"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <h1 className="text-4xl font-bold text-green-900">Welcome to HeartBids</h1>
        <p className="mt-4 text-gray-600">
          Log in to HeartBids to place bids, list items, and choose a charity to support
          with your winning auctions.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              First & Last Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="i.e. Davon Lean"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="i.e. davon@mail.com"
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

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </div>

          {/* Log In Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
