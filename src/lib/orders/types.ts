import type { Product } from '@/types';

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface CreateOrderResult {
  success: boolean;
  orderIds?: string[];
  error?: string;
}

export interface OrderTotals {
  subtotal: number;
  commission: number;
  total: number;
}