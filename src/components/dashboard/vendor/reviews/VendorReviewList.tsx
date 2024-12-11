import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Search, Star } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { formatDate } from '@/lib/utils';
import { replyToReview } from '@/lib/reviews';

export function VendorReviewList() {
  const { reviews, loading } = useReviews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const filteredReviews = reviews?.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = selectedRating === 'all' || review.rating === Number(selectedRating);
    return matchesSearch && matchesRating;
  });

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim()) return;

    try {
      await replyToReview(reviewId, replyText);
      setReplyText('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error replying to review:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and respond to customer reviews
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredReviews?.length === 0 ? (
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? 'Try adjusting your search terms' : 'Reviews will appear here when customers leave them'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews?.map((review) => (
                  <div key={review.id} className="bg-white border rounded-lg p-4">
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
                    </div>

                    <p className="mt-2 text-gray-700">{review.comment}</p>

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
                        {replyingTo === review.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              rows={3}
                              placeholder="Write your reply..."
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleReply(review.id)}
                                className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setReplyingTo(review.id)}
                            className="text-sm text-indigo-600 hover:text-indigo-700"
                          >
                            Reply to Review
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}