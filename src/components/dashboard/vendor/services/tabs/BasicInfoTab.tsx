import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SERVICE_CATEGORIES } from '@/lib/constants/services';
import type { Service } from '@/types';

interface BasicInfoTabProps {
  form: UseFormReturn<Partial<Service>>;
}

export function BasicInfoTab({ form }: BasicInfoTabProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selectedCategory = watch('category');

  // Reset subcategory when category changes
  useEffect(() => {
    setValue('subCategory', '');
  }, [selectedCategory, setValue]);

  const selectedCategoryConfig = SERVICE_CATEGORIES.find(cat => cat.id === selectedCategory);
  const subCategories = selectedCategoryConfig?.subCategories || [];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <input
          type="text"
          {...register('name', { required: 'Service name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
          {selectedCategoryConfig && (
            <p className="mt-1 text-sm text-gray-500">
              {selectedCategoryConfig.description}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
            Sub Category
          </label>
          <select
            {...register('subCategory', { required: 'Sub category is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={!selectedCategory}
          >
            <option value="">Select a sub category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
          {errors.subCategory && (
            <p className="mt-1 text-sm text-red-600">{errors.subCategory.message}</p>
          )}
          {selectedCategory && !subCategories.length && (
            <p className="mt-1 text-sm text-gray-500">
              Please select a category first
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          {...register('status', { required: 'Status is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>
    </div>
  );
}