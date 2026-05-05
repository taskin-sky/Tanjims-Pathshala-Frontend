import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Tanjim's Pathshala
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Quality education online. Learn from experienced teachers in
              interactive sessions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/subjects"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Subjects
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Email: tanjim@pathshala.com</li>
              <li>Classes: Online via Google Meet</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Tanjim's Pathshala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
