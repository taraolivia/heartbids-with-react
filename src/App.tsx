import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./ts/utilities/UserProvider";
import { HeartBidsFilterProvider } from "./ts/utilities/HeartBidsFilterProvider";
import { ListingsProvider } from "./ts/utilities/ListingsProvider";
import { LoadingProvider } from "./ts/utilities/LoadingProvider";
import LoadingOverlay from "./ts/components/ui/LoadingOverlay";
import Navbar from "./ts/components/layout/NavbarMain";
import Hero from "./ts/components/layout/Hero";
import GeneralInfo from "./ts/components/layout/GeneralInfo";
import Footer from "./ts/components/layout/Footer";
import About from "./ts/pages/About";
import Login from "./ts/pages/auth/Login";
import Register from "./ts/pages/auth/Register";
import AuthPrompt from "./ts/components/layout/AuthPrompt";
import HowItWorks from "./ts/components/layout/HowItWorks";
import CharitiesCloud from "./ts/components/layout/CharitiesCloud";
import Testimonials from "./ts/components/layout/Testimonials";
import Listings from "./ts/pages/Listings";
import Profile from "./ts/pages/profile/Profile";
import CreateListingPage from "./ts/pages/listing/create/CreateListing";
import SingleListing from "./ts/pages/listing/SingleListing";
import MostPopularListings from "./ts/components/lots/MostPopularListings";
import UserProfilePage from "./ts/pages/profile/OtherUserProfile";
import EditListingWrapper from "./ts/utilities/EditListingWrapper";
import EditProfile from "./ts/pages/profile/EditProfile";
import Charities from "./ts/pages/Charities";

function App() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        setNavHeight(navbar.clientHeight);
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  return (
    <LoadingProvider> {/* Wrap the entire app with LoadingProvider */}
      <UserProvider>
        <HeartBidsFilterProvider>
          <ListingsProvider>
            <Router>
              <LoadingOverlay /> {/* Loading Animation Component */}
              <Navbar />
              {/* Dynamic Spacer to prevent overlap */}
              <div style={{ height: `${navHeight}px` }}></div>
              <Routes>
                {/* Home Page */}
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <MostPopularListings />
                      <GeneralInfo />
                      <AuthPrompt />
                      <HowItWorks />
                      <CharitiesCloud />
                      <Testimonials />
                      <Footer />
                    </>
                  }
                />

                {/* About Page */}
                <Route path="/about" element={<About />} />

                {/* Charities Page */}
                <Route path="/charities" element={<Charities />} />

                {/* Login Page */}
                <Route path="/auth/login" element={<Login />} />

                {/* Register Page */}
                <Route path="/auth/register" element={<Register />} />

                {/* All Listings Page */}
                <Route path="/Listings" element={<Listings />} />

                {/* Profile Page */}
                <Route path="/profile" element={<Profile />} />

                {/* Edit Profile Page */}
                <Route path="/profile/EditProfile" element={<EditProfile />} />

                {/* Create Listing Page */}
                <Route path="/listing/create" element={<CreateListingPage />} />

                {/* Edit Listing Page - Requires a listing ID */}
                <Route path="/listing/edit/:id" element={<EditListingWrapper />} />

                {/* Single Listing Page */}
                <Route path="/listing/:id" element={<SingleListing />} />

                {/* Other Profile Page */}
                <Route path="/profile/:username" element={<UserProfilePage />} />
              </Routes>
            </Router>
          </ListingsProvider>
        </HeartBidsFilterProvider>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
