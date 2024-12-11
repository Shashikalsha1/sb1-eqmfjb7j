import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import type { Service } from '@/types';

interface AvailabilityTabProps {
  form: UseFormReturn<Partial<Service>>;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return [`${hour}:00`, `${hour}:30`];
}).flat();

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function AvailabilityTab({ form }: AvailabilityTabProps) {
  const { register } = form;

  return (
    <div className="space-y-6">
      {daysOfWeek.map((day) => (
        <div key={day}>
          <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
            {day}
          </label>
          <select
            multiple
            {...register(`availability.${day}.slots` as any)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            size={5}
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Hold Ctrl/Cmd to select multiple slots
          </p>
        </div>
      ))}
    </div>
  );
}