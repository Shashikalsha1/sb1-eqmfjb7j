import React, { useState } from 'react';
import { useReviews } from '@/hooks/useReviews';
import { ReviewItem } from './ReviewItem';
import { ReviewFilters } from './ReviewFilters';
import { EmptyReviews } from './EmptyReviews';

export function ReviewList() {
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const { reviews, loading, error } = useReviews();

  const filteredReviews = reviews?.filter(review => {
    const matchesRating = selectedRating === 'all' || review.rating === selectedRating;
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    return matchesRating && matchesStatus;
  });

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <ReviewFilters
          selectedRating={selectedRating}
          selectedStatus={selectedStatus}
          onRatingChange={setSelectedRating}
          onStatusChange={setSelectedStatus}
        />

        {error ? (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredReviews?.length === 0 ? (
          <EmptyReviews />
        ) : (
          <div className="space-y-4">
            {filteredReviews?.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}