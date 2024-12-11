import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { updateService } from '@/lib/services';
import { useServices } from '@/hooks/useServices';
import { BasicInfoTab } from '@/components/dashboard/vendor/services/tabs/BasicInfoTab';
import { PricingTab } from '@/components/dashboard/vendor/services/tabs/PricingTab';
import { AvailabilityTab } from '@/components/dashboard/vendor/services/tabs/AvailabilityTab';
import { MediaTab } from '@/components/dashboard/vendor/services/tabs/MediaTab';
import type { Service } from '@/types';
import * as Tabs from '@radix-ui/react-tabs';

interface ServiceFormData extends Partial<Service> {
  images?: string[];
}

export function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, loading } = useServices();
  const service = services?.find(s => s.id === id);
  const [activeTab, setActiveTab] = React.useState('basic-info');

  const form = useForm<ServiceFormData>({
    defaultValues: {
      images: [],
    }
  });
  
  const { reset, handleSubmit, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (service) {
      reset({
        ...service,
        images: service.images || [],
      });
    }
  }, [service, reset]);

  const onSubmit = async (data: ServiceFormData) => {
    try {
      if (!id) return;
      const result = await updateService(id, data);
      
      if (result.error) {
        throw new Error(result.error);
      }

      navigate('/dashboard/service_vendor/services');
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!service) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <p>Service not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
            <p className="mt-1 text-sm text-gray-500">Update service information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                Basic Info
              </Tabs.Trigger>
              <Tabs.Trigger
                value="pricing"
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'pricing'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Pricing
              </Tabs.Trigger>
              <Tabs.Trigger
                value="availability"
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'availability'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Availability
              </Tabs.Trigger>
              <Tabs.Trigger
                value="media"
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'media'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Media
              </Tabs.Trigger>
            </Tabs.List>

            <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
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
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <Calendar className="h-5 w-5 mr-2" />
                  Update Service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}