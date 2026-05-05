import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../services/ownerService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const OwnerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    const response = await getDashboardStats();
    if (response.success) {
      setStats(response.stats);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  const pieData = [
    {
      name: 'Active Students',
      value: stats?.activeStudents || 0,
      color: '#10B981',
    },
    {
      name: 'Inactive Students',
      value: stats?.totalStudents - stats?.activeStudents || 0,
      color: '#EF4444',
    },
  ];

  const chartData = [
    { name: 'Total Students', value: stats?.totalStudents || 0 },
    { name: 'Total Classes', value: stats?.totalClasses || 0 },
    { name: 'Upcoming Classes', value: stats?.upcomingClasses || 0 },
    { name: 'Total Reviews', value: stats?.totalReviews || 0 },
    { name: 'Unread Contacts', value: stats?.unreadContacts || 0 },
  ];

  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: '👥',
      color: 'bg-blue-500',
      link: '/owner/students',
    },
    {
      title: 'Active Students',
      value: stats?.activeStudents || 0,
      icon: '✅',
      color: 'bg-green-500',
      link: '/owner/students',
    },
    {
      title: 'Total Classes',
      value: stats?.totalClasses || 0,
      icon: '📚',
      color: 'bg-purple-500',
      link: '/owner/classes',
    },
    {
      title: 'Upcoming Classes',
      value: stats?.upcomingClasses || 0,
      icon: '📅',
      color: 'bg-yellow-500',
      link: '/owner/classes',
    },
    {
      title: 'Total Reviews',
      value: stats?.totalReviews || 0,
      icon: '⭐',
      color: 'bg-pink-500',
      link: '/owner/reviews',
    },
    {
      title: 'Average Rating',
      value: stats?.averageRating?.toFixed(1) || 0,
      icon: '🎯',
      color: 'bg-indigo-500',
      link: '/owner/reviews',
    },
    {
      title: 'Unread Contacts',
      value: stats?.unreadContacts || 0,
      icon: '✉️',
      color: 'bg-red-500',
      link: '/owner/contacts',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Owner Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Overview Statistics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Student Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/owner/students"
            className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 rounded-lg text-center hover:bg-blue-100 transition"
          >
            ➕ Add Student
          </Link>
          <Link
            to="/owner/classes"
            className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-lg text-center hover:bg-green-100 transition"
          >
            📅 Create Class
          </Link>
          <Link
            to="/owner/reviews"
            className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 p-4 rounded-lg text-center hover:bg-yellow-100 transition"
          >
            ⭐ Approve Reviews
          </Link>
          <Link
            to="/owner/contacts"
            className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-4 rounded-lg text-center hover:bg-purple-100 transition"
          >
            ✉️ View Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
