import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

interface ServiceDashboardStats {
  activeServices: number;
  pendingBookings: number;
  averageRating: number;
  monthlyRevenue: number;
}

export function useServiceDashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ServiceDashboardStats>({
    activeServices: 0,
    pendingBookings: 0,
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
        // Get active services count - simple query
        const servicesQuery = query(
          collection(db, 'services'),
          where('vendorId', '==', user.id),
          where('status', '==', 'active')
        );
        const servicesSnapshot = await getDocs(servicesQuery);
        const activeServices = servicesSnapshot.size;

        // Get pending bookings count - simple query
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('vendorId', '==', user.id),
          where('status', '==', 'pending')
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);
        const pendingBookings = bookingsSnapshot.size;

        // Calculate average rating - simple query
        const reviewsQuery = query(
          collection(db, 'reviews'),
          where('vendorId', '==', user.id),
          where('status', '==', 'approved')
        );
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviews = reviewsSnapshot.docs;
        const totalRating = reviews.reduce((sum, doc) => sum + (doc.data().rating || 0), 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        // Calculate monthly revenue - simple query
        const completedBookingsQuery = query(
          collection(db, 'bookings'),
          where('vendorId', '==', user.id),
          where('status', '==', 'completed')
        );
        const completedBookings = await getDocs(completedBookingsQuery);
        const monthlyRevenue = completedBookings.docs.reduce((sum, doc) => {
          const data = doc.data();
          return sum + (data.price || 0);
        }, 0);

        if (isMounted) {
          setStats({
            activeServices,
            pendingBookings,
            averageRating,
            monthlyRevenue
          });
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching service dashboard stats:', error);
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