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

  const handleStatusChange = async (status: Review['status']) => {
    await updateReviewStatus(review.id, status);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      await replyToReview(review.id, replyText);
      setIsReplying(false);
      setReplyText('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <li className="px-4 py-5 sm:px-6">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill={star <= review.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {review.customerName || 'Anonymous'}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>

          {review.reply && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-900">Vendor Reply</p>
              <p className="mt-1 text-sm text-gray-700">{review.reply.comment}</p>
              <p className="mt-1 text-xs text-gray-500">
                {formatDate(review.reply.createdAt)}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center space-x-4">
            <select
              value={review.status}
              onChange={(e) => handleStatusChange(e.target.value as Review['status'])}
              className="rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            {!review.reply && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Reply
              </button>
            )}
          </div>

          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                placeholder="Write your reply..."
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsReplying(false)}
                  className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reply'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </li>
  );
}