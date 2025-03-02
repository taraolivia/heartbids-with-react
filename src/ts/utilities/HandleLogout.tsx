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

  const { setUser } = userContext;

  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);
    navigate("/");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return logout;
};

export default HandleLogout;
