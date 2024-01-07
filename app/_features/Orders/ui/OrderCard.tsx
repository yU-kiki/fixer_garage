import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <div
      className={clsx('md:w-[576px]', 'mt-[32px]', 'px-[16px]', 'md:px-[32px]')}
    >
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
          className={clsx(
            'flex',
            'max-w-[192px]',
            'md:max-w-[240px]',
            'mr-[16px]',
            'md:mr-[32px]',
          )}
          href={`/product/unknownjp/${productId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={`/images/products/unknownjp/${productId}/1.png`}
            alt="product"
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
            className={clsx('underline')}
            href={`/product/unknownjp/${productId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{productName}</p>
          </Link>
          <p className={clsx('py-[8px]')}>ブランド： {brandName}</p>
          <p className={clsx('pb-[8px]')}>サイズ： {selectedSize}</p>
          <p>￥{finalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
