import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { createCommissionTier, updateCommissionTier } from '@/lib/commission';
import type { CommissionTier } from '@/types';

interface CommissionTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier?: CommissionTier | null;
}

interface CommissionTierFormData {
  type: 'product' | 'service';
  monthlyRevenue: number;
  rate: number;
}

export function CommissionTierModal({ isOpen, onClose, tier }: CommissionTierModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CommissionTierFormData>({
    defaultValues: tier || {
      type: 'product',
      monthlyRevenue: 0,
      rate: 5
    }
  });

  const onSubmit = async (data: CommissionTierFormData) => {
    try {
      if (tier) {
        await updateCommissionTier(tier.id, data);
      } else {
        await createCommissionTier({ ...data, status: 'active' });
      }
      onClose();
    } catch (error) {
      console.error('Error saving commission tier:', error);
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
                {tier ? 'Edit Commission Tier' : 'Add Commission Tier'}
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
                  <label className="block text-sm font-medium text-gray-700">Monthly Revenue</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('monthlyRevenue', {
                      required: 'Monthly revenue is required',
                      min: { value: 0, message: 'Monthly revenue must be positive' }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.monthlyRevenue && (
                    <p className="mt-1 text-sm text-red-600">{errors.monthlyRevenue.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
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