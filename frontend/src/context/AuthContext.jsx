import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/auth';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token && userId) {
      fetchUserData(token, userId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token, id) => {
    if (!token) return;
    try {
      const response = await api.post('/api/users/me', { id: id});
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Failed to get user details:', error?.response?.data);
      setError('Failed: ' + error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/api/users/signin', userData);
      saveToken(response.data.data.token);
      const userId = response.data.data.user.id;
      localStorage.setItem('userId', userId);
      setUserId(userId);
      await fetchUserData(response.data.data.token, userId);
      setError(null);
    } catch (error) {
      console.error('Login failed:', error);
      // if(error?.message) setError(error.message);
      if(error?.response?.data?.message) {
      setError((error?.response?.data?.message + ": " + error.response?.data?.data) || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/api/users/register', userData);
      saveToken(response.data.data.token);
      const userId = response?.data?.data?.newUser.id;
      localStorage.setItem('userId', userId);
      setUserId(userId);
      await fetchUserData(response.data.data.token, userId);
      setError(response?.data?.message);
    } catch (error) {
      console.error('Registration failed:', error);
      // if(error?.message) setError(error.message);
      if(error?.response?.data?.message) 
      setError((error?.response?.data?.message + ": " + error?.response?.data?.data) || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout, loading, error, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);