import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const HandleLogout = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  if (!userContext) {
    console.error("UserContext is not available");
    return;
  }

  const { setUser } = userContext; // ✅ Get setUser from context

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // ✅ Reset user globally
    navigate("/"); // ✅ Redirect to home

    setTimeout(() => {
      window.location.reload(); // ✅ Ensures full refresh
    }, 100);
  };

  return logout; // ✅ Returns function that can be used anywhere
};

export default HandleLogout;
