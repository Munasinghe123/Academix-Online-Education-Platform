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
    const decoded = jwtDecode(accessToken); // Use the passed token here
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUser(null);
    navigate('/');
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`http://localhost:7001/api/users/refresh`, {
        // method: 'POST',
        withCredentials: true, // Ensure the refresh token in the cookie is sent
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const { accessToken: newAccessToken } = await response.json();
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
