import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

const ADMIN_EMAIL = 'admin@a2zships.com';
const ADMIN_PASSWORD = 'Admin@123';

export async function initializeAdmin() {
  try {
    // Check if admin already exists
    const adminDoc = await getDoc(doc(db, 'users', 'admin'));
    if (adminDoc.exists()) {
      console.log('Admin account already exists');
      return;
    }

    // Create admin account
    const { user } = await createUserWithEmailAndPassword(
      auth,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    );

    // Set admin user data
    await setDoc(doc(db, 'users', user.uid), {
      email: ADMIN_EMAIL,
      role: 'admin',
      displayName: 'System Admin',
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    console.log('Admin account created successfully');
    
    return {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    };
  } catch (error) {
    console.error('Error creating admin account:', error);
    throw error;
  }
}