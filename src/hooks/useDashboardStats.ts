import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

interface DashboardStats {
  activeProducts: number;
  pendingOrders: number;
  averageRating: number;
  monthlyRevenue: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    activeProducts: 0,
    pendingOrders: 0,
    averageRating: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Query for active products
    const productsQuery = query(
      collection(db, 'products'),
      where('vendorId', '==', user.id),
      where('status', '==', 'active')
    );

    // Query for pending orders
    const ordersQuery = query(
      collection(db, 'orders'),
      where('vendorId', '==', user.id),
      where('status', '==', 'pending')
    );

    // Query for reviews to calculate average rating
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('vendorId', '==', user.id),
      where('status', '==', 'approved')
    );

    const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
      const activeProductsCount = snapshot.docs.length;
      setStats(prev => ({ ...prev, activeProducts: activeProductsCount }));
    });

    const unsubscribeOrders = onSnapshot(ordersQuery, async (snapshot) => {
      const pendingOrdersCount = snapshot.docs.length;
      
      // Calculate monthly revenue from completed orders
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const completedOrdersQuery = query(
        collection(db, 'orders'),
        where('vendorId', '==', user.id),
        where('status', '==', 'delivered'),
        where('updatedAt', '>=', monthStart)
      );

      const completedOrders = await getDocs(completedOrdersQuery);
      const monthlyRevenue = completedOrders.docs.reduce((sum, doc) => {
        const data = doc.data();
        return sum + (data.total || 0);
      }, 0);

      setStats(prev => ({ 
        ...prev, 
        pendingOrders: pendingOrdersCount,
        monthlyRevenue
      }));
    });

    const unsubscribeReviews = onSnapshot(reviewsQuery, (snapshot) => {
      const reviews = snapshot.docs.map(doc => doc.data());
      const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
      
      setStats(prev => ({ ...prev, averageRating }));
    });

    setLoading(false);

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
      unsubscribeReviews();
    };
  }, [user]);

  return { stats, loading };
}