```typescript
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import type { User } from '@/types';

export function useVendors() {
  const [vendors, setVendors] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create a basic query without complex sorting
    const q = query(
      collection(db, 'users'),
      where('role', 'in', ['service_vendor', 'product_vendor'])
    );

    const unsubscribe = onSnapshot(
      q,
      {
        next: (snapshot) => {
          const vendorsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          })) as User[];
          
          // Sort in memory to avoid index requirements
          vendorsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          
          setVendors(vendorsData);
          setLoading(false);
          setError(null);
        },
        error: (err) => {
          console.error('Error fetching vendors:', err);
          setError('Failed to load vendors. Please try again later.');
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return { vendors, loading, error };
}
```