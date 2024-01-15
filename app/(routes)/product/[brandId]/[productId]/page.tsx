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
  const brandId = Array.isArray(params.brandId)
    ? params.brandId[0]
    : params.brandId;
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;
  const [product, setProduct] = useRecoilState(productState);

  useEffect(() => {
    setProduct(null);
    if (productId && typeof productId === 'string') {
      fetchProduct(brandId, productId).then((data) => {
        if (data) {
          setProduct(data);
        }
      });
    }
  }, [productId, setProduct]);

  if (!product) {
    return null;
  }

  return (
    <>
      {!product?.isDisplay ? (
        <GuidanceMessage
          message="商品が公開されていません"
          actionText="商品ページへ戻る"
          actionLink="/unknownbikesjp"
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
            <ProductImagesDisplay
              brandId={brandId}
              productId={productId}
              imageCount={product.imageCount}
            />
            <ProductDetails
              brandId={brandId}
              productId={productId}
              productName={product.productName}
              brandName={product.brandName}
              description={product.description}
              price={product.price}
              discountPrice={product.discountPrice}
              sizes={product.sizes}
            />
          </div>
          <ProductDescription detailDescription={product.detailDescription} />
        </>
      )}
    </>
  );
}
