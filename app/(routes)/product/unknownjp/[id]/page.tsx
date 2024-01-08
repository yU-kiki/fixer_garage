'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { GuidanceMessage } from '@/_components/elements/GuidanceMessage';
import { ProductDescription } from '@/_features/Products/ui/ProductPage/ProductDescription';
import { ProductDetails } from '@/_features/Products/ui/ProductPage/ProductDetails';
import { ProductImagesDisplay } from '@/_features/Products/ui/ProductPage/ProductImagesDisplay';
import { fetchProduct } from '@/_services/firebaseService';
import { productState } from '@/_stores/productState';

export default function Product() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useRecoilState(productState);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchProduct(id).then((data) => {
        if (data) {
          setProduct(data);
        }
      });
    }
  }, [id]);

  return (
    <>
      {!product?.isDisplay ? (
        <GuidanceMessage
          message="商品が公開されていません"
          actionText="商品ページへ戻る"
          actionLink="/"
        />
      ) : (
        <>
          <div
            className={clsx(
              'md:flex',
              'md:justify-between',
              'md:mt-[32px]',
              'md:px-[32px]',
            )}
          >
            <ProductImagesDisplay productId={product.id} />
            <ProductDetails
              productId={product.id}
              productName={product.productName}
              brandName={product.brandName}
              description={product.description}
              price={product.price}
              discountPrice={product.discountPrice}
              sizes={product.sizes}
            />
          </div>
          <ProductDescription
            brandName={product.brandName}
            detailDescription={product.detailDescription}
          />
        </>
      )}
    </>
  );
}
