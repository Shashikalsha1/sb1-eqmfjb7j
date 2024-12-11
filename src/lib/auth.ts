import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useAuthStore } from '@/store/auth';
import type { UserRole } from '@/types';

export const AUTH_ERRORS = {
  'auth/invalid-credential': 'Invalid email or password',
  'auth/user-not-found': 'No account found with this email',
  'auth/wrong-password': 'Invalid email or password',
  'auth/email-already-in-use': 'An account with this email already exists',
  'auth/weak-password': 'Password should be at least 6 characters',
  'auth/invalid-email': 'Please enter a valid email address',
  'auth/network-request-failed': 'Network error. Please check your connection',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
} as const;

export async function signIn(email: string, password: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    console.error('Error during sign in:', error);
    const errorMessage = AUTH_ERRORS[error.code as keyof typeof AUTH_ERRORS] || 'An unexpected error occurred';
    return { error: errorMessage };
  }
}

export async function signUp(email: string, password: string, role: UserRole, displayName: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData = {
      email,
      role,
      displayName,
      status: role === 'admin' ? 'active' : 'pending',
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    return { success: true };
  } catch (error: any) {
    console.error('Error during sign up:', error);
    const errorMessage = AUTH_ERRORS[error.code as keyof typeof AUTH_ERRORS] || 'An unexpected error occurred';
    return { error: errorMessage };
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    useAuthStore.getState().setUser(null);
    return { success: true };
  } catch (error: any) {
    console.error('Error during sign out:', error);
    return { error: 'Failed to sign out. Please try again.' };
  }
}