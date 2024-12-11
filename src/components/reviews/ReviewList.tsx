import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { ReviewItem } from './ReviewItem';
import type { Review } from '@/types';

interface ReviewListProps {
  targetId?: string;
  targetType?: 'product' | 'service';
}

export function ReviewList({ targetId, targetType }: ReviewListProps) {
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Review['status'] | 'all'>('all');
  const { reviews, loading } = useReviews({ targetId, targetType });

  const filteredReviews = reviews?.filter(review => {
    const matchesRating = selectedRating === 'all' || review.rating === selectedRating;
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    return matchesRating && matchesStatus;
  });

  const averageRating = reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 0;
  const totalReviews = reviews?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Average Rating
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {totalReviews > 0 ? (averageRating / totalReviews).toFixed(1) : 'N/A'}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Reviews
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {totalReviews}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-48">
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
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
        <div className="sm:w-48">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Review['status'] | 'all')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredReviews?.length === 0 ? (
            <li className="px-4 py-5 sm:px-6">
              <p className="text-gray-500 text-center">No reviews found</p>
            </li>
          ) : (
            filteredReviews?.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}