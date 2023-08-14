import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create a new context
const AuthContext = createContext();

// Create a provider component to manage authentication state
const AuthProvider = ({ children }) => {
  // State to store authentication data
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token") || null
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("user_role") || null
  );
  const [name, setName] = useState(localStorage.getItem("user_name") || null);
  const [email, setEmail] = useState(localStorage.getItem("user_email") || null);

  // Access the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password,
      });

      const { access, refresh, role, user_username, user_email } = response.data;

      // Update the state with authentication data
      setAccessToken(access);
      setRefreshToken(refresh);
      setUserRole(role);
      setName(user_username);
      setEmail(user_email);

      // Store the authentication data in local storage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user_role", role);
      localStorage.setItem("user_username", user_username);
      localStorage.setItem("user_email", user_email);

     // Console log the authentication details
      console.log("Access Token:", access);
      console.log("Refresh Token:", refresh);
      console.log("User Role:", role);
      console.log("User Username:", user_username);
      console.log("User Email:", user_email);


      

      // Redirect to the appropriate page based on the user's role
      if (role === "admin") {
        navigate("/Admin/DashBoard");
      } else if (role === "staff") {
        navigate("/Professional/home");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserRole(null);
    setName(null);
    setEmail(null);

    // Remove authentication data from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_email");

    // Redirect to the login page
    navigate("/");
  };

  // Provide the authentication data and functions to child components
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userRole,
        handleLogin,
        handleLogout,
        name,
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the authentication data and functions
const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
