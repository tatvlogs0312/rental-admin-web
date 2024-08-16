import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(localStorage.getItem("user"));

  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    return <Navigate to={"/login"} />;
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
