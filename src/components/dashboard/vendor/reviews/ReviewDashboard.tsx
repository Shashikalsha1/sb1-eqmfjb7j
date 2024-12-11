import React from 'react';
import { ReviewList } from './ReviewList';
import { ReviewStats } from './ReviewStats';

export function ReviewDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage and respond to customer reviews
        </p>
      </div>

      <ReviewStats />
      <ReviewList />
    </div>
  );
}