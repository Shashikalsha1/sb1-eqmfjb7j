import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useAuthStore } from '@/store/auth';
import type { Service } from '@/types';

interface CreateBookingParams {
  service: Service;
  date: Date;
  slot: string;
}

export async function createBooking({ service, date, slot }: CreateBookingParams) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');

    // Calculate commission (example: 10%)
    const commission = service.price * 0.1;

    const bookingData = {
      customerId: user.id,
      customerName: user.displayName,
      vendorId: service.vendorId,
      serviceId: service.id,
      serviceName: service.name,
      date,
      slot,
      status: 'pending',
      price: service.price,
      commission,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { error: (error as Error).message };
  }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { error: (error as Error).message };
  }
}