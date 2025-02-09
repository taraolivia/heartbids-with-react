import { createContext } from "react";

interface User {
  name: string;
  avatar?: { url: string };
  credits: number;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
