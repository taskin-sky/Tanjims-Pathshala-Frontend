import React, { useState, useEffect } from 'react';
import { getPublicReviews } from '../../services/publicService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await getPublicReviews();
    if (response.success) {
      setReviews(response.reviews);
      setStats({
        averageRating: response.stats?.averageRating || 0,
        totalReviews: response.stats?.totalReviews || 0,
      });
    }
    setLoading(false);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        Student Reviews
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        What our students say about us
      </p>

      {/* Rating Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 text-center">
        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {stats.averageRating.toFixed(1)}
        </div>
        <div className="text-2xl text-yellow-500 mb-2">
          {renderStars(Math.round(stats.averageRating))}
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          Based on {stats.totalReviews} reviews
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No reviews yet. Be the first to review!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {review.studentName}
                  </h3>
                  <div className="text-yellow-500 text-lg">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
