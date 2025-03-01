import { createContext } from "react";
import { Charity } from "./AllCharities";

export interface User {
  name: string;
  email: string;
  bio?: string; // ✅ Add bio
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string }; // ✅ Add banner
  credits: number;
  _count?: { listings?: number; wins?: number }; // ✅ Add _count to match UserProfile
  selectedCharity?: Charity;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  updateCharity: (charity: Charity) => void; // ✅ Add updateCharity function
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
