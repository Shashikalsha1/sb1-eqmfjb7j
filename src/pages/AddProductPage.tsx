import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Package, Anchor, Box } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { createProduct } from '@/lib/products';
import { ImageUpload } from '@/components/shared/ImageUpload';
import type { Product } from '@/types';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  stock: number;
  status: Product['status'];
  productType: 'ship_spares' | 'ship_store';
  images?: FileList;
}

const productTypes = [
  {
    id: 'ship_spares',
    title: 'Ship Spares',
    description: 'Spare parts and components for ships',
    icon: Anchor,
    categories: {
      'Main Engine Spares': [
        'Cylinder Heads',
        'Crankshafts Bearings',
        'Connecting Rods',
        'Turbochargers',
        'Fuel Injection Systems'
      ],
      'Auxiliary Engine Spares': [
        'Generator Components',
        'Heat Exchangers and Coolers',
        'Starters and Alternators'
      ],
      'Propulsion System Spares': [
        'Propellers and Shafts',
        'Thrusters',
        'Bearings and Seals'
      ],
      'Electrical System Spares': [
        'Switchboards and Panels',
        'Cables, Sensors, and Relays',
        'Lighting Systems'
      ],
      'Deck Machinery Spares': [
        'Winches and Windlasses',
        'Capstans',
        'Cranes and Davits'
      ],
      'Pump and Valve Spares': [
        'Bilge Pumps',
        'Ballast Pumps',
        'Fuel and Lubrication Pumps',
        'Valves, Fittings, and Actuators'
      ],
      'Steering Gear Spares': [
        'Rudders and Steering Systems',
        'Hydraulic Units and Power Packs'
      ],
      'Safety Equipment Spares': [
        'Firefighting Systems',
        'Lifeboat Davits and Accessories',
        'Emergency Signaling Devices'
      ],
      'HVAC System Spares': [
        'Air Conditioning Units',
        'Ventilation Fans',
        'Heating Systems'
      ]
    }
  },
  {
    id: 'ship_store',
    title: 'Ship Store',
    description: 'General ship stores and supplies',
    icon: Box,
    categories: {
      'Deck Stores': [
        'Ropes and Lines',
        'Paint and Coatings',
        'Cleaning Supplies'
      ],
      'Engine Room Stores': [
        'Lubricants',
        'Filters',
        'Gaskets and Seals'
      ],
      'Electrical Stores': [
        'Cables and Wiring',
        'Fuses and Breakers',
        'Light Bulbs'
      ],
      'Safety Stores': [
        'Personal Protective Equipment',
        'First Aid Supplies',
        'Safety Signs'
      ],
      'Galley Stores': [
        'Kitchen Equipment',
        'Food Storage',
        'Cleaning Supplies'
      ],
      'Cabin Stores': [
        'Bedding',
        'Toiletries',
        'Room Supplies'
      ],
      'Tools and Equipment': [
        'Hand Tools',
        'Power Tools',
        'Testing Equipment'
      ],
      'Stationery and Navigation Supplies': [
        'Charts and Publications',
        'Office Supplies',
        'Log Books'
      ]
    }
  }
];

export function AddProductPage() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ProductFormData>({
    defaultValues: {
      productType: 'ship_spares',
      status: 'draft'
    }
  });

  const productType = watch('productType');
  const selectedCategory = watch('category');
  const selectedProductType = productTypes.find(type => type.id === productType);
  const categories = Object.keys(selectedProductType?.categories || {});
  const subCategories = selectedCategory ? selectedProductType?.categories[selectedCategory] || [] : [];

  // Reset subcategory when category changes
  useEffect(() => {
    setValue('subCategory', '');
  }, [selectedCategory, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const result = await createProduct({
        ...data,
        images: selectedImages
      }, data.images);
      
      if (result.error) {
        throw new Error(result.error);
      }

      navigate('/dashboard/product_vendor/products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="mt-1 text-sm text-gray-500">Create a new product listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
          {/* Product Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Product Type
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {productTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.id}
                    className={`
                      relative flex cursor-pointer rounded-lg border p-4 focus:outline-none
                      ${productType === type.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'}
                    `}
                  >
                    <input
                      type="radio"
                      {...register('productType')}
                      value={type.id}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <Icon className={`h-6 w-6 ${productType === type.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <div className="ml-3">
                        <span className={`block text-sm font-medium ${productType === type.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                          {type.title}
                        </span>
                        <span className={`block text-sm ${productType === type.id ? 'text-indigo-700' : 'text-gray-500'}`}>
                          {type.description}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Product name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="pl-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                {...register('stock', { 
                  required: 'Stock is required',
                  min: { value: 0, message: 'Stock must be positive' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                Sub Category
              </label>
              <select
                {...register('subCategory', { required: 'Sub category is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={!selectedCategory}
              >
                <option value="">Select a sub category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="mt-1 text-sm text-red-600">{errors.subCategory.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register('status', { required: 'Status is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            <ImageUpload
              value={selectedImages}
              onChange={(files) => {
                if (files) {
                  const urls = Array.from(files).map(file => URL.createObjectURL(file));
                  setSelectedImages(urls);
                }
              }}
              multiple
              maxFiles={5}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/product_vendor/products')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <Package className="h-5 w-5 mr-2" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}