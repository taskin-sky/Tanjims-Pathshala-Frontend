import React, { useState, useEffect } from 'react';
import { getAboutInfo } from '../../services/publicService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    const response = await getAboutInfo();
    if (response.success) {
      setAbout(response);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        About Tanjim's Pathshala
      </h1>

      {about && (
        <>
          {/* Owner Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {about.owner?.profileImage ? (
                <img
                  src={about.owner.profileImage}
                  alt={about.owner.name}
                  className="w-40 h-40 rounded-full object-cover"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                    {about.owner?.name?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {about.owner?.name}
                </h2>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {about.owner?.teachingStyle}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {about.owner?.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {about.stats?.totalClasses || 0}+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Classes
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {about.stats?.totalStudents || 0}+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Students
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {about.stats?.totalReviews || 0}+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Reviews
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                5+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Subjects
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Achievements
            </h3>
            <ul className="space-y-2">
              {about.owner?.achievements?.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                >
                  <span className="text-green-500">✓</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                To provide quality education accessible to every student, making
                complex subjects simple and enjoyable through interactive online
                classes.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                To become a leading online learning platform that empowers
                students to achieve their academic goals with confidence.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default About;
