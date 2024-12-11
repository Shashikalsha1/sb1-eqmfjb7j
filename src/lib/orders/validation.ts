import type { Product } from '@/types';
import type { OrderItem } from './types';

export function validateOrderItems(items: OrderItem[]) {
  if (!items || items.length === 0) {
    throw new Error('Your cart is empty. Please add items before checking out.');
  }

  // Validate each item
  for (const item of items) {
    if (!item.product) {
      throw new Error('Invalid product data');
    }

    if (!item.quantity || item.quantity <= 0) {
      throw new Error(`Please select a valid quantity for ${item.product.name}`);
    }

    if (item.quantity > 100) {
      throw new Error(`Maximum quantity allowed is 100 units per product`);
    }

    if (!item.product.price || item.product.price <= 0) {
      throw new Error(`Invalid price for ${item.product.name}`);
    }

    if (item.quantity > item.product.stock) {
      throw new Error(
        `Only ${item.product.stock} units available for ${item.product.name}`
      );
    }
  }

  // Validate total items
  if (items.reduce((sum, item) => sum + item.quantity, 0) > 1000) {
    throw new Error('Maximum 1000 total items allowed per order');
  }

  return true;
}

export function calculateOrderTotals(items: OrderItem[]) {
  // Calculate subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  // Calculate commission (10%)
  const commission = Math.round(subtotal * 0.1 * 100) / 100;
  
  // Calculate total with tax
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    commission,
    total
  };
}