import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavbarMain";
import Hero from "./components/Hero";
import PopularLots from "./components/PopularLots";
import GeneralInfo from "./components/GeneralInfo";
import About from "./pages/about";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PopularLots />
              <GeneralInfo />
            </>
          }
        />
  <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;
