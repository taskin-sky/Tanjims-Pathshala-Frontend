import React, { useState, useEffect } from 'react';
import {
  getMyClasses,
  getClassDetails,
  joinClass,
} from '../../services/studentService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const MyClasses = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [pastClasses, setPastClasses] = useState([]);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, past: 0 });
  const [selectedClass, setSelectedClass] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const response = await getMyClasses();
    if (response.success) {
      setStats(response.stats);
      setUpcomingClasses(response.upcomingClasses || []);
      setPastClasses(response.pastClasses || []);
    }
    setLoading(false);
  };

  const handleJoinClass = async (classId) => {
    setJoining(true);
    const response = await joinClass(classId);
    if (response.success) {
      toast.success('You can join the class now!');
      if (response.googleMeetLink) {
        window.open(response.googleMeetLink, '_blank');
      }
      setShowJoinModal(false);
    } else {
      toast.error(response.message);
    }
    setJoining(false);
  };

  const handleViewDetails = async (classId) => {
    const response = await getClassDetails(classId);
    if (response.success) {
      setSelectedClass(response.class);
      setShowJoinModal(true);
    } else {
      toast.error(response.message);
    }
  };

  const getJoinButtonStatus = (classDate, classTime, canJoin) => {
    const now = new Date();
    const classDateTime = new Date(classDate);
    const [hours, minutes] = classTime.split(':');
    classDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

    if (now > classDateTime) {
      return { text: 'Expired', disabled: true, color: 'bg-gray-400' };
    }
    if (canJoin) {
      return {
        text: 'Join Now',
        disabled: false,
        color: 'bg-green-600 hover:bg-green-700',
      };
    }
    return { text: 'Coming Soon', disabled: true, color: 'bg-yellow-600' };
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        My Classes
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        View and join your scheduled classes
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Classes
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.upcoming}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">{stats.past}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          📅 Upcoming Classes ({upcomingClasses.length})
        </h2>
        {upcomingClasses.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No upcoming classes scheduled
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingClasses.map((cls) => {
              const buttonStatus = getJoinButtonStatus(
                cls.date,
                cls.time,
                cls.canJoin
              );
              return (
                <div
                  key={cls._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {cls.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {cls.subject} - {cls.classLevel}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            📅{' '}
                            {new Date(cls.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            ⏰ {cls.time}
                          </span>
                        </div>
                        {cls.description && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            📝 {cls.description}
                          </p>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => handleViewDetails(cls._id)}
                          disabled={buttonStatus.disabled}
                          className={`px-6 py-2 rounded-lg text-white transition ${buttonStatus.color}`}
                        >
                          {buttonStatus.text}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Classes */}
      {pastClasses.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            ✅ Completed Classes ({pastClasses.length})
          </h2>
          <div className="space-y-3">
            {pastClasses.map((cls) => (
              <div
                key={cls._id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {cls.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cls.subject} - {new Date(cls.date).toLocaleDateString()}{' '}
                      at {cls.time}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Class
            </h2>
            <div className="space-y-3 mb-6">
              <p>
                <span className="font-medium">Class:</span>{' '}
                {selectedClass.title}
              </p>
              <p>
                <span className="font-medium">Subject:</span>{' '}
                {selectedClass.subject}
              </p>
              <p>
                <span className="font-medium">Date:</span>{' '}
                {new Date(selectedClass.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Time:</span> {selectedClass.time}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleJoinClass(selectedClass._id)}
                disabled={joining}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {joining ? 'Joining...' : 'Yes, Join Now'}
              </button>
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
