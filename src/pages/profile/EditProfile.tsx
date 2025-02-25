import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUserProfile from "../../components/utilities/getUserProfile";
import { API_PROFILE } from "../../ts/constants";
import { getHeaders } from "../../ts/headers";

type ProfileData = {
  bio: string;
  avatarUrl: string;
  avatarAlt: string;
  bannerUrl: string;
  bannerAlt: string;
};

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
  });

  const [originalData, setOriginalData] = useState<ProfileData>({
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
  });

  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const isFormChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (!profile) throw new Error("Failed to fetch user profile");

        setUsername(profile.name); 

        setOriginalData({
          bio: profile.bio || "",
          avatarUrl: profile.avatar?.url || "",
          avatarAlt: profile.avatar?.alt || "Profile Avatar",
          bannerUrl: profile.banner?.url || "",
          bannerAlt: profile.banner?.alt || "Profile Banner",
        });

        setFormData({
          bio: profile.bio || "",
          avatarUrl: profile.avatar?.url || "",
          avatarAlt: profile.avatar?.alt || "Profile Avatar",
          bannerUrl: profile.banner?.url || "",
          bannerAlt: profile.banner?.alt || "Profile Banner",
        });
      } catch (error) {
        console.error("❌ Profile fetch error:", error);
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError("Username not found. Please try again.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    const updateData: Partial<{ bio: string; avatar: { url: string; alt: string }; banner: { url: string; alt: string } }> = {};
    if (formData.bio !== originalData.bio) updateData.bio = formData.bio.trim();
    if (formData.avatarUrl !== originalData.avatarUrl) {
      updateData.avatar = { url: formData.avatarUrl.trim(), alt: formData.avatarAlt.trim() || "User Avatar" };
    }
    if (formData.bannerUrl !== originalData.bannerUrl) {
      updateData.banner = { url: formData.bannerUrl.trim(), alt: formData.bannerAlt.trim() || "Profile Banner" };
    }
  
    try {
      const response = await fetch(`${API_PROFILE}/${username}`, {
        method: "PUT",
        headers: getHeaders(), 
        body: JSON.stringify(updateData),
      });
  
      const result = await response.json();

  
      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile.");
      }
  
      setSuccess(true);
      navigate("/profile"); 
    } catch (error) {
      console.error("❌ Update error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Edit Profile</h2>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        {success && <p className="text-green-600 text-center mt-2">Profile updated successfully!</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." maxLength={160} className="w-full p-2 border rounded-lg" />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
            <input type="url" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="Enter a public image URL" className="w-full p-2 border rounded-lg" />
          </div>

          {/* Avatar Alt */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar Alt Text</label>
            <input type="text" name="avatarAlt" value={formData.avatarAlt} onChange={handleChange} placeholder="Describe your avatar" className="w-full p-2 border rounded-lg" />
          </div>

          {/* Banner URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Banner URL</label>
            <input type="url" name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} placeholder="Enter a public image URL" className="w-full p-2 border rounded-lg" />
          </div>

          {/* Banner Alt */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Banner Alt Text</label>
            <input type="text" name="bannerAlt" value={formData.bannerAlt} onChange={handleChange} placeholder="Describe your banner" className="w-full p-2 border rounded-lg" />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={!isFormChanged || loading} 
            className={`w-full font-semibold py-3 rounded-lg shadow-md 
    ${!isFormChanged ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2"}`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {/* Cancel Button */}
          <button type="button" onClick={() => navigate("/profile")} className="w-full bg-gray-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none">
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
};

export default EditProfile;
