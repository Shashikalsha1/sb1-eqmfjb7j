import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Users, Package, Calendar, TrendingUp } from 'lucide-react';
import { useAdminStats } from '@/hooks/useAdminStats';
import { formatPrice } from '@/lib/utils';

export function AdminDashboard() {
  const { user } = useAuth();
  const { totalRevenue, activeVendors, totalProducts, totalServices, loading } = useAdminStats();

  const stats = [
    { 
      name: 'Active Vendors', 
      stat: loading ? '-' : activeVendors.toString(), 
      icon: Users,
      color: 'bg-blue-500'
    },
    { 
      name: 'Total Products', 
      stat: loading ? '-' : totalProducts.toString(), 
      icon: Package,
      color: 'bg-green-500'
    },
    { 
      name: 'Total Services', 
      stat: loading ? '-' : totalServices.toString(), 
      icon: Calendar,
      color: 'bg-purple-500'
    },
    { 
      name: 'Monthly Revenue', 
      stat: loading ? '-' : formatPrice(totalRevenue), 
      icon: TrendingUp,
      color: 'bg-indigo-500'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Welcome back, {user?.displayName}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening across your platform today.
          </p>
        </div>

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

        {/* Add more dashboard widgets here */}
      </div>
    </DashboardLayout>
  );
}