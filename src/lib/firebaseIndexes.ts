import { collection, query, where, orderBy, QueryConstraint } from 'firebase/firestore';
import { db } from './firebase';

// Helper function to create a safe query
function createSafeQuery(
  collectionName: string,
  filters: { field: string; operator: any; value: any }[],
  sortOptions?: { field: string; direction: 'asc' | 'desc' }[]
) {
  const constraints: QueryConstraint[] = [
    ...filters.map(f => where(f.field, f.operator, f.value))
  ];

  if (sortOptions?.length) {
    constraints.push(...sortOptions.map(s => orderBy(s.field, s.direction)));
  }

  return query(collection(db, collectionName), ...constraints);
}

// Product queries
export const productQueries = {
  vendorProducts: (vendorId: string) => createSafeQuery(
    'products',
    [{ field: 'vendorId', operator: '==', value: vendorId }],
    [{ field: 'createdAt', direction: 'desc' }]
  ),

  activeProducts: () => createSafeQuery(
    'products',
    [{ field: 'status', operator: '==', value: 'active' }],
    [{ field: 'createdAt', direction: 'desc' }]
  )
};

// Service queries
export const serviceQueries = {
  vendorServices: (vendorId: string) => createSafeQuery(
    'services',
    [{ field: 'vendorId', operator: '==', value: vendorId }],
    [{ field: 'createdAt', direction: 'desc' }]
  ),

  activeServices: () => createSafeQuery(
    'services',
    [{ field: 'status', operator: '==', value: 'active' }],
    [{ field: 'createdAt', direction: 'desc' }]
  )
};

// Order queries
export const orderQueries = {
  vendorOrders: (vendorId: string) => createSafeQuery(
    'orders',
    [{ field: 'vendorId', operator: '==', value: vendorId }],
    [{ field: 'createdAt', direction: 'desc' }]
  ),

  customerOrders: (customerId: string) => createSafeQuery(
    'orders',
    [{ field: 'customerId', operator: '==', value: customerId }],
    [{ field: 'createdAt', direction: 'desc' }]
  )
};

// Booking queries
export const bookingQueries = {
  vendorBookings: (vendorId: string) => createSafeQuery(
    'bookings',
    [{ field: 'vendorId', operator: '==', value: vendorId }],
    [{ field: 'date', direction: 'desc' }]
  ),

  customerBookings: (customerId: string) => createSafeQuery(
    'bookings',
    [{ field: 'customerId', operator: '==', value: customerId }],
    [{ field: 'date', direction: 'desc' }]
  )
};

// Vendor queries
export const vendorQueries = {
  listVendors: () => createSafeQuery(
    'users',
    [{ field: 'role', operator: 'in', value: ['service_vendor', 'product_vendor'] }],
    [{ field: 'createdAt', direction: 'desc' }]
  )
};