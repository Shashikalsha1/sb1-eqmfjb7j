import React from 'react';
import { ServiceCard } from './ServiceCard';
import type { Service } from '@/types';

interface ServiceGridProps {
  services: Service[];
  onBook: (serviceId: string) => void;
}

export function ServiceGrid({ services, onBook }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onBook={onBook} />
      ))}
    </div>
  );
}