'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

import { orderProductState } from '@/_stores/orderState';

export const CartIcon = () => {
  const [orderProduct] = useRecoilState(orderProductState);
  const hasOrderProduct = orderProduct.productId !== '';

  return (
    <Link href="/order" className={clsx('relative')}>
      {hasOrderProduct && (
        <div
          className={clsx(
            'flex',
            'justify-center',
            'items-center',
            'absolute',
            'top-[-8px]',
            'right-[-8px]',
            'w-[16px]',
            'h-[16px]',
            'bg-blue',
            'rounded-[100px]',
          )}
        >
          <p className={clsx('text-[10px]', 'text-white')}>1</p>
        </div>
      )}
      <Image
        src="/images/icon/cart.svg"
        alt="カート"
        width={32}
        height={32}
        priority
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </Link>
  );
};
