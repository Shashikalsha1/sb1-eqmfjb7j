import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { ServiceGrid } from '@/components/services/ServiceGrid';
import { ServiceSearch } from '@/components/services/ServiceSearch';
import { ServiceFilter } from '@/components/services/ServiceFilter';
import { useServices } from '@/hooks/useServices';
import { MainLayout } from '@/components/layout/MainLayout';

export function ServicesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { services, loading, error } = useServices({ publicOnly: true });

  const filteredServices = services?.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBook = (serviceId: string) => {
    navigate(`/services/${serviceId}/book`);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marine Services</h1>
            <p className="mt-2 text-gray-600">Professional marine services for your vessel</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <ServiceSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <ServiceFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">Error loading services: {error}</p>
              </div>
            ) : filteredServices?.length === 0 ? (
              <div className="text-center bg-white rounded-lg shadow-sm p-12">
                <Truck className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || selectedCategory ? 'Try adjusting your filters' : 'Services will appear here once added'}
                </p>
              </div>
            ) : (
              <ServiceGrid services={filteredServices || []} onBook={handleBook} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}