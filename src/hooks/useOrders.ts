import { useState, useEffect } from 'react';
import { subscribeToOrders } from '@/lib/orders';
import { useAuth } from './useAuth';
import type { Order } from '@/types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setOrders(null);
      setLoading(false);
      return;
    }

    const role = user.role === 'product_vendor' ? 'vendor' : 'customer';
    
    const unsubscribe = subscribeToOrders(
      user.id,
      role,
      (orders) => {
        setOrders(orders);
        setLoading(false);
        setError(null);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { orders, loading, error };
}