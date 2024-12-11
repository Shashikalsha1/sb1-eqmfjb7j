import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, Calendar, Heart, Clock } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { useBookings } from '@/hooks/useBookings';
import { formatPrice } from '@/lib/utils';

export function CustomerOverview() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { bookings } = useBookings();

  const stats = [
    { 
      name: 'Total Orders', 
      stat: orders?.length || 0, 
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    { 
      name: 'Active Bookings', 
      stat: bookings?.filter(b => b.status === 'confirmed').length || 0, 
      icon: Calendar,
      color: 'bg-green-500'
    },
    { 
      name: 'Wishlist Items', 
      stat: '0', 
      icon: Heart,
      color: 'bg-pink-500'
    },
    { 
      name: 'Pending Reviews', 
      stat: '0', 
      icon: Clock,
      color: 'bg-purple-500'
    },
  ];

  const recentOrders = orders?.slice(0, 5) || [];
  const recentBookings = bookings?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Welcome back, {user?.displayName}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your activity
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
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="text-sm text-gray-500">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-4 py-5 sm:px-6 text-sm text-gray-500">No recent orders</p>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {booking.serviceName}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {booking.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} at {booking.slot}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-4 py-5 sm:px-6 text-sm text-gray-500">No recent bookings</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}