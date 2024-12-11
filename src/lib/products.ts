import { 
  collection, 
  addDoc,
  updateDoc,
  doc, 
  serverTimestamp,
  writeBatch,
  getDoc,
  deleteDoc,
  runTransaction
} from 'firebase/firestore';
import { db } from './firebase';
import { uploadMultipleImages } from './storage';
import { useAuthStore } from '@/store/auth';
import type { Product } from '@/types';

// Create a new product
export async function createProduct(data: Partial<Product>, images: FileList | null) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'product_vendor') throw new Error('Unauthorized: Only product vendors can create products');

    // Upload images if provided
    let imageUrls: string[] = [];
    if (images && images.length > 0) {
      imageUrls = await uploadMultipleImages(images, `products/${user.id}`);
    }

    // Create product document
    const productData = {
      ...data,
      vendorId: user.id,
      images: imageUrls,
      status: data.status || 'draft',
      productType: data.productType || 'ship_store',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      averageRating: 0,
      totalReviews: 0,
    };

    const docRef = await addDoc(collection(db, 'products'), productData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating product:', error);
    return { error: (error as Error).message };
  }
}

// Update an existing product
export async function updateProduct(id: string, data: Partial<Product>, images?: FileList | null) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'product_vendor') throw new Error('Unauthorized: Only product vendors can update products');

    return await runTransaction(db, async (transaction) => {
      const productRef = doc(db, 'products', id);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error('Product not found');
      }

      if (productDoc.data().vendorId !== user.id) {
        throw new Error('Unauthorized: You can only update your own products');
      }

      let updateData = { ...data };

      // Upload new images if provided
      if (images && images.length > 0) {
        const imageUrls = await uploadMultipleImages(images, `products/${user.id}`);
        updateData.images = imageUrls;
      }

      transaction.update(productRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });

      return { success: true };
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return { error: (error as Error).message };
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'product_vendor') throw new Error('Unauthorized: Only product vendors can delete products');

    return await runTransaction(db, async (transaction) => {
      const productRef = doc(db, 'products', id);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error('Product not found');
      }

      if (productDoc.data().vendorId !== user.id) {
        throw new Error('Unauthorized: You can only delete your own products');
      }

      await deleteDoc(productRef);
      return { success: true };
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return { error: (error as Error).message };
  }
}

// Update product status
export async function updateProductStatus(id: string, status: Product['status']) {
  try {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');
    if (user.role !== 'product_vendor') throw new Error('Unauthorized: Only product vendors can update product status');

    return await runTransaction(db, async (transaction) => {
      const productRef = doc(db, 'products', id);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error('Product not found');
      }

      if (productDoc.data().vendorId !== user.id) {
        throw new Error('Unauthorized: You can only update your own products');
      }

      transaction.update(productRef, {
        status,
        updatedAt: serverTimestamp(),
      });

      return { success: true };
    });
  } catch (error) {
    console.error('Error updating product status:', error);
    return { error: (error as Error).message };
  }
}