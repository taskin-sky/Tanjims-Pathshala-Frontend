import React, { useState, useEffect } from 'react';
import {
  getMyReviews,
  submitReview,
  updateReview,
} from '../../services/studentService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const MyReviews = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    comment: '',
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await getMyReviews();
    if (response.success) {
      setReviews(response.reviews);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let response;
    if (editingReview) {
      response = await updateReview(editingReview._id, formData);
      if (response.success) toast.success('Review updated successfully');
    } else {
      response = await submitReview(formData);
      if (response.success) toast.success(response.message);
    }

    if (response.success) {
      setShowModal(false);
      setEditingReview(null);
      setFormData({ comment: '', rating: 5 });
      fetchReviews();
    } else {
      toast.error(response.message);
    }
    setSubmitting(false);
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setFormData({
      comment: review.comment,
      rating: review.rating,
    });
    setShowModal(true);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const StarInput = ({ rating, hoverRating, setRating, setHoverRating }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="flex gap-1">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="text-3xl focus:outline-none"
          >
            <span
              className={
                star <= (hoverRating || rating)
                  ? 'text-yellow-500'
                  : 'text-gray-300'
              }
            >
              ★
            </span>
          </button>
        ))}
      </div>
    );
  };

  if (loading) return <LoadingSpinner size="lg" />;

  const hasReview = reviews.length > 0;
  const approvedReviews = reviews.filter((r) => r.isApproved);
  const pendingReviews = reviews.filter((r) => !r.isApproved);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Share your feedback about the classes
          </p>
        </div>
        {!hasReview && (
          <button
            onClick={() => {
              setEditingReview(null);
              setFormData({ comment: '', rating: 5 });
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Existing Review */}
      {hasReview && (
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-yellow-500 text-2xl mb-2">
                  {renderStars(reviews[0].rating)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {reviews[0].comment}
                </p>
                <div className="mt-3 flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${reviews[0].isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                  >
                    {reviews[0].isApproved
                      ? '✓ Approved'
                      : '⏳ Pending Approval'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Submitted on{' '}
                    {new Date(reviews[0].createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => openEditModal(reviews[0])}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Why leave a review?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your feedback helps improve the quality of classes. Reviews are
              visible to the owner and will be displayed publicly after
              approval.
            </p>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingReview ? 'Edit Your Review' : 'Write a Review'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  setRating={(rating) => setFormData({ ...formData, rating })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Share your experience with the classes..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting
                    ? 'Submitting...'
                    : editingReview
                      ? 'Update'
                      : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingReview(null);
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

// Star Rating Component
const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="text-3xl focus:outline-none transition"
        >
          <span
            className={
              star <= (hoverRating || rating)
                ? 'text-yellow-500'
                : 'text-gray-300'
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default MyReviews;
