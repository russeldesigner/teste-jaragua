import { useCallback, useEffect, useMemo, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc
} from 'firebase/firestore';

import { auth, db, appId, firebaseReady } from '../config/firebase';
import { baseCollections } from '../data/initialStates';

const makeEmptyData = () =>
  Object.fromEntries(baseCollections.map((name) => [name, []]));

export function useFirebaseData() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(makeEmptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let unsubAuth = () => {};

    async function startAuth() {
      try {
        if (!firebaseReady) {
          setError('Firebase não configurado. Confira as variáveis de ambiente.');
          setLoading(false);
          return;
        }

        unsubAuth = onAuthStateChanged(auth, (u) => {
          setUser(u);
          setLoading(false);
        });

        await signInAnonymously(auth);
      } catch (err) {
        console.error('Erro Firebase Auth:', err);

        if (err?.code === 'auth/admin-restricted-operation') {
          setError('Login anônimo não está ativado no Firebase. Ative Authentication > Sign-in method > Anonymous.');
        } else if (err?.code === 'auth/operation-not-allowed') {
          setError('Login anônimo não está ativado no Firebase. Ative Authentication > Sign-in method > Anonymous.');
        } else {
          setError(`Erro ao conectar Firebase: ${err?.code || err.message}`);
        }

        setLoading(false);
      }
    }

    startAuth();

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user || !firebaseReady) return;

    const unsubs = baseCollections.map((name) => {
      const ref = collection(
        db,
        'artifacts',
        appId,
        'public',
        'data',
        name
      );

      return onSnapshot(
        query(ref),
        (snap) => {
          setData((prev) => ({
            ...prev,
            [name]: snap.docs.map((d) => ({
              id: d.id,
              ...d.data()
            }))
          }));
        },
        (err) => {
          console.error(`Erro Firestore coleção ${name}:`, err);
          setError(`Erro no Firestore: ${err.message}`);
        }
      );
    });

    return () => unsubs.forEach((u) => u());
  }, [user]);

  const saveRecord = useCallback(async (collectionName, payload, editId = null) => {
    if (!firebaseReady) {
      throw new Error('Firebase não configurado.');
    }

    const clean = JSON.parse(JSON.stringify(payload));

    if (editId) {
      await updateDoc(
        doc(db, 'artifacts', appId, 'public', 'data', collectionName, editId),
        {
          ...clean,
          updatedAt: new Date().toISOString()
        }
      );

      return editId;
    }

    const docRef = await addDoc(
      collection(db, 'artifacts', appId, 'public', 'data', collectionName),
      {
        ...clean,
        createdAt: new Date().toISOString()
      }
    );

    return docRef.id;
  }, []);

  const removeRecord = useCallback(async (collectionName, id) => {
    if (!firebaseReady) {
      throw new Error('Firebase não configurado.');
    }

    await deleteDoc(
      doc(db, 'artifacts', appId, 'public', 'data', collectionName, id)
    );
  }, []);

  const updateRecord = useCallback(async (collectionName, id, payload) => {
    if (!firebaseReady) {
      throw new Error('Firebase não configurado.');
    }

    await updateDoc(
      doc(db, 'artifacts', appId, 'public', 'data', collectionName, id),
      {
        ...payload,
        updatedAt: new Date().toISOString()
      }
    );
  }, []);

  return useMemo(
    () => ({
      user,
      data,
      loading,
      error,
      saveRecord,
      removeRecord,
      updateRecord,
      firebaseReady
    }),
    [
      user,
      data,
      loading,
      error,
      saveRecord,
      removeRecord,
      updateRecord
    ]
  );
}
