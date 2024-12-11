import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useServices } from '@/hooks/useServices';
import { ServiceGrid } from '@/components/services/ServiceGrid';
import { ServiceSearch } from '@/components/services/ServiceSearch';
import { Truck } from 'lucide-react';

export function AdminServicesPage() {
  const { services, loading, error } = useServices();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredServices = services?.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Services Overview</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all services across vendors
            </p>
          </div>
          <ServiceSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : filteredServices?.length === 0 ? (
          <div className="text-center py-12">
            <Truck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search terms' : 'Services will appear here once added'}
            </p>
          </div>
        ) : (
          <ServiceGrid services={filteredServices || []} onBook={() => {}} />
        )}
      </div>
    </DashboardLayout>
  );
}