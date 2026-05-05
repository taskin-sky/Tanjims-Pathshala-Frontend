import React, { useState, useEffect } from 'react';
import { getPublicSubjects } from '../../services/publicService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Subjects = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await getPublicSubjects();
    if (response.success) {
      setSubjects(response.subjects);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        Our Subjects
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Explore the subjects we offer
      </p>

      {subjects.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No subjects available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <h3 className="text-xl font-bold text-white">
                  {subject.subject}
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Available for:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {subject.classLevels?.map((level, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Total Classes:</span>{' '}
                    {subject.totalClasses}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="font-medium">Latest Class:</span>{' '}
                    {new Date(subject.latestClass).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;
