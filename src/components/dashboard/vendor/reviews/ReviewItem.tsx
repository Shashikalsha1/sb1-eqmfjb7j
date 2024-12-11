import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { updateReviewStatus, replyToReview } from '@/lib/reviews';
import type { Review } from '@/types';

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (status: Review['status']) => {
    try {
      setError(null);
      await updateReviewStatus(review.id, status);
    } catch (error) {
      setError('Failed to update review status');
      console.error('Error updating review status:', error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await replyToReview(review.id, replyText);
      setIsReplying(false);
      setReplyText('');
    } catch (error) {
      setError('Failed to submit reply');
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4">
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-2">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </span>
        </div>
        <select
          value={review.status}
          onChange={(e) => handleStatusChange(e.target.value as Review['status'])}
          className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="mt-2">
        <p className="text-sm font-medium text-gray-900">{review.customerName}</p>
        <p className="mt-1 text-gray-700">{review.comment}</p>
      </div>

      {review.reply && (
        <div className="mt-4 bg-gray-50 rounded-md p-3">
          <p className="text-sm font-medium text-gray-900">Your Reply</p>
          <p className="mt-1 text-sm text-gray-700">{review.reply.comment}</p>
          <p className="mt-1 text-xs text-gray-500">
            {formatDate(review.reply.createdAt)}
          </p>
        </div>
      )}

      {!review.reply && (
        <div className="mt-4">
          {isReplying ? (
            <form onSubmit={handleReplySubmit} className="space-y-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                placeholder="Write your reply..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyText('');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Reply'}
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsReplying(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Reply to Review
            </button>
          )}
        </div>
      )}
    </div>
  );
}