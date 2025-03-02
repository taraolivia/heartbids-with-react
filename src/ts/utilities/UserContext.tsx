import { createContext } from "react";
import { Charity } from "./AllCharities";

export interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
  credits: number;
  _count?: { listings?: number; wins?: number };
  selectedCharity?: Charity;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  updateCharity: (charity: Charity) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);
