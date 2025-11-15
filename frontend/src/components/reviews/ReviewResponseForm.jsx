import { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ReviewResponseForm = ({ review, onSuccess, onCancel }) => {
  const [response, setResponse] = useState(review.response || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (response.trim().length < 10) {
      toast.error('Response must be at least 10 characters');
      return;
    }

    setLoading(true);
    try {
      // Note: This would require a new endpoint PUT /api/reviews/:id/response
      // For now, we'll update the review with the response
      await api.put(`/reviews/${review._id}`, {
        rating: review.rating,
        comment: review.comment,
        response: response.trim(),
      });

      toast.success('Response submitted successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 pl-4 border-l-2 border-indigo-200">
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="response" className="block text-sm font-medium text-gray-700">
          Respond to this review:
        </label>
        <textarea
          id="response"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="input text-sm"
          rows="3"
          placeholder="Thank you for your feedback..."
          maxLength={500}
          aria-describedby="response-help"
        />
        <p id="response-help" className="text-xs text-gray-500">
          {response.length}/500 characters
        </p>
        <div className="flex gap-2">
          <button
            type="submit"
            className="btn btn-primary text-sm px-4 py-2"
            disabled={loading || response.trim().length < 10}
          >
            {loading ? 'Saving...' : 'Post Response'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost text-sm px-4 py-2"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewResponseForm;

