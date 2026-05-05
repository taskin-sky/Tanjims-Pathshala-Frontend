// API Routes
export const API_ROUTES = {
  // Auth
  OWNER_LOGIN: '/owner/login',
  STUDENT_LOGIN: '/student/login',
  OWNER_LOGOUT: '/owner/logout',
  STUDENT_LOGOUT: '/student/logout',

  // Owner
  OWNER_PROFILE: '/owner/profile',
  OWNER_CHANGE_PASSWORD: '/owner/change-password',

  // Student Management
  STUDENTS: '/owner/students',

  // Class Management
  CLASSES: '/owner/classes',

  // Reviews
  REVIEWS: '/owner/reviews',

  // Contacts
  CONTACTS: '/owner/contacts',

  // Dashboard
  DASHBOARD_STATS: '/owner/dashboard/stats',

  // Student
  STUDENT_PROFILE: '/student/profile',
  STUDENT_MY_CLASSES: '/student/my-classes',
  STUDENT_JOIN_CLASS: '/student/class',
  STUDENT_REVIEWS: '/student/reviews',

  // Public
  PUBLIC_CLASSES: '/public/classes',
  PUBLIC_SUBJECTS: '/public/subjects',
  PUBLIC_REVIEWS: '/public/reviews',
  PUBLIC_ABOUT: '/public/about',
  PUBLIC_OWNER: '/public/owner',
  PUBLIC_CONTACT: '/public/contact',
};

// Storage Keys
export const STORAGE_KEYS = {
  OWNER_TOKEN: 'ownerToken',
  STUDENT_TOKEN: 'studentToken',
  USER_ROLE: 'userRole',
  USER_DATA: 'userData',
  THEME: 'theme',
};

// User Roles
export const USER_ROLES = {
  OWNER: 'owner',
  STUDENT: 'student',
};

// Class Status
export const CLASS_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  PAST: 'past',
};

// Rating Options
export const RATINGS = [
  { value: 5, label: '★★★★★ - Excellent' },
  { value: 4, label: '★★★★☆ - Very Good' },
  { value: 3, label: '★★★☆☆ - Good' },
  { value: 2, label: '★★☆☆☆ - Fair' },
  { value: 1, label: '★☆☆☆☆ - Poor' },
];
