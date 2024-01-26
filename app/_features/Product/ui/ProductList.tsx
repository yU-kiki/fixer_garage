'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { LoadingSpinner } from '@/_components/elements/LoadingSpinner';
import { ProductCard } from '@/_features/Product/ui/ProductCard';
import { fetchProductsInReverseOrder } from '@/_services/firebaseService';
import { productsState } from '@/_stores/productState';

export const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const brandId = Array.isArray(params.brandId)
    ? params.brandId[0]
    : params.brandId;
  const [products, setProducts] = useRecoilState(productsState);

  useEffect(() => {
    fetchProductsInReverseOrder(brandId).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [brandId, setProducts]);

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
      {loading ? (
        <LoadingSpinner />
      ) : (
        products.map((product, index) => (
          <ProductCard
            key={index}
            brandId={brandId}
            productId={product.id}
            productName={product.productName}
            brandName={product.brandName}
            price={product.price}
            discountPrice={product.discountPrice}
            sizes={product.sizes}
          />
        ))
      )}
    </div>
  );
};
