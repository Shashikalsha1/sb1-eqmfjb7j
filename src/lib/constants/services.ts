import type { ServiceCategory } from '@/types';

export interface ServiceSubCategory {
  id: string;
  name: string;
  description: string;
}

export interface ServiceCategoryConfig {
  id: ServiceCategory;
  name: string;
  description: string;
  subCategories: ServiceSubCategory[];
}

export const SERVICE_CATEGORIES: ServiceCategoryConfig[] = [
  {
    id: 'repair_maintenance',
    name: 'Repair and Maintenance Services',
    description: 'Ship repair and maintenance solutions',
    subCategories: [
      {
        id: 'engine_overhaul',
        name: 'Main and Auxiliary Engine Overhaul',
        description: 'Complete engine maintenance and repair services'
      },
      {
        id: 'hull_maintenance',
        name: 'Hull Cleaning and Painting',
        description: 'Hull maintenance and protective coating services'
      },
      {
        id: 'propeller_repairs',
        name: 'Propeller and Rudder Repairs',
        description: 'Propulsion system maintenance and repairs'
      }
    ]
  },
  {
    id: 'survey_inspection',
    name: 'Survey and Inspection Services',
    description: 'Professional marine surveys and inspections',
    subCategories: [
      {
        id: 'class_surveys',
        name: 'Class Surveys (Hull, Machinery, and Systems)',
        description: 'Comprehensive vessel classification surveys'
      },
      {
        id: 'pre_purchase',
        name: 'Pre-purchase Inspections',
        description: 'Detailed vessel condition assessments'
      },
      {
        id: 'underwater_surveys',
        name: 'Underwater Surveys (Diving Services)',
        description: 'Professional underwater inspection services'
      }
    ]
  },
  {
    id: 'dry_docking',
    name: 'Dry Docking Services',
    description: 'Complete dry docking solutions',
    subCategories: [
      {
        id: 'hull_structural',
        name: 'Hull and Structural Repairs',
        description: 'Major structural maintenance and repairs'
      },
      {
        id: 'tank_cleaning',
        name: 'Ballast Tank Cleaning and Coating',
        description: 'Tank maintenance and protective coating'
      },
      {
        id: 'safety_equipment',
        name: 'Lifeboat and Safety Equipment Servicing',
        description: 'Safety equipment maintenance and certification'
      }
    ]
  },
  {
    id: 'certification_compliance',
    name: 'Ship Certification and Compliance',
    description: 'Regulatory compliance and certifications',
    subCategories: [
      {
        id: 'doc_services',
        name: 'Document of Compliance (DOC) Services',
        description: 'Compliance documentation management'
      },
      {
        id: 'ism_isps',
        name: 'ISM and ISPS Certification Support',
        description: 'Safety and security certification assistance'
      },
      {
        id: 'flag_state',
        name: 'Flag State Inspection Coordination',
        description: 'Flag state compliance and inspection services'
      }
    ]
  },
  {
    id: 'spare_parts',
    name: 'Spare Parts Sourcing and Delivery',
    description: 'Marine spare parts procurement',
    subCategories: [
      {
        id: 'oem_parts',
        name: 'OEM Spare Parts Sourcing',
        description: 'Original equipment manufacturer parts'
      },
      {
        id: 'global_logistics',
        name: 'Global Parts Logistics and Delivery',
        description: 'Worldwide parts distribution services'
      },
      {
        id: 'urgent_delivery',
        name: 'Urgent Delivery Services (AOG)',
        description: 'Emergency parts delivery solutions'
      }
    ]
  },
  {
    id: 'ship_management',
    name: 'Ship Management Services',
    description: 'Complete vessel management solutions',
    subCategories: [
      {
        id: 'crew_management',
        name: 'Crew Management (Hiring, Training, Payroll)',
        description: 'Complete crew management solutions'
      },
      {
        id: 'technical_management',
        name: 'Technical Management (Maintenance, Repairs)',
        description: 'Technical operations management'
      },
      {
        id: 'insurance_claims',
        name: 'Insurance and Claims Management',
        description: 'Marine insurance and claims handling'
      }
    ]
  },
  {
    id: 'fuel_bunker',
    name: 'Fuel and Bunker Services',
    description: 'Marine fuel supply and bunkering',
    subCategories: [
      {
        id: 'fuel_sourcing',
        name: 'Bunker Fuel Sourcing (HFO, MGO, LNG)',
        description: 'Quality fuel procurement services'
      },
      {
        id: 'fuel_testing',
        name: 'Fuel Testing and Sampling',
        description: 'Fuel quality testing and analysis'
      },
      {
        id: 'tank_inspection',
        name: 'Tank Cleaning and Inspection',
        description: 'Fuel tank maintenance services'
      }
    ]
  },
  {
    id: 'it_communication',
    name: 'IT and Communication Services',
    description: 'Marine IT and connectivity solutions',
    subCategories: [
      {
        id: 'satellite_comms',
        name: 'Satellite Communication Systems',
        description: 'Maritime satellite communication solutions'
      },
      {
        id: 'navigation_systems',
        name: 'Navigation Systems Upgrades',
        description: 'Modern navigation equipment installation'
      },
      {
        id: 'network_security',
        name: 'Shipboard Network and Cybersecurity Solutions',
        description: 'Maritime IT security services'
      }
    ]
  },
  {
    id: 'logistics_chartering',
    name: 'Logistics and Chartering Services',
    description: 'Vessel chartering and logistics',
    subCategories: [
      {
        id: 'freight_forwarding',
        name: 'Freight Forwarding and Cargo Handling',
        description: 'Complete cargo logistics solutions'
      },
      {
        id: 'ship_chartering',
        name: 'Ship Chartering and Brokerage',
        description: 'Vessel chartering services'
      },
      {
        id: 'customs_clearance',
        name: 'Customs Clearance and Documentation',
        description: 'Import/export documentation services'
      }
    ]
  },
  {
    id: 'emergency_salvage',
    name: 'Emergency and Salvage Services',
    description: '24/7 emergency response and salvage',
    subCategories: [
      {
        id: 'rescue_towing',
        name: 'Rescue and Towing Operations',
        description: 'Emergency vessel assistance'
      },
      {
        id: 'salvage_assistance',
        name: 'Salvage Assistance (Cargo and Vessel)',
        description: 'Professional salvage operations'
      },
      {
        id: 'pollution_control',
        name: 'Pollution Control and Spill Response',
        description: 'Environmental emergency services'
      }
    ]
  },
  {
    id: 'training_consultancy',
    name: 'Training and Consultancy',
    description: 'Maritime training and consulting',
    subCategories: [
      {
        id: 'crew_training',
        name: 'Crew Training (Safety, Navigation, Engineering)',
        description: 'Professional maritime training'
      },
      {
        id: 'maritime_consultancy',
        name: 'Maritime Consultancy (Operational Efficiency, Strategy)',
        description: 'Expert maritime consulting services'
      },
      {
        id: 'legal_regulatory',
        name: 'Legal and Regulatory Consultancy',
        description: 'Maritime law and compliance consulting'
      }
    ]
  }
];

export function getServiceCategory(id: ServiceCategory): ServiceCategoryConfig | undefined {
  return SERVICE_CATEGORIES.find(category => category.id === id);
}

export function getSubCategories(categoryId: ServiceCategory): ServiceSubCategory[] {
  return getServiceCategory(categoryId)?.subCategories || [];
}