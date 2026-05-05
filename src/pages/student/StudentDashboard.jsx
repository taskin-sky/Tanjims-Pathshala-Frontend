import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyClasses } from '../../services/studentService';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, past: 0 });
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const response = await getMyClasses();
    if (response.success) {
      setStats(response.stats);
      setUpcomingClasses(response.upcomingClasses || []);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">
          Stay updated with your upcoming classes and learning progress.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Classes
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Upcoming Classes
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.upcoming}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Completed Classes
              </p>
              <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                {stats.past}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/student/my-classes"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center"
        >
          <div className="text-4xl mb-3">📖</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            View My Classes
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Check schedule and join live sessions
          </p>
        </Link>

        <Link
          to="/student/my-reviews"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center"
        >
          <div className="text-4xl mb-3">⭐</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            My Reviews
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Submit or update your feedback
          </p>
        </Link>
      </div>

      {/* Upcoming Classes Preview */}
      {upcomingClasses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Classes
          </h2>
          <div className="space-y-4">
            {upcomingClasses.slice(0, 3).map((cls) => (
              <div
                key={cls._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {cls.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cls.subject} - {cls.classLevel}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      📅 {new Date(cls.date).toLocaleDateString()} at {cls.time}
                    </p>
                  </div>
                  <Link
                    to={`/student/class/${cls._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Join Class
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {upcomingClasses.length > 3 && (
            <div className="text-center mt-4">
              <Link
                to="/student/my-classes"
                className="text-blue-600 hover:underline"
              >
                View all {upcomingClasses.length} classes →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
