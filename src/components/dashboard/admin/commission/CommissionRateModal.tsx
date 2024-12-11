import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { createCommissionRate, updateCommissionRate } from '@/lib/commission';
import type { CommissionRate } from '@/types';

interface CommissionRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  rate?: CommissionRate | null;
}

interface CommissionRateFormData {
  type: 'product' | 'service';
  category: string;
  rate: number;
  minAmount: number;
  maxAmount: number | null;
}

export function CommissionRateModal({ isOpen, onClose, rate }: CommissionRateModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CommissionRateFormData>({
    defaultValues: rate || {
      type: 'product',
      category: '',
      rate: 5,
      minAmount: 0,
      maxAmount: null
    }
  });

  const onSubmit = async (data: CommissionRateFormData) => {
    try {
      if (rate) {
        await updateCommissionRate(rate.id, data);
      } else {
        await createCommissionRate({ ...data, status: 'active' });
      }
      onClose();
    } catch (error) {
      console.error('Error saving commission rate:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {rate ? 'Edit Commission Rate' : 'Add Commission Rate'}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    {...register('type', { required: 'Type is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    {...register('category', { required: 'Category is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('rate', {
                      required: 'Rate is required',
                      min: { value: 0, message: 'Rate must be positive' },
                      max: { value: 100, message: 'Rate cannot exceed 100%' }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.rate && (
                    <p className="mt-1 text-sm text-red-600">{errors.rate.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Min Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('minAmount', {
                        required: 'Min amount is required',
                        min: { value: 0, message: 'Min amount must be positive' }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.minAmount && (
                      <p className="mt-1 text-sm text-red-600">{errors.minAmount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('maxAmount')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Leave empty for no limit"
                    />
                    {errors.maxAmount && (
                      <p className="mt-1 text-sm text-red-600">{errors.maxAmount.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}