import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductSearch } from '@/components/products/ProductSearch';
import { Package } from 'lucide-react';

export function AdminProductsPage() {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products Overview</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all products across vendors
            </p>
          </div>
          <ProductSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search terms' : 'Products will appear here once added'}
            </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts || []} />
        )}
      </div>
    </DashboardLayout>
  );
}