import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// Load user from localStorage on startup
const loadUserFromStorage = () => {
  try {
    const saved = localStorage.getItem('foodiehub_user');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load user from storage:', e);
  }
  return null;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserFromStorage);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!loadUserFromStorage());

  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('foodiehub_user', JSON.stringify(userData));
      if (token) {
        localStorage.setItem('foodiehub_token', token);
      }
    } catch (e) {
      console.error('Failed to save user to storage:', e);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('foodiehub_user');
    localStorage.removeItem('foodiehub_token');
  };

  // Keep localStorage in sync if user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('foodiehub_user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};