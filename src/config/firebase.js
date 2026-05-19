import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDynafC9X8OhtbW50NbBiuUJ156VNsJJ5g',
  authDomain: 'teste-jaragua.firebaseapp.com',
  projectId: 'teste-jaragua',
  storageBucket: 'teste-jaragua.firebasestorage.app',
  messagingSenderId: '292534685392',
  appId: '1:292534685392:web:0d03a1ba641e613f8d98d5'
};

export const appId = 'plataforma-ad';
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseReady = true;
