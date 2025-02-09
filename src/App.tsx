import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarMain";
import Hero from "./components/Hero";
import PopularLots from "./components/PopularLots";
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PopularLots />
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

        {/* Login Page */}
        <Route path="/auth/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/auth/register" element={<Register />} />

        {/* All listings Page */}
        <Route path="/Listings" element={<Listings />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/listing/create" element={<CreateListingPage />} /> {/* ✅ Add this line */}


      </Routes>
    </Router>
  );
}

export default App;
