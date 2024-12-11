import { useState, useEffect } from 'react';
import { serviceQueries } from '@/lib/firebaseIndexes';
import { onSnapshot } from 'firebase/firestore';
import { useAuth } from './useAuth';
import type { Service } from '@/types';

interface UseServicesProps {
  vendorId?: string;
  publicOnly?: boolean;
}

export function useServices({ vendorId, publicOnly = false }: UseServicesProps = {}) {
  const [services, setServices] = useState<Service[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    try {
      let query;
      
      if (publicOnly) {
        query = serviceQueries.activeServices();
      } else if (vendorId) {
        query = serviceQueries.vendorServices(vendorId);
      } else if (user?.role === 'service_vendor') {
        query = serviceQueries.vendorServices(user.id);
      } else {
        query = serviceQueries.activeServices();
      }

      const unsubscribe = onSnapshot(
        query,
        (snapshot) => {
          const servicesData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Service;
          });

          // Sort services by createdAt date manually
          servicesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          
          setServices(servicesData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error fetching services:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up services listener:', err);
      setError((err as Error).message);
      setLoading(false);
    }
  }, [user, vendorId, publicOnly]);

  return { services, loading, error };
}