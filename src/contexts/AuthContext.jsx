import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  ownerLogin,
  studentLogin,
  ownerLogout,
  studentLogout,
  getCurrentUser,
} from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

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
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser.isAuthenticated) {
        setUser(currentUser.user);
        setIsAuthenticated(true);
        setUserRole(currentUser.role);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginAsOwner = async (email, password) => {
    try {
      const response = await ownerLogin(email, password);
      if (response.success) {
        setUser(response.owner);
        setIsAuthenticated(true);
        setUserRole('owner');
        toast.success('Welcome back, Tanjim!');
        return true;
      } else {
        toast.error(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const loginAsStudent = async (name, passkey) => {
    try {
      const response = await studentLogin(name, passkey);
      if (response.success) {
        setUser(response.student);
        setIsAuthenticated(true);
        setUserRole('student');
        toast.success(`Welcome back, ${response.student.name}!`);
        return true;
      } else {
        toast.error(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      if (userRole === 'owner') {
        await ownerLogout();
      } else if (userRole === 'student') {
        await studentLogout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
      toast.success('Logged out successfully');
    }
  };

  const value = {
    user,
    isAuthenticated,
    userRole,
    loading,
    loginAsOwner,
    loginAsStudent,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
