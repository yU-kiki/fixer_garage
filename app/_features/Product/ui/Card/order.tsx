import clsx from 'clsx';
import Image from 'next/image';

export type ProductCardOrderProps = {
  brandId: string;
  productId: string;
  productName: string;
  brandName: string;
  finalPrice: number;
  selectedSize: string;
};

export const ProductCardOrder = ({
  brandId,
  productId,
  productName,
  brandName,
  finalPrice,
  selectedSize,
}: ProductCardOrderProps) => {
  return (
    <div>
      <div
        className={clsx(
          'flex',
          'py-[24px]',
          'border-b-[1px]',
          'border-light-gray',
        )}
      >
        <div
          className={clsx(
            'w-[192px]',
            'md:w-[240px]',
            'aspect-[3/2]',
            'mr-[16px]',
            'md:mr-[32px]',
          )}
        >
          <Image
            src={`/images/products/${brandId}/${productId}/1.JPG`}
            alt="商品画像"
            className={clsx('w-full', 'h-full', 'object-contain')}
            width={160}
            height={90}
            priority
            sizes="100vw"
          />
        </div>
        <div
          className={clsx(
            'w-[calc(100vw-240px)]',
            'md:w-[calc(100vw-320px)]',
            'md:max-w-[240px]',
            'text-[14px]',
            'md:text-[16px]',
            'leading-[1.5]',
          )}
        >
          <p className={clsx('font-[600]')}>{productName}</p>
          <div className={clsx('mt-[4px]', 'md:mt-[8px]')}>
            <p className={clsx('text-dark-gray')}>{brandName}</p>
            <p>size: {selectedSize}</p>
            <p>￥{finalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
