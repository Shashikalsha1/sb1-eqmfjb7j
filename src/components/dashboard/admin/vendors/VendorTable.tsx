```typescript
import React from 'react';
import { formatDate } from '@/lib/utils';
import { updateVendorStatus } from '@/lib/admin';
import type { User } from '@/types';
import { AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface VendorTableProps {
  vendors: User[];
}

const statusConfig = {
  pending: {
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
    label: 'Pending'
  },
  active: {
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    label: 'Active'
  },
  suspended: {
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
    label: 'Suspended'
  }
} as const;

export function VendorTable({ vendors }: VendorTableProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [updatingVendorId, setUpdatingVendorId] = React.useState<string | null>(null);

  const handleStatusChange = async (vendorId: string, newStatus: User['status']) => {
    try {
      setError(null);
      setUpdatingVendorId(vendorId);
      
      const result = await updateVendorStatus(vendorId, newStatus);
      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred while updating vendor status');
      console.error('Error updating vendor status:', error);
    } finally {
      setUpdatingVendorId(null);
    }
  };

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No vendors found</h3>
        <p className="mt-1 text-sm text-gray-500">
          New vendor registrations will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor) => {
              const StatusIcon = statusConfig[vendor.status].icon;
              return (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {vendor.displayName}
                        </div>
                        <div className="text-sm text-gray-500">{vendor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {vendor.role === 'service_vendor' ? 'Service Provider' : 'Product Vendor'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(vendor.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StatusIcon className={`h-4 w-4 mr-2 ${statusConfig[vendor.status].color}`} />
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[vendor.status].color}`}>
                        {statusConfig[vendor.status].label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={vendor.status}
                      onChange={(e) => handleStatusChange(vendor.id, e.target.value as User['status'])}
                      disabled={updatingVendorId === vendor.id}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```