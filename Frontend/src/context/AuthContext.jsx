import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  // Auto-refresh token if it’s about to expire
  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUser(decoded);

        const currentTime = Date.now() / 1000; // Convert to seconds
        const timeUntilExpiry = decoded.exp - currentTime;

        if (timeUntilExpiry < 300) { // Refresh if less than 5 minutes remaining
          refreshAccessToken();
        } else {
          // Schedule refresh 5 minutes before expiry
          const refreshTimeout = setTimeout(refreshAccessToken, (timeUntilExpiry - 300) * 1000);
          return () => clearTimeout(refreshTimeout);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    }
    // setIsLoading(false);
  }, [accessToken]);


  // Login function
  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
    const decoded = jwtDecode(accessToken);
    setUser(decoded);
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:7001/api/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Refresh token function
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://localhost:7001/api/users/refresh", {}, { withCredentials: true });

      const newAccessToken = response.data.accessToken;
      if (!newAccessToken) throw new Error("No new access token received");

      // Store new token
      localStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken);

      const decoded = jwtDecode(newAccessToken);
      setUser(decoded);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      logout(); // Logout if refresh fails
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user,login, logout, refreshAccessToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
