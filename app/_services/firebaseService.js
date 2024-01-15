import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

import db from '@/_config/firebaseConfig';

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
    imageCount: data.image_count,
  };
};

export const fetchProducts = async (brandId) => {
  const storeRef = doc(db, 'stores', brandId);
  const productsRef = collection(storeRef, 'products');
  const q = query(productsRef, where('is_display', '==', true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(transformProductData);
};

export const fetchProduct = async (brandId, productId) => {
  const storeRef = doc(db, 'stores', brandId);
  const productRef = doc(storeRef, 'products', productId);
  const snapshot = await getDoc(productRef);

  if (snapshot.exists()) {
    return transformProductData(snapshot);
  } else {
    console.log('No such product!');
    return null;
  }
};
