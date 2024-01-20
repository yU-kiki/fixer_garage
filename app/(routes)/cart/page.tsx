'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import { GuidanceMessage } from '@/_components/elements/GuidanceMessage';
import { NavigateButton } from '@/_components/elements/NavigateButton';
import { Title } from '@/_components/elements/Title';
import { TotalAmount } from '@/_features/Cart/ui/TotalAmount';
import { ProductCardCart } from '@/_features/Product/ui/Card/cart';
import { orderProductState } from '@/_stores/orderState';

export default function Cart() {
  const router = useRouter();
  const [orderProduct] = useRecoilState(orderProductState);
  const hasOrderProduct = orderProduct.productId !== '';

  const goToOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/order');
  };

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
          <ProductCardCart
            brandId={orderProduct.brandId as string}
            productId={orderProduct.productId as string}
            productName={orderProduct.productName as string}
            brandName={orderProduct.brandName as string}
            finalPrice={orderProduct.finalPrice as number}
            selectedSize={orderProduct.selectedSize as string}
          />
          <TotalAmount finalPrice={orderProduct.finalPrice as number} />
          <NavigateButton text="ご注文手続きへ" onClick={goToOrder} />
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
