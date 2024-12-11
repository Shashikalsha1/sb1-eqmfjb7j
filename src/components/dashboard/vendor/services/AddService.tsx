import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Info, Clock, Calendar, Image, DollarSign } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { BasicInfoTab } from './tabs/BasicInfoTab';
import { PricingTab } from './tabs/PricingTab';
import { AvailabilityTab } from './tabs/AvailabilityTab';
import { MediaTab } from './tabs/MediaTab';
import { createService } from '@/lib/services';
import type { Service } from '@/types';

export function AddService() {
  const navigate = useNavigate();
  const form = useForm<Partial<Service>>();
  const [activeTab, setActiveTab] = React.useState('basic-info');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: Partial<Service>) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Get the FileList from the form
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const images = fileInput?.files || null;
      
      const result = await createService(data, images);
      
      if (result.error) {
        setError(result.error);
        return;
      }

      navigate('/dashboard/service_vendor/services');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a new service by filling out the information below
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex space-x-4 border-b border-gray-200">
            <Tabs.Trigger
              value="basic-info"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'basic-info'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Basic Info
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="pricing"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'pricing'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="availability"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'availability'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Availability
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="media"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'media'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Image className="h-4 w-4 mr-2" />
                Media
              </div>
            </Tabs.Trigger>
          </Tabs.List>

          <div className="mt-6">
            <Tabs.Content value="basic-info">
              <BasicInfoTab form={form} />
            </Tabs.Content>
            <Tabs.Content value="pricing">
              <PricingTab form={form} />
            </Tabs.Content>
            <Tabs.Content value="availability">
              <AvailabilityTab form={form} />
            </Tabs.Content>
            <Tabs.Content value="media">
              <MediaTab form={form} />
            </Tabs.Content>
          </div>
        </Tabs.Root>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/service_vendor/services')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
}