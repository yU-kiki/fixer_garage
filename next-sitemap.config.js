const firebase = require('firebase/app');
const { getFirestore, collection, doc, getDocs, query, where } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

const transformBrandData = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    lastmod: data.lastmod ? data.lastmod : ''
  };
};

const transformProductData = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    lastmod: data.lastmod ? data.lastmod : new Date().toISOString()
  };
};

const fetchBrands = async () => {
  const storesRef = collection(db, 'stores');
  const q = query(storesRef, where('is_display', '==', true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(transformBrandData);
};

const fetchProducts = async (brandId) => {
  const storeRef = doc(db, 'stores', brandId);
  const productsRef = collection(storeRef, 'products');
  const q = query(productsRef, where('is_display', '==', true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(transformProductData);
};

async function generateProductURLsByBrand(brandId) {
  const products = await fetchProducts(brandId);
  return products.map((product) => {
    return {
      loc: `/product/${brandId}/${product.id}`,
      lastmod: product.lastmod
    };
  });
}

module.exports = {
  siteUrl: 'https://fixergarage.shop',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './public',
  additionalPaths: async () => {
    const brands = await fetchBrands();
    const brandUrls = brands.map(brand => ({
      loc: `/${brand.id}`,
      lastmod: brand.lastmod || new Date().toISOString()
    }));

    const ProductUrls = await Promise.all(
      brands.map(async brand => {
        return await generateProductURLsByBrand(brand.id);
      })
    ).then(urls => urls.flat());

    return [
      { loc: '/', lastmod: new Date().toISOString() },
      { loc: '/order', lastmod: new Date().toISOString() },
      { loc: '/thanks', lastmod: new Date().toISOString() },
      ...brandUrls,
      ...ProductUrls
    ];
  },
  transform: async (config, path) => {
    const currentDate = new Date().toISOString();

    const staticPaths = ['/', '/order', '/thanks'];
    if (staticPaths.includes(path)) {
      return {
        loc: path,
        lastmod: currentDate,
      };
    }

    return {
      loc: path,
      lastmod: config.lastmod || currentDate,
    };
  },
};

