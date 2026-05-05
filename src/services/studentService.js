import api from './api.js';

// ============= PROFILE MANAGEMENT =============
export const getStudentProfile = async () => {
  try {
    const response = await api.get('/student/profile');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const updateStudentProfile = async (profileData) => {
  try {
    const response = await api.put('/student/profile', profileData);

    if (response.data.success) {
      // Update stored user data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUser = { ...userData, ...response.data.student };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }

    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ============= CLASS MANAGEMENT =============
export const getMyClasses = async () => {
  try {
    const response = await api.get('/student/my-classes');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const getClassDetails = async (classId) => {
  try {
    const response = await api.get(`/student/class/${classId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const joinClass = async (classId) => {
  try {
    const response = await api.post(`/student/class/${classId}/join`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ============= REVIEW MANAGEMENT =============
export const submitReview = async (reviewData) => {
  try {
    const response = await api.post('/student/reviews', reviewData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await api.put(`/student/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const getMyReviews = async () => {
  try {
    const response = await api.get('/student/my-reviews');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};
