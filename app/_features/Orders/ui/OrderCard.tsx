import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

import {
  orderProductState,
  getDefaultOrderProduct,
} from '@/_stores/orderState';

export type OrderCardProps = {
  productId: string;
  productName: string;
  brandName: string;
  finalPrice: number;
  selectedSize: string;
};

export const OrderCard = ({
  productId,
  productName,
  brandName,
  finalPrice,
  selectedSize,
}: OrderCardProps) => {
  const setOrderProduct = useSetRecoilState(orderProductState);

  const handleRemoveOrderProduct = () => {
    localStorage.removeItem('orderProduct');
    setOrderProduct(getDefaultOrderProduct());
  };

  return (
    <div className={clsx('mt-[32px]')}>
      <p
        className={clsx(
          'mb-[16px]',
          'font-[600]',
          'text-[18px]',
          'md:text-[20px]',
        )}
      >
        商品詳細
      </p>
      <div
        className={clsx(
          'flex',
          'py-[24px]',
          'border-y-[1px]',
          'border-light-gray',
        )}
      >
        <Link
          href={`/product/unknownbikes/${productId}`}
          className={clsx(
            'flex',
            'max-w-[192px]',
            'md:max-w-[240px]',
            'mr-[16px]',
            'md:mr-[32px]',
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={`/images/products/unknownbikes/${productId}/1.JPG`}
            alt="商品画像"
            width={160}
            height={90}
            priority
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <div
          className={clsx(
            'w-max-[calc(100%-192px-16px)]',
            'text-[14px]',
            'md:text-[16px]',
            'leading-[1.5]',
          )}
        >
          <Link
            href={`/product/unknownbikes/${productId}`}
            className={clsx('underline')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{productName}</p>
          </Link>
          <p className={clsx('py-[4px]', 'md:py-[8px]')}>
            ブランド： {brandName}
          </p>
          <p className={clsx('pb-[4px]', 'md:pb-[8px]')}>
            サイズ： {selectedSize}
          </p>
          <p>￥{finalPrice.toLocaleString()}</p>
          <div className={clsx('flex', 'justify-end')}>
            <p
              className={clsx(
                'pr-[8px]',
                'cursor-pointer',
                'hover:underline',
                'text-dark-gray',
                'decoration-dark-gray',
              )}
              onClick={handleRemoveOrderProduct}
            >
              削除
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
