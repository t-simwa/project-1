import { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const ReviewForm = ({ booking, onSuccess, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (comment.length < 10) {
      toast.error('Comment must be at least 10 characters');
      return;
    }

    setLoading(true);
    try {
      await api.post('/reviews', {
        reviewee: booking.teacher._id,
        booking: booking._id,
        rating: rating,
        comment: comment.trim(),
      });

      toast.success('Review submitted successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (forRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || rating);
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none"
          aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
        >
          {isFilled ? (
            <StarIcon className="h-8 w-8 text-yellow-400 transition-colors" />
          ) : (
            <StarOutlineIcon className="h-8 w-8 text-gray-300 transition-colors hover:text-yellow-300" />
          )}
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <p className="text-gray-600 mb-4">
          How was your session with <strong>{booking.teacher.name}</strong>?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex space-x-1" role="radiogroup" aria-label="Rating">
              {renderStars(rating)}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {rating} star{rating > 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review *
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input"
              rows="4"
              placeholder="Share your experience..."
              required
              minLength={10}
              maxLength={500}
              aria-describedby="comment-help"
            />
            <p id="comment-help" className="text-sm text-gray-500 mt-1">
              {comment.length}/500 characters (minimum 10)
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading || rating === 0 || comment.length < 10}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

