import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleRegister from "../../utilities/HandleRegister";
import HandleLogin from "../../utilities/HandleLogin";
import CharitySelector from "../../components/ui/CharitySelector";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Charity } from "../../utilities/AllCharities";
import { Link } from "react-router-dom";
import FAQ from "../../components/layout/FAQ";
import GeneralInfo from "../../components/layout/GeneralInfo";
import Footer from "../../components/layout/Footer";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    bio: string;
    avatarUrl: string;
    avatarAlt: string;
    bannerUrl: string;
    bannerAlt: string;
    venueManager: boolean;
    selectedCharity: Charity | null;
  }>({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
    selectedCharity: null, // ✅ Now TypeScript recognizes that it can be null
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

  const handleSelectCharity = (charity: Charity | null) => {
    setFormData({ ...formData, selectedCharity: charity });
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
        avatar: formData.avatarUrl.trim() ? { url: formData.avatarUrl.trim(), alt: formData.avatarAlt.trim() || "User Avatar" } : undefined,
        banner: formData.bannerUrl.trim() ? { url: formData.bannerUrl.trim(), alt: formData.bannerAlt.trim() || "User Banner" } : undefined,
        venueManager: formData.venueManager,
      });

      console.log("Registered Successfully:", userData);

      // ✅ Save selected charity in Firestore
      const userRef = doc(db, "users", formData.email);
      await setDoc(userRef, { selectedCharity: formData.selectedCharity }, { merge: true });

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
    <div className="min-h-screen mt-20">
      <h1 className="text-4xl text-center font-bold text-primary-700">Welcome to HeartBids</h1>
      <div className="flex bg-gradient-to-t from-background-50 via-primary-200 to-background-50">
        <div className="max-w-7xl flex flex-wrap-reverse m-auto">
          {/* Left Section: Image */}
          <div className="md:flex flex-col md:w-1/2 max-w-md mt-5   justify-start gap-4">
            <p className="mt-4 text-right text-gray-600 text-lg">Create an account to start bidding, listing items, and support charities.</p>
            {/* Create Account Link */}
            <p className="mt-4 text-right text-gray-600 text-base">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-secondary-600 hover:underline">
  Log in
</Link>
            </p>
            <img src="/images/letter.jpg" alt="Yarn and Knitting Needles" className="object-cover" />
          </div>

          {/* Right Section: Registration Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="my-8 space-y-8 text-base">
              {/* Username */}
              <div>
                <label className="block text-gray-900">Username (Only letters, numbers, and _)</label>
                <input id="name" name="name" type="text" placeholder="i.e. Heart_Bids" value={formData.name} onChange={handleChange} required className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* Email */}
              <div>
                <label className="  text-gray-900">Email (must be @stud.noroff.no)</label>
                <input id="email" name="email" type="email" placeholder="i.e. heart@stud.noroff.no" value={formData.email} onChange={handleChange} required className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* Password */}
              <div>
                <label className="  text-gray-900">Password (8+ characters)</label>
                <input id="password" name="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} required className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* Bio */}
              <div>
                <label className="  text-gray-900">Bio (Max 160 characters)</label>
                <textarea name="bio" placeholder="Tell us something about yourself!" value={formData.bio} onChange={handleChange} maxLength={160} className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* Avatar URL */}
              <div>
                <label className=" font-medium text-gray-900">Avatar URL</label>
                <input type="text" name="avatarUrl" placeholder="https://your-avatar.com/image.jpg" value={formData.avatarUrl} onChange={handleChange} className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* Avatar Alt */}
              <div>
                <label className="  text-gray-900">Avatar Alt Text</label>
                <input type="text" name="avatarAlt" placeholder="Describe your avatar" value={formData.avatarAlt} onChange={handleChange} className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* Banner URL */}
              <div>
                <label className="  text-gray-900">Banner URL</label>
                <input type="text" name="bannerUrl" placeholder="https://your-banner.com/image.jpg" value={formData.bannerUrl} onChange={handleChange} className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* Banner Alt */}
              <div>
                <label className=" text-gray-900">Banner Alt Text</label>
                <input type="text" name="bannerAlt" placeholder="Describe your banner" value={formData.bannerAlt} onChange={handleChange} className="mt-2 p-3 w-full rounded-2xl border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
              </div>

              {/* ✅ Charity Selection */}
              <CharitySelector selectedCharity={formData.selectedCharity} onSelectCharity={handleSelectCharity} />

              {/* Venue Manager */}
              <div className="flex items-center">
                <input type="checkbox" name="venueManager" checked={formData.venueManager} onChange={handleChange} className="h-6 w-6 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500" />
                <label className="ml-2 text-base text-gray-900">I am a Venue Manager (Optional)</label>
              </div>

              {/* Register Button */}
              <div>
                <button type="submit" className="w-full bg-secondary-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
            {/* General Info Section */}
      <GeneralInfo />
            {/* FAQ Section */}
            <section className="py-12">
        <FAQ />
      </section>



      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
