import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AdminStats {
  totalRevenue: number;
  activeVendors: number;
  totalProducts: number;
  totalServices: number;
  loading: boolean;
  error: string | null;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalRevenue: 0,
    activeVendors: 0,
    totalProducts: 0,
    totalServices: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);

        // Query for active vendors
        const vendorsSnapshot = await getDocs(query(
          collection(db, 'users'),
          where('role', 'in', ['service_vendor', 'product_vendor']),
          where('status', '==', 'active')
        ));

        // Query for active products
        const productsSnapshot = await getDocs(query(
          collection(db, 'products'),
          where('status', '==', 'active')
        ));

        // Query for active services
        const servicesSnapshot = await getDocs(query(
          collection(db, 'services'),
          where('status', '==', 'active')
        ));

        // Query for completed orders this month
        const ordersSnapshot = await getDocs(query(
          collection(db, 'orders'),
          where('status', '==', 'delivered'),
          where('updatedAt', '>=', Timestamp.fromDate(monthStart))
        ));

        const revenue = ordersSnapshot.docs.reduce((sum, doc) => sum + (doc.data().total || 0), 0);

        if (isMounted) {
          setStats({
            totalRevenue: revenue,
            activeVendors: vendorsSnapshot.size,
            totalProducts: productsSnapshot.size,
            totalServices: servicesSnapshot.size,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        if (isMounted) {
          setStats(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to load statistics'
          }));
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
}