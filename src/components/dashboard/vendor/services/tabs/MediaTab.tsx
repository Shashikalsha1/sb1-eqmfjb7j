import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AutoImageUpload } from '@/components/shared/AutoImageUpload';
import type { Service } from '@/types';

interface MediaTabProps {
  form: UseFormReturn<Partial<Service>>;
}

export function MediaTab({ form }: MediaTabProps) {
  const { setValue, formState: { errors } } = form;

  const handleUploadComplete = (urls: string[]) => {
    setValue('images', urls);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Images
        </label>
        <div className="mt-2">
          <AutoImageUpload
            onUploadComplete={handleUploadComplete}
            basePath="services"
            maxFiles={5}
          />
        </div>
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}
      </div>
    </div>
  );
}