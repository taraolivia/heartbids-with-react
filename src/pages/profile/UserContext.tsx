import { createContext } from "react";

export interface User {
  name: string;
  avatar?: { url: string };
  credits: number;
  email: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
