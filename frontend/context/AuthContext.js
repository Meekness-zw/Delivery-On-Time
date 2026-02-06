import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, phone, name, role: 'customer' | 'courier', needsVehicleRegistration?, hasVehicle? }
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    // userData should have: { email?, phone?, name, role }
    // This ensures the role and identity are locked in when logging in
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signUp = (userData) => {
    // userData should have: { email?, phone?, name, role }
    // This ensures the role and identity are locked in when signing up
    setUser(userData);
    setIsAuthenticated(true);
  };

  const updateUser = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        signUp,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
