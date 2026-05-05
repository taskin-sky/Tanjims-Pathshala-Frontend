import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Subjects from './pages/public/Subjects';
import Reviews from './pages/public/Reviews';
import Contact from './pages/public/Contact';
import Login from './pages/Login';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import StudentManagement from './pages/owner/StudentManagement';
import ClassManagement from './pages/owner/ClassManagement';
import ReviewManagement from './pages/owner/ReviewManagement';
import ContactManagement from './pages/owner/ContactManagement';
import { useAuth } from './contexts/AuthContext';
import LoadingSpinner from './components/common/LoadingSpinner';
import StudentDashboard from './pages/student/StudentDashboard';
import MyClasses from './pages/student/MyClasses';
import MyReviews from './pages/student/MyReviews';
import AddStudent from './pages/owner/AddStudent';

function App() {
  const { isAuthenticated, userRole, user, logout, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Toaster position="top-right" />
      <Navbar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        userName={user?.name || user?.email}
        onLogout={logout}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          {/* Owner Routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/students" element={<StudentManagement />} />
          <Route path="/owner/classes" element={<ClassManagement />} />
          <Route path="/owner/reviews" element={<ReviewManagement />} />
          <Route path="/owner/contacts" element={<ContactManagement />} />
          // Add this route inside Routes
          <Route path="/owner/students/new" element={<AddStudent />} />
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/my-classes" element={<MyClasses />} />
          <Route path="/student/class/:id" element={<MyClasses />} />
          <Route path="/student/my-reviews" element={<MyReviews />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
