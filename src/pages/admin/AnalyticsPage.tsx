import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TrendingUp, Users, Package, Calendar, DollarSign } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useAdminStats } from '@/hooks/useAdminStats';

export function AdminAnalyticsPage() {
  const { totalRevenue, activeVendors, totalProducts, totalServices, loading, error } = useAdminStats();

  const stats = [
    {
      name: 'Total Revenue',
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      loading,
    },
    {
      name: 'Active Vendors',
      value: activeVendors.toString(),
      icon: Users,
      loading,
    },
    {
      name: 'Total Products',
      value: totalProducts.toString(),
      icon: Package,
      loading,
    },
    {
      name: 'Total Services',
      value: totalServices.toString(),
      icon: Calendar,
      loading,
    },
  ];

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="mt-1 text-sm text-gray-500">
            Platform performance and metrics overview
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                {stat.loading ? (
                  <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                )}
              </dd>
            </div>
          ))}
        </div>

        {/* Add more analytics components here */}
      </div>
    </DashboardLayout>
  );
}