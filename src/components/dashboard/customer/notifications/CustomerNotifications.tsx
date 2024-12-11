import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Bell, Package, Calendar, Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'order' | 'booking' | 'review' | 'system';
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

// TODO: Replace with actual notifications from Firebase
const mockNotifications: Notification[] = [];

export function CustomerNotifications() {
  const [selectedType, setSelectedType] = React.useState('all');

  const filteredNotifications = mockNotifications.filter(notification =>
    selectedType === 'all' || notification.type === selectedType
  );

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return Package;
      case 'booking':
        return Calendar;
      case 'review':
        return Star;
      default:
        return Bell;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your latest activities
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="mb-6">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Notifications</option>
                <option value="order">Orders</option>
                <option value="booking">Bookings</option>
                <option value="review">Reviews</option>
                <option value="system">System</option>
              </select>
            </div>

            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-white' : 'bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 p-2 rounded-full ${
                          notification.read ? 'bg-gray-100' : 'bg-blue-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            notification.read ? 'text-gray-500' : 'text-blue-500'
                          }`} />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className={`text-sm font-medium ${
                            notification.read ? 'text-gray-900' : 'text-blue-900'
                          }`}>
                            {notification.title}
                          </p>
                          <p className={`mt-1 text-sm ${
                            notification.read ? 'text-gray-500' : 'text-blue-700'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-gray-500">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}