import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

console.log('ENV FIREBASE', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
});

const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const hasFirebaseEnv = Boolean(
  envConfig.apiKey &&
  envConfig.projectId &&
  envConfig.appId
);

const fallbackConfig = {
  apiKey: 'dummy',
  authDomain: 'dummy.firebaseapp.com',
  projectId: 'dummy',
  storageBucket: 'dummy.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:dummy'
};

export const firebaseConfig = hasFirebaseEnv
  ? envConfig
  : fallbackConfig;

export const appId =
  import.meta.env.VITE_APP_ID || 'plataforma-ad';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseReady = hasFirebaseEnv;
