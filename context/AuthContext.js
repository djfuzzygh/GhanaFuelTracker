import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        const userData = await SecureStore.getItemAsync('userData');
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth state check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Simulate a successful login
    const user = { id: '1', email, name: 'Test User' };
    const token = 'fake-auth-token';

    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(user));

    setUser(user);
    return { success: true };
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    setUser(null);
  };

  const signup = async (userData) => {
    // Simulate a successful signup
    const user = { id: '2', ...userData };
    const token = 'fake-auth-token';

    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(user));

    setUser(user);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};