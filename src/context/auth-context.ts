import { createContext } from "react";
import { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  addLikedArticle: () => {},
});
