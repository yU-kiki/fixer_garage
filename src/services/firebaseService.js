import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import db from '@/lib/firebaseConfig';

const transformProductData = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    isDisplay: data.is_display,
    productName: data.product_name,
    brandName: data.brand_name,
    description: data.description,
    detailDescription: data.detail_description,
    price: data.price,
    discountPrice: data.discount_price,
    sizes: data.sizes,
  };
};

export const fetchProducts = async () => {
  const storeRef = doc(db, 'stores', 'unknownjp');
  const productsRef = collection(storeRef, 'products');
  const q = query(productsRef, where('is_display', '==', true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(transformProductData);
};

export const fetchProduct = async (id) => {
  const storeRef = doc(db, 'stores', 'unknownjp');
  const productRef = doc(storeRef, 'products', id);
  const snapshot = await getDoc(productRef);

  if (snapshot.exists()) {
    return transformProductData(snapshot);
  } else {
    console.log("No such product!");
    return null;
  }
};
