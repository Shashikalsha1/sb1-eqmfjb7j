import React from 'react';
import { Star } from 'lucide-react';

export function EmptyReviews() {
  return (
    <div className="text-center py-12">
      <Star className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
      <p className="mt-1 text-sm text-gray-500">
        Reviews will appear here when customers leave them
      </p>
    </div>
  );
}