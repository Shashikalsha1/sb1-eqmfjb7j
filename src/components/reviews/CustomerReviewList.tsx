import React from 'react';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Review } from '@/types';

interface CustomerReviewListProps {
  reviews: Review[];
}

export function CustomerReviewList({ reviews }: CustomerReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow p-4">
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
              <span className="ml-2 text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </span>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full
              ${review.status === 'approved' ? 'bg-green-100 text-green-800' :
                review.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'}`}
            >
              {review.status}
            </span>
          </div>

          <p className="mt-2 text-gray-700">{review.comment}</p>

          {review.reply && (
            <div className="mt-3 bg-gray-50 rounded-md p-3">
              <p className="text-sm font-medium text-gray-900">Vendor Reply</p>
              <p className="mt-1 text-sm text-gray-700">{review.reply.comment}</p>
              <p className="mt-1 text-xs text-gray-500">
                {formatDate(review.reply.createdAt)}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}