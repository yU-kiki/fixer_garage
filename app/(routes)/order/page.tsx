'use client';

import clsx from 'clsx';
import { useRecoilState } from 'recoil';

import { CustomerForm } from '@/_features/Orders/ui/CustomerForm';
import { OrderCard } from '@/_features/Orders/ui/OrderCard';
import { orderProductState } from '@/_stores/orderState';

export default function Order() {
  const [orderProduct] = useRecoilState(orderProductState);

  return (
    <div className={clsx()}>
      <OrderCard
        productId={orderProduct.productId as string}
        productName={orderProduct.productName as string}
        brandName={orderProduct.brandName as string}
        finalPrice={orderProduct.finalPrice as number}
        selectedSize={orderProduct.selectedSize as string}
      />
      <CustomerForm />
    </div>
  );
}
