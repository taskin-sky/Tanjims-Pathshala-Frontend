import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ isAuthenticated, userRole, userName, onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400"
            onClick={closeMobileMenu}
          >
            <img
              src="/Tanjim's Pathshala-logo.png"
              alt="Tanjim's Pathshala"
              className="w-40 h-20 object-contain"
            />
            {/* <span className="hidden sm:inline">Tanjim's Pathshala</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </Link>
            <Link
              to="/subjects"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Subjects
            </Link>
            <Link
              to="/reviews"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Reviews
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </Link>

            {/* Dashboard based on role */}
            {isAuthenticated && userRole === 'owner' && (
              <Link
                to="/owner/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated && userRole === 'student' && (
              <>
                <Link
                  to="/student/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                {/* <Link
                  to="/student/my-classes"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  My Classes
                </Link>
                <Link
                  to="/student/my-reviews"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  My Reviews
                </Link> */}
              </>
            )}

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome, {userName?.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                to="/subjects"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                onClick={closeMobileMenu}
              >
                Subjects
              </Link>
              <Link
                to="/reviews"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                onClick={closeMobileMenu}
              >
                Reviews
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>

              {/* Dashboard links for mobile */}
              {isAuthenticated && userRole === 'owner' && (
                <Link
                  to="/owner/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              )}

              {isAuthenticated && userRole === 'student' && (
                <>
                  <Link
                    to="/student/dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/my-classes"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                    onClick={closeMobileMenu}
                  >
                    My Classes
                  </Link>
                  <Link
                    to="/student/my-reviews"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-2 py-2"
                    onClick={closeMobileMenu}
                  >
                    My Reviews
                  </Link>
                </>
              )}

              {/* Auth buttons for mobile */}
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              ) : (
                <>
                  <div className="px-2 py-2 text-sm text-gray-600 dark:text-gray-400">
                    Welcome, {userName?.split(' ')[0]}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-center hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
