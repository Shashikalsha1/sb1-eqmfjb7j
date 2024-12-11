import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { CommissionRate, CommissionTier } from '@/types';

export async function createCommissionRate(rate: Omit<CommissionRate, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'commissionRates'), {
      ...rate,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating commission rate:', error);
    return { error: (error as Error).message };
  }
}

export async function updateCommissionRate(id: string, rate: Partial<CommissionRate>) {
  try {
    const rateRef = doc(db, 'commissionRates', id);
    await updateDoc(rateRef, {
      ...rate,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating commission rate:', error);
    return { error: (error as Error).message };
  }
}

export async function deleteCommissionRate(id: string) {
  try {
    const rateRef = doc(db, 'commissionRates', id);
    await updateDoc(rateRef, {
      status: 'inactive',
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting commission rate:', error);
    return { error: (error as Error).message };
  }
}

export async function createCommissionTier(tier: Omit<CommissionTier, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'commissionTiers'), {
      ...tier,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating commission tier:', error);
    return { error: (error as Error).message };
  }
}

export async function updateCommissionTier(id: string, tier: Partial<CommissionTier>) {
  try {
    const tierRef = doc(db, 'commissionTiers', id);
    await updateDoc(tierRef, {
      ...tier,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating commission tier:', error);
    return { error: (error as Error).message };
  }
}

export async function deleteCommissionTier(id: string) {
  try {
    const tierRef = doc(db, 'commissionTiers', id);
    await updateDoc(tierRef, {
      status: 'inactive',
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting commission tier:', error);
    return { error: (error as Error).message };
  }
}