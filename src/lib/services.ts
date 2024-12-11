import { 
  collection, 
  addDoc,
  updateDoc,
  deleteDoc,
  doc, 
  serverTimestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';
import { uploadMultipleImages } from './storage';
import { useAuthStore } from '@/store/auth';
import type { Service } from '@/types';

// Create a new service
export async function createService(data: Partial<Service>, images?: FileList | null) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'service_vendor') throw new Error('Unauthorized: Only service vendors can create services');

    // Upload images if provided
    let imageUrls: string[] = [];
    if (images && images.length > 0) {
      imageUrls = await uploadMultipleImages(images, `services/${user.id}`);
    }

    // Create service document
    const serviceData = {
      ...data,
      vendorId: user.id,
      images: imageUrls,
      status: data.status || 'draft',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      averageRating: 0,
      totalReviews: 0,
    };

    const servicesRef = collection(db, 'services');
    const docRef = await addDoc(servicesRef, serviceData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating service:', error);
    return { error: (error as Error).message };
  }
}

// Update an existing service
export async function updateService(id: string, data: Partial<Service>, images?: FileList | null) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'service_vendor') throw new Error('Unauthorized: Only service vendors can update services');

    let updateData = { ...data };

    // Upload new images if provided
    if (images && images.length > 0) {
      const imageUrls = await uploadMultipleImages(images, `services/${user.id}`);
      updateData.images = imageUrls;
    }

    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating service:', error);
    return { error: (error as Error).message };
  }
}

// Delete a service
export async function deleteService(id: string) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'service_vendor') throw new Error('Unauthorized: Only service vendors can delete services');

    const serviceRef = doc(db, 'services', id);
    await deleteDoc(serviceRef);

    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { error: (error as Error).message };
  }
}

// Update service status
export async function updateServiceStatus(id: string, status: Service['status']) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'service_vendor') throw new Error('Unauthorized: Only service vendors can update service status');

    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating service status:', error);
    return { error: (error as Error).message };
  }
}