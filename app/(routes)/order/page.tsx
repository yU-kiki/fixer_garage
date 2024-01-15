'use client';

import clsx from 'clsx';
import { useRecoilState } from 'recoil';

import { GuidanceMessage } from '@/_components/elements/GuidanceMessage';
import { Title } from '@/_components/elements/Title';
import { CustomerForm } from '@/_features/Orders/ui/CustomerForm';
import { OrderCard } from '@/_features/Orders/ui/OrderCard';
import { orderProductState } from '@/_stores/orderState';

export default function Order() {
  const [orderProduct] = useRecoilState(orderProductState);
  const hasOrderProduct = orderProduct.productId !== '';

  return (
    <div
      className={clsx(
        'mt-[32px]',
        'w-full',
        'md:w-[576px]',
        'px-[16px]',
        'md:px-[32px]',
      )}
    >
      <Title title="ショッピングカート" />
      {hasOrderProduct ? (
        <>
          <OrderCard
            brandId={orderProduct.brandId as string}
            productId={orderProduct.productId as string}
            productName={orderProduct.productName as string}
            brandName={orderProduct.brandName as string}
            finalPrice={orderProduct.finalPrice as number}
            selectedSize={orderProduct.selectedSize as string}
          />
          <CustomerForm />
        </>
      ) : (
        <GuidanceMessage
          message="お客様のカートに商品はありません"
          actionText="商品ページへ戻る"
          actionLink="/unknownbikesjp"
        />
      )}
    </div>
  );
}
