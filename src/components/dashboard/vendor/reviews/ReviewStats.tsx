import React from 'react';
import { Star, ThumbsUp, MessageSquare, AlertCircle } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';

export function ReviewStats() {
  const { reviews, loading, error } = useReviews();

  const stats = [
    {
      name: 'Average Rating',
      value: loading ? '-' : calculateAverageRating(reviews || []).toFixed(1),
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      name: 'Total Reviews',
      value: loading ? '-' : reviews?.length || 0,
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      name: 'Positive Reviews',
      value: loading ? '-' : calculatePositiveReviews(reviews || []),
      icon: ThumbsUp,
      color: 'bg-green-500'
    },
    {
      name: 'Pending Reviews',
      value: loading ? '-' : calculatePendingReviews(reviews || []),
      icon: AlertCircle,
      color: 'bg-orange-500'
    }
  ];

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div className={`absolute ${stat.color} rounded-md p-3`}>
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            {loading ? (
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            )}
          </dd>
        </div>
      ))}
    </div>
  );
}

function calculateAverageRating(reviews: any[]) {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}

function calculatePositiveReviews(reviews: any[]) {
  return reviews.filter(review => review.rating >= 4).length;
}

function calculatePendingReviews(reviews: any[]) {
  return reviews.filter(review => review.status === 'pending').length;
}