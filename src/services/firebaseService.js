import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import db from '@/lib/firebaseConfig';

export const fetchProducts = async () => {
  const storeRef = doc(db, 'stores', 'unknownjp');
  const productsRef = collection(storeRef, 'products');
  const q = query(productsRef, where('isDisplay', '==', true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
};
