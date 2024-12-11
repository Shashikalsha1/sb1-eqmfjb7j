import React from 'react';
import { 
  Filter, 
  Wrench, 
  Search, 
  Anchor, 
  Ship, 
  ScrollText, 
  Package, 
  Fuel, 
  Wifi, 
  Truck, 
  AlertCircle, 
  GraduationCap 
} from 'lucide-react';

interface ServiceFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const serviceCategories = [
  {
    id: 'repair_maintenance',
    name: 'Repair and Maintenance Services',
    description: 'Ship repair and maintenance solutions',
    icon: Wrench
  },
  {
    id: 'survey_inspection',
    name: 'Survey and Inspection Services',
    description: 'Professional marine surveys and inspections',
    icon: Search
  },
  {
    id: 'dry_docking',
    name: 'Dry Docking Services',
    description: 'Complete dry docking solutions',
    icon: Anchor
  },
  {
    id: 'certification_compliance',
    name: 'Ship Certification and Compliance',
    description: 'Regulatory compliance and certifications',
    icon: ScrollText
  },
  {
    id: 'spare_parts',
    name: 'Spare Parts Sourcing and Delivery',
    description: 'Marine spare parts procurement',
    icon: Package
  },
  {
    id: 'ship_management',
    name: 'Ship Management Services',
    description: 'Complete vessel management solutions',
    icon: Ship
  },
  {
    id: 'fuel_bunker',
    name: 'Fuel and Bunker Services',
    description: 'Marine fuel supply and bunkering',
    icon: Fuel
  },
  {
    id: 'it_communication',
    name: 'IT and Communication Services',
    description: 'Marine IT and connectivity solutions',
    icon: Wifi
  },
  {
    id: 'logistics_chartering',
    name: 'Logistics and Chartering Services',
    description: 'Vessel chartering and logistics',
    icon: Truck
  },
  {
    id: 'emergency_salvage',
    name: 'Emergency and Salvage Services',
    description: '24/7 emergency response and salvage',
    icon: AlertCircle
  },
  {
    id: 'training_consultancy',
    name: 'Training and Consultancy',
    description: 'Maritime training and consulting',
    icon: GraduationCap
  }
];

export function ServiceFilter({ selectedCategory, onCategoryChange }: ServiceFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-900">Filter Services</h3>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
            selectedCategory === null
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Services
        </button>

        {serviceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                selectedCategory === category.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div>{category.name}</div>
                <div className="text-xs text-gray-500">{category.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}