import { createContext, useState, useEffect } from "react";
import { refreshToken } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() => localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (tokens) {
      const interval = setInterval(() => {
        refreshToken(tokens.refresh)
          .then(res => setTokens(res.data))
          .catch(() => logout());
      }, 1000 * 60 * 4); // cada 4 min
      return () => clearInterval(interval);
    }
  }, [tokens]);

  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
  };

  return (
    <AuthContext.Provider value={{ tokens, setTokens, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
