'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { ProductCard } from '@/_features/Products/ui/ProductCard';
import { fetchProducts } from '@/_services/firebaseService';
import { productsState } from '@/_stores/productState';

export const ProductList = () => {
  const [products, setProducts] = useRecoilState(productsState);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, [setProducts]);

  return (
    <div
      className={clsx(
        'grid',
        'grid-cols-2',
        'gap-x-[16px]',
        'gap-y-[32px]',
        'max-x-[1280px]',
        'mx-auto',
        'px-[24px]',
        'py-[32px]',
        'md:grid-cols-3',
        'md:gap-x-[24px]',
        'lg:grid-cols-4',
        'lg:gap-x-[32px]',
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={index}
          productId={product.id}
          productName={product.productName}
          brandName={product.brandName}
          price={product.price}
          discountPrice={product.discountPrice}
          sizes={product.sizes}
        />
      ))}
    </div>
  );
};
