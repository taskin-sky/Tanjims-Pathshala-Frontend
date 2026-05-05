import React, { useState, useEffect } from 'react';
import {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  getAllStudents,
} from '../../services/ownerService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ClassManagement = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    googleMeetLink: '',
    subject: '',
    classLevel: '',
    createdFor: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [classesRes, studentsRes] = await Promise.all([
      getAllClasses(),
      getAllStudents(),
    ]);
    if (classesRes.success) setClasses(classesRes.classes);
    if (studentsRes.success) setStudents(studentsRes.students);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;

    if (editingClass) {
      response = await updateClass(editingClass._id, formData);
      if (response.success) toast.success('Class updated successfully');
    } else {
      response = await createClass(formData);
      if (response.success) toast.success('Class created successfully');
    }

    if (response.success) {
      setShowModal(false);
      setEditingClass(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        googleMeetLink: '',
        subject: '',
        classLevel: '',
        createdFor: [],
      });
      fetchData();
    } else {
      toast.error(response.message);
    }
  };

  const handleDelete = async (classId, title) => {
    if (window.confirm(`Delete class "${title}"?`)) {
      const response = await deleteClass(classId);
      if (response.success) {
        toast.success('Class deleted successfully');
        fetchData();
      } else {
        toast.error(response.message);
      }
    }
  };

  const handleStudentSelect = (studentId) => {
    setFormData((prev) => ({
      ...prev,
      createdFor: prev.createdFor.includes(studentId)
        ? prev.createdFor.filter((id) => id !== studentId)
        : [...prev.createdFor, studentId],
    }));
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Class Management
        </h1>
        <button
          onClick={() => {
            setEditingClass(null);
            setFormData({
              title: '',
              description: '',
              date: '',
              time: '',
              googleMeetLink: '',
              subject: '',
              classLevel: '',
              createdFor: [],
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Class
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div
              className={`p-4 ${cls.isActive ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
            >
              <h3 className="text-xl font-bold">{cls.title}</h3>
              <p className="text-sm opacity-90">
                {cls.subject} - {cls.classLevel}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {cls.description || 'No description'}
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(cls.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {cls.time}
                </p>
                <p>
                  <span className="font-medium">Meet Link:</span>{' '}
                  <a
                    href={cls.googleMeetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {cls.googleMeetLink}
                  </a>
                </p>
                <p>
                  <span className="font-medium">Students:</span>{' '}
                  {cls.createdFor?.length === 0
                    ? 'All Students'
                    : `${cls.createdFor?.length} selected`}
                </p>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setEditingClass(cls);
                    setFormData({
                      title: cls.title,
                      description: cls.description || '',
                      date: cls.date.split('T')[0],
                      time: cls.time,
                      googleMeetLink: cls.googleMeetLink,
                      subject: cls.subject,
                      classLevel: cls.classLevel,
                      createdFor: cls.createdFor?.map((s) => s._id || s) || [],
                    });
                    setShowModal(true);
                  }}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cls._id, cls.title)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingClass ? 'Edit Class' : 'Create New Class'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Class Level *
                  </label>
                  <input
                    type="text"
                    value={formData.classLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, classLevel: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Google Meet Link *
                  </label>
                  <input
                    type="url"
                    value={formData.googleMeetLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        googleMeetLink: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    rows="3"
                  />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Assign to Students (Leave empty for all)
                  </label>
                  <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                    <label className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.createdFor.length === 0}
                        onChange={() =>
                          setFormData({ ...formData, createdFor: [] })
                        }
                      />{' '}
                      All Students
                    </label>
                    {students.map((student) => (
                      <label
                        key={student._id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={formData.createdFor.includes(student._id)}
                          onChange={() => handleStudentSelect(student._id)}
                        />{' '}
                        {student.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingClass ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingClass(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
