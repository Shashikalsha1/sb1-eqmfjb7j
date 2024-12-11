import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import type { Service } from '@/types';

interface BookingSummaryProps {
  service: Service;
  selectedDate: Date;
  selectedSlot: string;
  onConfirm: () => void;
  onBack: () => void;
}

export function BookingSummary({ 
  service, 
  selectedDate, 
  selectedSlot, 
  onConfirm,
  onBack 
}: BookingSummaryProps) {
  const addBooking = useCartStore(state => state.addBooking);

  const handleConfirm = () => {
    addBooking(service, selectedDate, selectedSlot);
    onConfirm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Booking Summary</h3>
        <p className="mt-1 text-sm text-gray-500">
          Review your booking details before confirming
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900">{service.name}</h4>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(service.price)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            {format(selectedDate, 'MMMM d, yyyy')}
          </div>
          <div className="flex items-center text-sm text-gray-700 mt-2">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            {selectedSlot}
          </div>
          <div className="flex items-center text-sm text-gray-700 mt-2">
            <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
            Payment will be handled during checkout
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}