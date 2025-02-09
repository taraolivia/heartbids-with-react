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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        
{/* Profile Banner */}
{user.banner?.url && (
  <div className="relative">
    {/* Banner Image */}
    <img
      src={user.banner.url}
      alt={user.banner.alt || "User Banner"}
      className="w-full h-full object-cover"
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    {/* Profile Header */}
    <div
      className="absolute bottom-0 left-0 w-full flex items-center space-x-6 p-6 bg-green-100/50 backdrop-blur-sm text-black"
    >
      <img
        src={
          user.avatar?.url ||
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        }
        alt={user.avatar?.alt || "User Avatar"}
        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
      />
      <div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p>{user.bio || "No bio available."}</p>
      </div>
    </div>
  </div>
)}

        {/* Profile Stats */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 bg-gray-100 text-center p-4">
          <div>
            <span className="text-xl font-semibold text-gray-900">💰 {user.credits}</span>
            <p className="text-gray-500">Credits</p>
          </div>
          <div>
            <span className="text-xl font-semibold text-gray-900">📦 {user._count?.listings || 0}</span>
            <p className="text-gray-500">Listings</p>
          </div>
        </div>
  
        {/* User Listings Section */}
        <div className="px-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
          <p className="text-gray-600 mb-4">Auctions you have created.</p>
  
          {/* TODO: Fetch and display user listings */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-500">No listings yet. Start selling today!</p>
            <Link
              to="/create-listing"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create a Listing
            </Link>
          </div>
        </div>
  

  
        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={HandleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default Profile;
