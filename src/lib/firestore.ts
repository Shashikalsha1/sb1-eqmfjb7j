import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Helper function to safely convert Firestore timestamps
 */
function convertTimestamps<T extends DocumentData>(doc: QueryDocumentSnapshot<T>): T {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate()
  };
}

/**
 * Helper function to safely get a document with type checking
 */
export async function getDocumentById<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as T;
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    return null;
  }
}

/**
 * Helper function to safely query documents with type checking
 */
export async function queryDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[]
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc)
    })) as T[];
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error);
    return [];
  }
}

/**
 * Helper function to check if a document exists
 */
export async function documentExists(
  collectionName: string,
  field: string,
  value: any
): Promise<boolean> {
  try {
    const q = query(collection(db, collectionName), where(field, '==', value));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error(`Error checking document existence in ${collectionName}:`, error);
    return false;
  }
}