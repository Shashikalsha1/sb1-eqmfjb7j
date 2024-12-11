import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Order Completed',
    message: 'Order #1234 has been successfully delivered.',
    time: '2 hours ago',
    icon: CheckCircle,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Product "Wireless Headphones" is running low on stock.',
    time: '5 hours ago',
    icon: AlertCircle,
  },
  {
    id: 3,
    type: 'info',
    title: 'New Feature Available',
    message: 'Check out our new analytics dashboard for better insights.',
    time: '1 day ago',
    icon: Info,
  },
];

export function NotificationCenter() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your latest activities and alerts
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Bell className="h-4 w-4 mr-2" />
          Mark all as read
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <li key={notification.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${
                      notification.type === 'success' ? 'text-green-500' :
                      notification.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}