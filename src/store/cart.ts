import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, Service } from '@/types';

interface CartItem {
  type: 'product' | 'service';
  productId?: string;
  product?: Product;
  serviceId?: string;
  service?: Service;
  quantity: number;
  bookingDate?: Date;
  bookingSlot?: string;
}

interface CartState {
  version: number;
  items: CartItem[];
  total: number;
}

interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  addBooking: (service: Service, date: Date, slot: string) => void;
  removeItem: (id: string, type: 'product' | 'service') => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

type CartStore = CartState & CartActions;

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => {
    if (item.type === 'product') {
      return sum + (item.product?.price || 0) * item.quantity;
    } else {
      return sum + (item.service?.price || 0);
    }
  }, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // State
      version: 1,
      items: [],
      total: 0,

      // Actions
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            item => item.type === 'product' && item.productId === product.id
          );
          
          const newItems = existingItem
            ? state.items.map(item =>
                item.type === 'product' && item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            : [...state.items, { 
                type: 'product',
                productId: product.id, 
                product, 
                quantity 
              }];

          return {
            items: newItems,
            total: calculateTotal(newItems)
          };
        });
      },

      addBooking: (service: Service, date: Date, slot: string) => {
        set((state) => {
          // Remove any existing booking for this service
          const filteredItems = state.items.filter(
            item => !(item.type === 'service' && item.serviceId === service.id)
          );

          const newItems = [
            ...filteredItems,
            {
              type: 'service',
              serviceId: service.id,
              service,
              quantity: 1,
              bookingDate: date,
              bookingSlot: slot
            }
          ];

          return {
            items: newItems,
            total: calculateTotal(newItems)
          };
        });
      },

      removeItem: (id: string, type: 'product' | 'service') => {
        set((state) => {
          const newItems = state.items.filter(item => 
            !(item.type === type && (
              type === 'product' ? item.productId === id : item.serviceId === id
            ))
          );
          return {
            items: newItems,
            total: calculateTotal(newItems)
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          const newItems = state.items.map(item =>
            item.type === 'product' && item.productId === productId
              ? { ...item, quantity }
              : item
          );
          return {
            items: newItems,
            total: calculateTotal(newItems)
          };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            version: 1,
            total: calculateTotal(persistedState.items || [])
          };
        }
        return persistedState as CartState;
      }
    }
  )
);