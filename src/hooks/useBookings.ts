import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import type { Booking } from '@/types';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Create a basic query without sorting to avoid index issues
    const q = query(
      collection(db, 'bookings'),
      where('vendorId', '==', user.id)
    );

    const unsubscribe = onSnapshot(
      q,
      {
        next: (snapshot) => {
          const bookingsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate() || new Date(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          })) as Booking[];
          
          // Sort in memory to avoid index requirements
          bookingsData.sort((a, b) => b.date.getTime() - a.date.getTime());
          
          setBookings(bookingsData);
          setLoading(false);
          setError(null);
        },
        error: (err) => {
          console.error('Error fetching bookings:', err);
          setError('Failed to load bookings');
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { bookings, loading, error };
}