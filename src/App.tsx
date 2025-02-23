import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./pages/profile/UserProvider";
import Navbar from "./components/NavbarMain";
import Hero from "./components/Hero";
import GeneralInfo from "./components/GeneralInfo";
import Footer from "./components/Footer";
import About from "./pages/About";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import AuthPrompt from "./components/AuthPrompt";
import HowItWorks from "./components/HowItWorks";
import CharitiesCloud from "./components/CharitiesCloud";
import Testimonials from "./components/Testimonials";
import Listings from "./pages/Listings";
import Profile from "./pages/profile/Profile";
import CreateListingPage from "./pages/listing/create/CreateListing";
import SingleListing from "./pages/listing/SingleListing";
import MostPopularListings from "./components/MostPopularListings";
import UserProfilePage from "./pages/profile/OtherUserProfile";
import { HeartBidsFilterProvider } from "./components/HeartBidsFilterProvider";
import EditListingWrapper from "./pages/listing/edit/EditListingWrapper";
import EditProfile from "./pages/profile/EditProfile";
import Charities from "./pages/Charities";
import { ListingsProvider } from "./components/ListingsProvider";

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
    <UserProvider>
      <HeartBidsFilterProvider>
        <ListingsProvider> 
          <Router>
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
  );
  
}

export default App;
