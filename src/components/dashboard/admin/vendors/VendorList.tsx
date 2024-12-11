import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useVendors } from '@/hooks/useVendors';
import { VendorTable } from './VendorTable';
import type { User } from '@/types';

export function VendorList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<User['status'] | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<'all' | 'service_vendor' | 'product_vendor'>('all');
  const { vendors, loading, error } = useVendors();

  const filteredVendors = vendors?.filter(vendor => {
    const matchesSearch = 
      vendor.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
    const matchesRole = selectedRole === 'all' || vendor.role === selectedRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vendors</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor vendor accounts
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as User['status'] | 'all')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as typeof selectedRole)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All Vendors</option>
                  <option value="service_vendor">Service Vendors</option>
                  <option value="product_vendor">Product Vendors</option>
                </select>
              </div>
            </div>

            {error ? (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            ) : loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <VendorTable vendors={filteredVendors || []} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}