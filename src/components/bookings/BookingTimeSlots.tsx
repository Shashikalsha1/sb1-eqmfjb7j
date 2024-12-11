import React from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import type { Service } from '@/types';

interface BookingTimeSlotsProps {
  service: Service;
  selectedDate: Date;
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}

export function BookingTimeSlots({ service, selectedDate, selectedSlot, onSelectSlot }: BookingTimeSlotsProps) {
  const dayName = format(selectedDate, 'EEEE').toLowerCase();
  const availableSlots = service.availability[dayName]?.slots || [];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">
          Available time slots for {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Select a time slot for your appointment
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelectSlot(slot)}
            className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium ${
              selectedSlot === slot
                ? 'bg-indigo-600 text-white border-transparent'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Clock className="h-4 w-4 mr-2" />
            {slot}
          </button>
        ))}
      </div>

      {availableSlots.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No available slots</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a different date
          </p>
        </div>
      )}
    </div>
  );
}