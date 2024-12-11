import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, Lock, Bell, CreditCard } from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
            {/* Profile Settings */}
            <div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Profile Information</h3>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={user?.displayName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user?.email}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div>
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Security</h3>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Change Password
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div>
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Notifications</h3>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <input
                    id="email-notifications"
                    name="email-notifications"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="marketing-emails"
                    name="marketing-emails"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-900">
                    Marketing Emails
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Payment Methods</h3>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}