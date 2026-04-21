import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Connectivity check
async function testConnection() {
  try {
    // Attempting to get the allowed test doc to verify connection
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connected successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.error("Firebase connection failed: Client is offline.");
    } else {
      console.error("Firebase initialization warning (likely rules or missing collection):", error);
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  testConnection();
}
