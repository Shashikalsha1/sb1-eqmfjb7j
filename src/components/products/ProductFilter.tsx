import React from 'react';
import { Anchor, Box, Filter } from 'lucide-react';

interface ProductFilterProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

const productTypes = [
  {
    id: 'ship_spares',
    name: 'Ship Spares',
    description: 'Spare parts and components for ships',
    icon: Anchor
  },
  {
    id: 'ship_store',
    name: 'Ship Store',
    description: 'General ship stores and supplies',
    icon: Box
  }
];

export function ProductFilter({ selectedType, onTypeChange }: ProductFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-900">Filter Products</h3>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onTypeChange(null)}
          className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
            selectedType === null
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Products
        </button>

        {productTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                selectedType === type.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div>{type.name}</div>
                <div className="text-xs text-gray-500">{type.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}