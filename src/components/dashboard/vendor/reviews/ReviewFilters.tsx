import React from 'react';

interface ReviewFiltersProps {
  selectedRating: number | 'all';
  selectedStatus: 'all' | 'pending' | 'approved' | 'rejected';
  onRatingChange: (rating: number | 'all') => void;
  onStatusChange: (status: 'all' | 'pending' | 'approved' | 'rejected') => void;
}

export function ReviewFilters({
  selectedRating,
  selectedStatus,
  onRatingChange,
  onStatusChange
}: ReviewFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="sm:w-48">
        <select
          value={selectedRating}
          onChange={(e) => onRatingChange(e.target.value === 'all' ? 'all' : Number(e.target.value))}
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
          onChange={(e) => onStatusChange(e.target.value as typeof selectedStatus)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}