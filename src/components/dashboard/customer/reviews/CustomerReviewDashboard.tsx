import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CustomerReviewList } from '@/components/reviews/CustomerReviewList';
import { useCustomerReviews } from '@/hooks/useCustomerReviews';

export function CustomerReviewDashboard() {
  const { reviews, loading } = useCustomerReviews();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your reviews for products and services.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : reviews?.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">You haven't written any reviews yet.</p>
          </div>
        ) : (
          <CustomerReviewList reviews={reviews || []} />
        )}
      </div>
    </DashboardLayout>
  );
}