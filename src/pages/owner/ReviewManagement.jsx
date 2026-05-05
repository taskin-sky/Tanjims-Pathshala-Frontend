import React, { useState, useEffect } from 'react';
import { getAllReviews, approveReview } from '../../services/ownerService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ReviewManagement = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await getAllReviews();
    if (response.success) {
      setReviews(response.reviews);
    }
    setLoading(false);
  };

  const handleApprove = async (reviewId) => {
    const response = await approveReview(reviewId);
    if (response.success) {
      toast.success('Review approved successfully');
      fetchReviews();
    } else {
      toast.error(response.message);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  const pendingReviews = reviews.filter((r) => !r.isApproved);
  const approvedReviews = reviews.filter((r) => r.isApproved);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Review Management
      </h1>

      {/* Pending Reviews */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Pending Approval ({pendingReviews.length})
        </h2>
        {pendingReviews.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No pending reviews
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {review.studentName}
                    </h3>
                    <div className="text-yellow-500 text-lg">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleApprove(review._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  {review.comment}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Reviews */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Approved Reviews ({approvedReviews.length})
        </h2>
        {approvedReviews.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No approved reviews yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {approvedReviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {review.studentName}
                  </h3>
                  <div className="text-yellow-500 text-lg">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  {review.comment}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
