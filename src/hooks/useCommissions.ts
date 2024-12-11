import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CommissionRate, CommissionTier } from '@/types';

export function useCommissionRates() {
  const [rates, setRates] = useState<CommissionRate[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'commissionRates'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ratesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommissionRate[];
      
      setRates(ratesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { rates, loading };
}

export function useCommissionTiers() {
  const [tiers, setTiers] = useState<CommissionTier[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'commissionTiers'),
      where('status', '==', 'active'),
      orderBy('monthlyRevenue', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tiersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommissionTier[];
      
      setTiers(tiersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { tiers, loading };
}