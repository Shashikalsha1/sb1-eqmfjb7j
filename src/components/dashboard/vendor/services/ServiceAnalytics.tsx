import React from 'react';
import { useServices } from '@/hooks/useServices';
import { TrendingUp, Users, Star, DollarSign } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function ServiceAnalytics() {
  const { services } = useServices();

  const stats = [
    {
      name: 'Total Services',
      value: services?.length || 0,
      icon: TrendingUp,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Active Bookings',
      value: '24',
      icon: Users,
      change: '+5%',
      changeType: 'positive',
    },
    {
      name: 'Average Rating',
      value: '4.8',
      icon: Star,
      change: '+0.3',
      changeType: 'positive',
    },
    {
      name: 'Monthly Revenue',
      value: formatPrice(12500),
      icon: DollarSign,
      change: '+18%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Service Analytics</h2>

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
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Add more analytics components here */}
    </div>
  );
}