import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleRegister from "../../utilities/HandleRegister";
import HandleLogin from "../../utilities/HandleLogin";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked, // ✅ Ensure checkbox updates properly
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await HandleRegister({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim(),
        bio: formData.bio.trim() || undefined,
        avatar: formData.avatarUrl.trim()
          ? { url: formData.avatarUrl.trim(), alt: formData.avatarAlt.trim() || "User Avatar" }
          : undefined,
        banner: formData.bannerUrl.trim()
          ? { url: formData.bannerUrl.trim(), alt: formData.bannerAlt.trim() || "User Banner" }
          : undefined,
        venueManager: formData.venueManager,
      });

      console.log("Registered Successfully:", userData);

      // ✅ Auto-login after registration
      await HandleLogin(formData.email, formData.password);
      navigate("/");
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-green-200 to-green-50 items-center justify-center">
        <img
          src="/path-to-image.jpg" // Replace with your actual image path
          alt="Yarn and Knitting Needles"
          className="object-cover h-full"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <h1 className="text-4xl font-bold text-green-900">Welcome to HeartBids</h1>
        <p className="mt-4 text-gray-600">
          Create an account to start bidding, listing items, and supporting charities.
        </p>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username (Only letters, numbers, and _)</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="i.e. Davon_Lean"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email (must be @stud.noroff.no)</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="i.e. davon@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password (8+ characters)</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio (Optional, max 160 chars)</label>
            <textarea
              name="bio"
              placeholder="Tell us something about yourself!"
              value={formData.bio}
              onChange={handleChange}
              maxLength={160}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar URL (Optional)</label>
            <input
              type="text"
              name="avatarUrl"
              placeholder="https://your-avatar.com/image.jpg"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Avatar Alt */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar Alt Text</label>
            <input
              type="text"
              name="avatarAlt"
              placeholder="Describe your avatar"
              value={formData.avatarAlt}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Banner URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Banner URL (Optional)</label>
            <input
              type="text"
              name="bannerUrl"
              placeholder="https://your-banner.com/image.jpg"
              value={formData.bannerUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Banner Alt */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Banner Alt Text</label>
            <input
              type="text"
              name="bannerAlt"
              placeholder="Describe your banner"
              value={formData.bannerAlt}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Venue Manager */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="venueManager"
              checked={formData.venueManager}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">I am a Venue Manager (Optional)</label>
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
