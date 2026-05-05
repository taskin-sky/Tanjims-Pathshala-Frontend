import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = () => {
  const navigate = useNavigate();
  const { loginAsOwner, loginAsStudent, loading } = useAuth();
  const [loginType, setLoginType] = useState('owner');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    passkey: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let success = false;
    if (loginType === 'owner') {
      if (!formData.email || !formData.password) {
        toast.error('Please enter email and password');
        setSubmitting(false);
        return;
      }
      success = await loginAsOwner(formData.email, formData.password);
      if (success) navigate('/owner/dashboard');
    } else {
      if (!formData.name || !formData.passkey) {
        toast.error('Please enter name and passkey');
        setSubmitting(false);
        return;
      }
      success = await loginAsStudent(formData.name, formData.passkey);
      if (success) navigate('/student/dashboard');
    }

    setSubmitting(false);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Login to your account
          </p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setLoginType('owner')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              loginType === 'owner'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Owner Login
          </button>
          <button
            onClick={() => setLoginType('student')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              loginType === 'student'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Student Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {loginType === 'owner' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="tanjim@tuition.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Passkey
                </label>
                <input
                  type="text"
                  name="passkey"
                  value={formData.passkey}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your passkey"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {loginType === 'owner' ? (
              <>Demo: tanjimmubarrat99@gmail.com / Your password</>
            ) : (
              <>Get your name and passkey from the owner</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
