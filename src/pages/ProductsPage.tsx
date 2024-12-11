import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductSearch } from '@/components/products/ProductSearch';
import { ProductFilter } from '@/components/products/ProductFilter';
import { useProducts } from '@/hooks/useProducts';
import { MainLayout } from '@/components/layout/MainLayout';

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { products, loading, error } = useProducts({ publicOnly: true });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || product.productType === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipping Products</h1>
            <p className="mt-2 text-gray-600">Browse our selection of shipping supplies</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <ProductSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilter
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">Error loading products: {error}</p>
              </div>
            ) : filteredProducts?.length === 0 ? (
              <div className="text-center bg-white rounded-lg shadow-sm p-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || selectedType ? 'Try adjusting your filters' : 'Products will appear here once added'}
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts || []} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}