import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { Review } from '@/types';

export async function updateReviewStatus(reviewId: string, status: Review['status']) {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating review status:', error);
    return { error: (error as Error).message };
  }
}

export async function replyToReview(reviewId: string, comment: string) {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      reply: {
        comment,
        createdAt: serverTimestamp()
      },
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error replying to review:', error);
    return { error: (error as Error).message };
  }
}

export async function addReview(review: Omit<Review, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...review,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding review:', error);
    return { error: (error as Error).message };
  }
}