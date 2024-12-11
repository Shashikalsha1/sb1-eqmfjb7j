import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache,
  persistentMultipleTabManager,
  CACHE_SIZE_UNLIMITED 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAdmin } from './initAdmin';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgeTNVZeePJZ1SAQN_c96L5AZ3-2UlBPI",
  authDomain: "autopartshub-a688f.firebaseapp.com",
  projectId: "autopartshub-a688f",
  storageBucket: "autopartshub-a688f.appspot.com",
  messagingSenderId: "871166694234",
  appId: "1:871166694234:web:7525c909b0be19560d5963"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore with persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  })
});

// Initialize Storage
const storage = getStorage(app);

// Initialize admin account if needed
initializeAdmin().catch(console.error);

export { app, auth, db, storage };