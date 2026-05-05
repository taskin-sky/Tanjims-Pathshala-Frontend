import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicClasses, getOwnerInfo } from '../../services/publicService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    const [classesRes, ownerRes] = await Promise.all([
      getPublicClasses(),
      getOwnerInfo(),
    ]);

    if (classesRes.success) setClasses(classesRes.classes);
    if (ownerRes.success) setOwner(ownerRes.owner);
    setLoading(false);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      {/* Hero Section with Animated Background */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white rounded-3xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 opacity-10 rounded-full blur-3xl -mb-20 -ml-20"></div>

        <div className="relative px-6 py-16 md:py-24 max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            ✨ Online Learning Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Tanjim's Pathshala
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Quality online education with experienced teachers. Learn from
            anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subjects"
              className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Explore Subjects →
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold">10+</div>
              <div className="text-sm text-blue-100">Subjects</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-sm text-blue-100">Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">100+</div>
              <div className="text-sm text-blue-100">Classes</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">4.9</div>
              <div className="text-sm text-blue-100">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Info Section - Enhanced */}
      {owner && (
        <section className="mb-16">
          <div className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                {owner.profileImage ? (
                  <img
                    src={owner.profileImage}
                    alt={owner.name}
                    className="w-36 h-36 rounded-full object-cover ring-4 ring-blue-500 shadow-xl"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-blue-300 shadow-xl">
                    <span className="text-5xl font-bold text-white">
                      {owner.name?.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Meet {owner.name}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                    🎓 Expert Tutor
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                    💡 {owner.teachingStyle}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  {owner.bio}
                </p>
                <div className="flex gap-2 justify-center md:justify-start">
                  {owner.achievements?.slice(0, 2).map((achievement, idx) => (
                    <span
                      key={idx}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      🏆 {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Classes Section with Cards Design */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            📅 Upcoming Classes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our live interactive sessions and boost your learning journey
          </p>
        </div>

        {classes.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No upcoming classes scheduled. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, idx) => (
              <div
                key={cls._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-lg">📚</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">
                        {cls.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full animate-pulse">
                      🔴 Live Soon
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {cls.description ||
                      'Join this interactive session to master the subject with practical examples.'}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-600">📖</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Subject:</span>{' '}
                        {cls.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-purple-600">🎓</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Level:</span>{' '}
                        {cls.classLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-orange-600">📅</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {new Date(cls.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">⏰</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {cls.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                        👤
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                        👥
                      </div>
                    </div>
                    <Link
                      to="/login"
                      className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition flex items-center gap-1"
                    >
                      Join Now <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/subjects"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            View All Classes <span>→</span>
          </Link>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide the best learning experience with modern teaching methods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Quality Materials
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Well-structured curriculum with comprehensive study materials and
              practice tests
            </p>
          </div>

          <div className="group text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Live Interactive Classes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time Google Meet sessions with recordings available for
              revision
            </p>
          </div>

          <div className="group text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Expert Teacher
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn from an experienced instructor with proven track record of
              student success
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied students and take your skills to the next
          level
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Enroll Now →
          </Link>
          <Link
            to="/subjects"
            className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Browse Subjects
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
