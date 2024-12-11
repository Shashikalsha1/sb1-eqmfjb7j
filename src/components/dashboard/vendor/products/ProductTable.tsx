import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { deleteProduct, updateProductStatus } from '@/lib/products';
import type { Product } from '@/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const handleDelete = async (product: Product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(product.id);
      if (result.error) {
        alert('Error deleting product: ' + result.error);
      }
    }
  };

  const handleStatusChange = async (product: Product, status: Product['status']) => {
    const result = await updateProductStatus(product.id, status);
    if (result.error) {
      alert('Error updating product status: ' + result.error);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4">
                <div className="flex items-start">
                  <div className="max-w-xs">
                    <div className="text-sm font-medium text-gray-900 break-words line-clamp-2">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 break-words line-clamp-2 mt-1">
                      {product.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatPrice(product.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.stock}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${product.status === 'active' ? 'bg-green-100 text-green-800' : 
                    product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[220px] bg-white rounded-md shadow-lg py-1 z-50"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Link to={`/dashboard/product_vendor/products/edit/${product.id}`} className="flex items-center w-full">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="my-1 border-t border-gray-100" />
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          Status
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.SubContent
                            className="min-w-[220px] bg-white rounded-md shadow-lg py-1"
                            sideOffset={2}
                            alignOffset={-5}
                          >
                            <DropdownMenu.Item
                              onClick={() => handleStatusChange(product, 'active')}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              Active
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onClick={() => handleStatusChange(product, 'draft')}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              Draft
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onClick={() => handleStatusChange(product, 'archived')}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              Archived
                            </DropdownMenu.Item>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Sub>
                      <DropdownMenu.Separator className="my-1 border-t border-gray-100" />
                      <DropdownMenu.Item
                        onClick={() => handleDelete(product)}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}