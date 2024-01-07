'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

import { CustomerForm } from '@/_features/Orders/ui/CustomerForm';
import { OrderInfo } from '@/_features/Orders/ui/OrderInfo';

export default function Order() {
  const searchParams = useSearchParams();

  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');
  const price = searchParams.get('price');
  const discountPrice = searchParams.get('discountPrice');
  const selectedSize = searchParams.get('selectedSize');

  const numericPrice = Number(price);
  const numericDiscountPrice = discountPrice
    ? Number(discountPrice)
    : undefined;
  const finalPrice = numericDiscountPrice || numericPrice;

  return (
    <div className={clsx()}>
      <OrderInfo
        productId={productId as string}
        productName={productName as string}
        finalPrice={finalPrice}
        selectedSize={selectedSize as string}
      />
      <CustomerForm />
    </div>
  );
}
