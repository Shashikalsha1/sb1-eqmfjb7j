import React from 'react';
import { Clock, Star, Calendar, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {service.images && service.images.length > 0 ? (
          <img
            src={service.images[0]}
            alt={service.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              target.onerror = null; // Prevent infinite loop
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Truck className="h-12 w-12 text-gray-400" />
          </div>
        )}
        {service.images && service.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-xs">
            +{service.images.length - 1} more
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
            {service.category}
          </span>
          {service.averageRating && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-yellow-700">
                {service.averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-2">{service.name}</h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{service.description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{service.duration} minutes</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(service.price)}
          </span>
          <button 
            onClick={() => onBook(service.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}