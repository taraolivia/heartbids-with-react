import { Link } from "react-router-dom";
import { useUser } from "../../utilities/useUser";

interface AuthPromptProps {
  loginPath?: string;
  signupPath?: string;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ loginPath = "/auth/login", signupPath = "/auth/register" }) => {

    const { user } = useUser();
  
    if (user) {
      return null; 
    }
  

  return (
    <div className="flex flex-col items-center text-center py-12 rounded-lg">
      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-800">Log in or Sign up to HeartBids</h2>

      {/* Subheading */}
      <p className="text-gray-600 mt-2">
        Join with <span className="font-bold">4600+ Bidders</span> and start giving to charity right now
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <Link to={loginPath} className="px-6 py-3 rounded-lg bg-white text-secondary-600 border border-secondary-600 font-semibold shadow-md hover:bg-gray-100">
          Log In
        </Link>
        <Link to={signupPath} className="px-6 py-3 rounded-lg bg-secondary-600 text-white font-semibold shadow-md hover:bg-secondary-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default AuthPrompt;
