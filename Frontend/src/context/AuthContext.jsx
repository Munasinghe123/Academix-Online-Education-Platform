import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('accessToken');
      }
    }
  }, [accessToken]);

  const login = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setAccessToken(accessToken); // Set state
    const decoded = jwtDecode(token); // Use the passed token here
    setUser(decoded);
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:7001/api/users/logout", {}, { withCredentials: true });

      localStorage.removeItem("accessToken");
      setAccessToken(null); // Ensure token is removed from state
      setUser(null);

      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`http://localhost:7001/api/users/refresh`, {}, {
        withCredentials: true, // Ensure cookies are sent
      });

      const { accessToken: newAccessToken } = response.data;
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
      const decoded = jwtDecode(newAccessToken);
      setUser(decoded);

      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout(); // If refresh fails, log out the user
    }
  };


  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccessToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
