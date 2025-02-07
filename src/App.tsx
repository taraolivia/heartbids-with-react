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

      </Routes>
    </Router>
  );
}

export default App;
