import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

interface ProductDashboardStats {
  activeProducts: number;
  pendingOrders: number;
  averageRating: number;
  monthlyRevenue: number;
}

export function useProductDashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProductDashboardStats>({
    activeProducts: 0,
    pendingOrders: 0,
    averageRating: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    async function fetchStats() {
      try {
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);

        // Get active products count
        const productsQuery = query(
          collection(db, 'products'),
          where('vendorId', '==', user.id),
          where('status', '==', 'active')
        );
        const productsSnapshot = await getDocs(productsQuery);
        const activeProducts = productsSnapshot.size;

        // Get pending orders count
        const ordersQuery = query(
          collection(db, 'orders'),
          where('vendorId', '==', user.id),
          where('status', '==', 'pending')
        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const pendingOrders = ordersSnapshot.size;

        // Calculate average rating
        const reviewsQuery = query(
          collection(db, 'reviews'),
          where('vendorId', '==', user.id),
          where('status', '==', 'approved')
        );
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviews = reviewsSnapshot.docs;
        const totalRating = reviews.reduce((sum, doc) => sum + (doc.data().rating || 0), 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        // Calculate monthly revenue
        const completedOrdersQuery = query(
          collection(db, 'orders'),
          where('vendorId', '==', user.id),
          where('status', '==', 'delivered'),
          where('updatedAt', '>=', Timestamp.fromDate(monthStart))
        );
        const completedOrders = await getDocs(completedOrdersQuery);
        const monthlyRevenue = completedOrders.docs.reduce((sum, doc) => {
          const data = doc.data();
          return sum + (data.total || 0);
        }, 0);

        if (isMounted) {
          setStats({
            activeProducts,
            pendingOrders,
            averageRating,
            monthlyRevenue
          });
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching product dashboard stats:', error);
        if (isMounted) {
          setError('Failed to load dashboard statistics');
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return { ...stats, loading, error };
}