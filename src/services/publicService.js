import api from './api.js';

// Get public classes (upcoming only)
export const getPublicClasses = async () => {
  try {
    const response = await api.get('/public/classes');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Get all subjects
export const getPublicSubjects = async () => {
  try {
    const response = await api.get('/public/subjects');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Get approved reviews
export const getPublicReviews = async () => {
  try {
    const response = await api.get('/public/reviews');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Get about info
export const getAboutInfo = async () => {
  try {
    const response = await api.get('/public/about');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Get owner info
export const getOwnerInfo = async () => {
  try {
    const response = await api.get('/public/owner');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// Submit contact form
export const submitContact = async (contactData) => {
  try {
    const response = await api.post('/public/contact', contactData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};
