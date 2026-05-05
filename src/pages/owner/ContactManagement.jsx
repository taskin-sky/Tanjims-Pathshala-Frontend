import React, { useState, useEffect } from 'react';
import {
  getAllContacts,
  getContactById,
  markAsReplied,
  deleteContact,
} from '../../services/ownerService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ContactManagement = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await getAllContacts();
    if (response.success) {
      setContacts(response.contacts);
    }
    setLoading(false);
  };

  const handleViewContact = async (contactId) => {
    const response = await getContactById(contactId);
    if (response.success) {
      setSelectedContact(response.contact);
      setShowModal(true);
      fetchContacts(); // Refresh to update read status
    }
  };

  const handleMarkReplied = async (contactId) => {
    const response = await markAsReplied(contactId);
    if (response.success) {
      toast.success('Marked as replied');
      fetchContacts();
      if (selectedContact?._id === contactId) {
        setSelectedContact({
          ...selectedContact,
          replied: true,
          repliedAt: new Date(),
        });
      }
    } else {
      toast.error(response.message);
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Delete this message?')) {
      const response = await deleteContact(contactId);
      if (response.success) {
        toast.success('Message deleted');
        fetchContacts();
        setShowModal(false);
      } else {
        toast.error(response.message);
      }
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Messages
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${!contact.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                >
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${!contact.isRead ? 'bg-blue-500' : contact.replied ? 'bg-green-500' : 'bg-gray-400'}`}
                      title={
                        !contact.isRead
                          ? 'Unread'
                          : contact.replied
                            ? 'Replied'
                            : 'Read'
                      }
                    ></span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {contact.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => handleViewContact(contact._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleMarkReplied(contact._id)}
                      disabled={contact.replied}
                      className={`${contact.replied ? 'text-gray-400' : 'text-green-600 hover:text-green-800'}`}
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Message Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="space-y-3">
              <p>
                <span className="font-medium">From:</span>{' '}
                {selectedContact.name} ({selectedContact.email})
              </p>
              <p>
                <span className="font-medium">Subject:</span>{' '}
                {selectedContact.subject}
              </p>
              <p>
                <span className="font-medium">Date:</span>{' '}
                {new Date(selectedContact.createdAt).toLocaleString()}
              </p>
              <div className="border-t pt-3">
                <p className="font-medium mb-2">Message:</p>
                <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>
              {selectedContact.replied && (
                <p className="text-green-600">
                  ✓ Replied on{' '}
                  {new Date(selectedContact.repliedAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleMarkReplied(selectedContact._id)}
                disabled={selectedContact.replied}
                className={`flex-1 py-2 rounded-lg ${selectedContact.replied ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white transition`}
              >
                Mark as Replied
              </button>
              <button
                onClick={() => handleDelete(selectedContact._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
