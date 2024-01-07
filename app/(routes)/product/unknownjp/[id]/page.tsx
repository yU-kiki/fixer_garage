'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

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

  if (!product?.isDisplay) {
    // TODO: 商品が存在しない場合の表示を作成
    return <div>商品が見つかりません。</div>;
  }

  return (
    <div>
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
    </div>
  );
}
