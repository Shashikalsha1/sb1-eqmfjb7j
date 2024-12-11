import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, Star, TrendingUp } from 'lucide-react';
import { useServiceDashboardStats } from '@/hooks/useServiceDashboardStats';
import { formatPrice } from '@/lib/utils';

export function ServiceVendorOverview() {
  const { user } = useAuth();
  const { activeServices, pendingBookings, averageRating, monthlyRevenue, loading, error } = useServiceDashboardStats();

  const stats = [
    { 
      name: 'Active Services', 
      stat: loading ? '-' : activeServices.toString(), 
      icon: Calendar,
      color: 'bg-blue-500'
    },
    { 
      name: 'Pending Bookings', 
      stat: loading ? '-' : pendingBookings.toString(), 
      icon: Clock,
      color: 'bg-yellow-500'
    },
    { 
      name: 'Average Rating', 
      stat: loading ? '-' : averageRating.toFixed(1), 
      icon: Star,
      color: 'bg-green-500'
    },
    { 
      name: 'Monthly Revenue', 
      stat: loading ? '-' : formatPrice(monthlyRevenue), 
      icon: TrendingUp,
      color: 'bg-indigo-500'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Welcome back, {user?.displayName}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your services and bookings.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`absolute ${item.color} rounded-md p-3`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              {loading ? (
                <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
              ) : (
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              )}
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No recent bookings</p>
          )}
        </div>
      </div>
    </div>
  );
}