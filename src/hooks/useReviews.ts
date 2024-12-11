import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import type { Review } from '@/types';

interface UseReviewsProps {
  targetId?: string;
  targetType?: 'product' | 'service';
}

export function useReviews({ targetId, targetType }: UseReviewsProps = {}) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    let q = query(
      collection(db, 'reviews'),
      where('vendorId', '==', user.id),
      orderBy('createdAt', 'desc')
    );

    if (targetId && targetType) {
      q = query(
        collection(db, 'reviews'),
        where('targetId', '==', targetId),
        where('targetType', '==', targetType),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      
      setReviews(reviewsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, targetId, targetType]);

  return { reviews, loading };
}