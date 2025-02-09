import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getUserProfile from "./getUserProfile";
import HandleLogout from "../auth/HandleLogout";

type UserProfile = {
  name: string;
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  credits: number;
  _count?: { listings?: number };
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUser(profile);
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar?.url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
            alt={user.avatar?.alt || "User Avatar"}
            className="w-24 h-24 rounded-full border border-gray-300"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.bio || "No bio available."}</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="mt-6 bg-gray-200 p-4 rounded-lg flex justify-between">
          <span className="text-lg font-semibold">💰 {user.credits} Credits</span>
          <span className="text-lg font-semibold">📦 {user._count?.listings || 0} Listings</span>
        </div>

        {/* Profile Banner */}
        {user.banner?.url && (
          <div className="mt-6">
            <img
              src={user.banner.url}
              alt={user.banner.alt || "User Banner"}
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* User Listings Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
          <p className="text-gray-600">Auctions you have created.</p>

          {/* TODO: Fetch and display user listings */}
          <div className="mt-4">
            <p className="text-gray-500">No listings yet. Start selling today!</p>
            <Link to="/create-listing" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Create a Listing
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={HandleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
