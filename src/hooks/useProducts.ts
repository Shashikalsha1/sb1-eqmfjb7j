import { useState, useEffect, useCallback } from 'react';
import { productQueries } from '@/lib/firebaseIndexes';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useAuth } from './useAuth';
import type { Product } from '@/types';

interface UseProductsProps {
  vendorId?: string;
  publicOnly?: boolean;
  status?: Product['status'];
}

export function useProducts({ vendorId, publicOnly = false, status }: UseProductsProps = {}) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const setupProductsListener = useCallback(async () => {
    let unsubscribe: Unsubscribe | undefined;

    try {
      let query;
      
      if (publicOnly) {
        query = productQueries.activeProducts();
      } else if (vendorId && status) {
        query = productQueries.vendorProductsByStatus(vendorId, status);
      } else if (vendorId) {
        query = productQueries.vendorProducts(vendorId);
      } else if (user?.role === 'product_vendor' && status) {
        query = productQueries.vendorProductsByStatus(user.id, status);
      } else if (user?.role === 'product_vendor') {
        query = productQueries.vendorProducts(user.id);
      } else {
        query = productQueries.activeProducts();
      }

      unsubscribe = onSnapshot(
        query,
        {
          next: (snapshot) => {
            const productsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate() || new Date(),
              updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Product[];
            
            setProducts(productsData);
            setLoading(false);
            setError(null);
          },
          error: (err) => {
            console.error('Error fetching products:', err);
            setError(err.message);
            setLoading(false);
          }
        }
      );
    } catch (err) {
      console.error('Error setting up products listener:', err);
      setError((err as Error).message);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, vendorId, publicOnly, status]);

  useEffect(() => {
    const cleanup = setupProductsListener();
    return () => {
      cleanup.then(unsubscribe => unsubscribe?.());
    };
  }, [setupProductsListener]);

  return { products, loading, error };
}