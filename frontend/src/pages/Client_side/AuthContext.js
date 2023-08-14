// AuthContext.js

import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token") || null
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("user_role") || null
  );
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password,
      });

      const { access, refresh, role, user_username, user_email } = response.data;

      setAccessToken(access);
      setRefreshToken(refresh);
      setUserRole(role);

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user_role", role);
      localStorage.setItem("user_username", user_username);
      localStorage.setItem("user_email", user_email);

      

      navigateBasedOnRole(role);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserRole(null);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_email");

    navigate("/login");
  };

  const navigateBasedOnRole = (role) => {
    if (role === "admin") {
      navigate("/Admin/DashBoard");
    } else if (role === "staff") {
      navigate("/Professional/home");
    } else {
      navigate("/home");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userRole,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
