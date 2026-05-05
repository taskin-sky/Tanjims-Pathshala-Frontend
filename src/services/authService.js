import api from './api.js';

// Owner Login
export const ownerLogin = async (email, password) => {
  try {
    const response = await api.post('/owner/login', { email, password });

    if (response.data.success) {
      // Store tokens and user data
      localStorage.setItem('ownerToken', response.data.token);
      localStorage.setItem('userRole', 'owner');
      localStorage.setItem('userData', JSON.stringify(response.data.owner));
    }

    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Student Login
export const studentLogin = async (name, passkey) => {
  try {
    const response = await api.post('/student/login', { name, passkey });

    if (response.data.success) {
      // Store tokens and user data
      localStorage.setItem('studentToken', response.data.token);
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('userData', JSON.stringify(response.data.student));
    }

    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Owner Logout
export const ownerLogout = async () => {
  try {
    const response = await api.post('/owner/logout');

    // Clear localStorage
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');

    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Student Logout
export const studentLogout = async () => {
  try {
    const response = await api.post('/student/logout');

    // Clear localStorage
    localStorage.removeItem('studentToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');

    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Get Current User - FIXED VERSION
export const getCurrentUser = () => {
  try {
    const role = localStorage.getItem('userRole');
    const userData = localStorage.getItem('userData');
    const ownerToken = localStorage.getItem('ownerToken');
    const studentToken = localStorage.getItem('studentToken');
    const token = ownerToken || studentToken;

    // Parse userData safely
    let parsedUserData = {};
    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        parsedUserData = JSON.parse(userData);
      } catch (e) {
        console.error('Failed to parse userData:', e);
        parsedUserData = {};
      }
    }

    return {
      isAuthenticated: !!token,
      role: role || null,
      user: parsedUserData,
      token: token || null,
    };
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return {
      isAuthenticated: false,
      role: null,
      user: {},
      token: null,
    };
  }
};

// Check if authenticated
export const isAuthenticated = () => {
  const ownerToken = localStorage.getItem('ownerToken');
  const studentToken = localStorage.getItem('studentToken');
  return !!(ownerToken || studentToken);
};

// Get user role
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};
