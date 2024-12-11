export type UserRole = 'admin' | 'service_vendor' | 'product_vendor' | 'customer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  createdAt: Date;
  status: 'active' | 'suspended' | 'pending';
  productType?: 'ship_spares' | 'ship_store';
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  productType: 'ship_spares' | 'ship_store';
  images: string[];
  stock: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  averageRating?: number;
  totalReviews?: number;
}

export type ServiceCategory = 
  | 'repair_maintenance'
  | 'survey_inspection'
  | 'dry_docking'
  | 'certification_compliance'
  | 'spare_parts'
  | 'ship_management'
  | 'fuel_bunker'
  | 'it_communication'
  | 'logistics_chartering'
  | 'emergency_salvage'
  | 'training_consultancy';

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  category: ServiceCategory;
  subCategory: string;
  price: number;
  duration: number;
  images: string[];
  status: 'active' | 'draft' | 'archived';
  availability: {
    [key: string]: {
      slots: string[];
    };
  };
  createdAt: Date;
  updatedAt: Date;
  averageRating?: number;
  totalReviews?: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  vendorId: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  slot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  commission: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  vendorId: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'pending_cod' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'online' | 'cash_on_delivery';
  total: number;
  commission: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  targetId: string;
  targetType: 'product' | 'service';
  customerId: string;
  customerName: string;
  vendorId: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  reply?: {
    comment: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CommissionRate {
  id: string;
  type: 'product' | 'service';
  category: string;
  rate: number;
  minAmount: number;
  maxAmount: number | null;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CommissionTier {
  id: string;
  type: 'product' | 'service';
  monthlyRevenue: number;
  rate: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}