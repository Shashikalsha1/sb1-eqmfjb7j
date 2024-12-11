import { doc, updateDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import type { User } from '@/types';

export async function updateVendorStatus(vendorId: string, status: User['status']) {
  try {
    const vendorRef = doc(db, 'users', vendorId);
    await updateDoc(vendorRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating vendor status:', error);
    return { error: 'Failed to update vendor status. Please try again.' };
  }
}

export async function createAdmin(data: { email: string; password: string; displayName: string }) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    await setDoc(doc(db, 'users', user.uid), {
      email: data.email,
      displayName: data.displayName,
      role: 'admin',
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating admin:', error);
    return { error: 'Failed to create admin account. Please try again.' };
  }
}