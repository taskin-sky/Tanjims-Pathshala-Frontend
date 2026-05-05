import api from './api.js';

// ============= PROFILE MANAGEMENT =============

// Rest of the file remains the same...
export const getOwnerProfile = async () => {
  try {
    const response = await api.get('/owner/profile');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ... rest of your ownerService.js content

export const updateOwnerProfile = async (profileData) => {
  try {
    const response = await api.put('/owner/profile', profileData);

    if (response.data.success) {
      // Update stored user data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUser = { ...userData, ...response.data.owner };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }

    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/owner/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ============= STUDENT MANAGEMENT =============
export const createStudent = async (studentData) => {
  try {
    const response = await api.post('/owner/students', studentData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const getAllStudents = async () => {
  try {
    const response = await api.get('/owner/students');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const getStudentById = async (studentId) => {
  try {
    const response = await api.get(`/owner/students/${studentId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await api.put(`/owner/students/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const response = await api.delete(`/owner/students/${studentId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const resetStudentPasskey = async (studentId) => {
  try {
    const response = await api.put(
      `/owner/students/${studentId}/reset-passkey`
    );
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ============= CLASS MANAGEMENT =============
export const createClass = async (classData) => {
  try {
    const response = await api.post('/owner/classes', classData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const getAllClasses = async () => {
  try {
    const response = await api.get('/owner/classes');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const getClassById = async (classId) => {
  try {
    const response = await api.get(`/owner/classes/${classId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const updateClass = async (classId, classData) => {
  try {
    const response = await api.put(`/owner/classes/${classId}`, classData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const deleteClass = async (classId) => {
  try {
    const response = await api.delete(`/owner/classes/${classId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ============= REVIEW MANAGEMENT =============
export const getAllReviews = async () => {
  try {
    const response = await api.get('/owner/reviews');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const approveReview = async (reviewId) => {
  try {
    const response = await api.put(`/owner/reviews/${reviewId}/approve`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ============= CONTACT MANAGEMENT =============
export const getAllContacts = async () => {
  try {
    const response = await api.get('/owner/contacts');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const getContactById = async (contactId) => {
  try {
    const response = await api.get(`/owner/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const markAsReplied = async (contactId) => {
  try {
    const response = await api.put(`/owner/contacts/${contactId}/reply`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const deleteContact = async (contactId) => {
  try {
    const response = await api.delete(`/owner/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

// ============= DASHBOARD =============
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/owner/dashboard/stats');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};
