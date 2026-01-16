import React, { createContext, useContext, useState, useEffect } from 'react';
import githubAPI from '../services/github/api.js';
import { initiateGitHubOAuth, logout as logoutService } from '../services/github/auth.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = sessionStorage.getItem('github_token');
      if (token) {
        githubAPI.saveToken(token);
        const userData = await githubAPI.getUser();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    initiateGitHubOAuth();
  };

  const handleCallback = async (token) => {
    try {
      githubAPI.saveToken(token);
      const userData = await githubAPI.getUser();
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Error handling callback:', error);
      logout();
      return false;
    }
  };

  const logout = () => {
    logoutService();
    githubAPI.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    handleCallback
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
