'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface stockStatusProps {
  sizes: { [size: string]: number };
}
const StockStatus = ({ sizes }: stockStatusProps) => {
  const isSoldOut = Object.values(sizes).every((quantity) => quantity === 0);

  return (
    <>
      {isSoldOut ? (
        <p
          className={clsx(
            'inline-block',
            'mb-[8px]',
            'px-[16px]',
            'py-[4px]',
            'text-[16px]',
            'text-white',
            'bg-red',
          )}
        >
          Sold Out
        </p>
      ) : null}
    </>
  );
};

interface BrandProps {
  brandName: string;
}
const Brand = ({ brandName }: BrandProps) => (
  <p className={clsx('mb-[4px]', 'font-[600]', 'text-[16px]')}>{brandName}</p>
);

interface ProductNameProps {
  productName: string;
}
const ProductName = ({ productName }: ProductNameProps) => (
  <p className={clsx('mb-[8px]', 'font-[600]', 'text-[24px]')}>{productName}</p>
);

interface PriceProps {
  price: number;
  discountPrice?: number;
}
const Price = ({ price, discountPrice }: PriceProps) => {
  return (
    <p className={clsx('text-[20px]', 'text-black')}>
      {discountPrice ? (
        <>
          <span className={clsx('line-through')}>
            ￥{price.toLocaleString()}
          </span>
          <span className={clsx('ml-[8px]', 'font-[600]', 'text-red')}>
            ￥{discountPrice.toLocaleString()}
          </span>
        </>
      ) : (
        <>￥{price.toLocaleString()}</>
      )}
    </p>
  );
};

interface DescriptionProps {
  description: string;
}
const Description = ({ description }: DescriptionProps) => (
  <p
    className={clsx(
      'py-[16px]',
      'text-[14px]',
      'md:text-[16px]',
      'leading-[2]',
    )}
  >
    {description}
  </p>
);

interface SizeOptionProps {
  sizes: { [size: string]: number };
  handleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SizeOption = ({ sizes, handleSizeChange }: SizeOptionProps) => {
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className={clsx('flex', 'flex-col', 'py-[16px]', 'text-[16px]')}>
      <label htmlFor="size-select" className={clsx('mb-[8px]', 'font-[600]')}>
        サイズ
      </label>
      <select
        id="size-select"
        className={clsx(
          'px-[16px]',
          'py-[8px]',
          'border',
          'border-gray',
          'rounded-[8px]',
        )}
        onChange={handleSizeChange}
      >
        <option value="">未選択</option>
        {sizeOrder
          .filter((size) => size in sizes)
          .map((size) => {
            const quantity = sizes[size];
            return quantity > 0 ? (
              <option key={size} value={size}>
                {size}
              </option>
            ) : (
              <option key={size} value={size} disabled>
                {size} (Sold Out)
              </option>
            );
          })}
      </select>
    </div>
  );
};

interface CostProps {
  price: number;
  discountPrice?: number;
}
const Cost = ({ price, discountPrice }: CostProps) => {
  return (
    <div
      className={clsx('flex', 'justify-between', 'py-[16px]', 'text-[16px]')}
    >
      <p className={clsx('mb-[8px]')}>購入金額（税込）</p>
      <p className={clsx('mr-[8px]', 'font-[600]', 'text-[20px]')}>
        {discountPrice ? (
          <>￥{discountPrice.toLocaleString()}</>
        ) : (
          <>￥{price.toLocaleString()}</>
        )}
      </p>
    </div>
  );
};

interface GoOrderButtonProps {
  productId: string;
  productName: string;
  price: number;
  discountPrice?: number;
  selectedSize: string;
}
const GoOrderButton = ({
  productId,
  productName,
  price,
  discountPrice,
  selectedSize,
}: GoOrderButtonProps) => {
  const router = useRouter();

  const handleGoOrder = () => {
    // TODO: URLのクエリパラメーターを表示させないようにする
    router.push(
      `/order?productId=${productId}&productName=${productName}&price=${price}&discountPrice=${discountPrice}&selectedSize=${selectedSize}`,
    );
  };

  return (
    <button
      onClick={handleGoOrder}
      className={clsx(
        'w-full',
        'px-[64px]',
        'py-[16px]',
        'text-white',
        'bg-black',
        'rounded-[100px]',
      )}
    >
      ご購入手続きへ
    </button>
  );
};

export type ProductDetailsProps = {
  className?: string;
  productId: string;
  productName: string;
  brandName: string;
  description: string;
  price: number;
  discountPrice?: number;
  sizes: { [size: string]: number };
};

export const ProductDetails = ({
  className,
  productId,
  productName,
  brandName,
  description,
  price,
  discountPrice,
  sizes,
}: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div
      className={clsx(
        'md:min-w-[288px]',
        'md:max-w-[288px]',
        'lg:max-w-[384px]',
        'xl:max-w-[512px]',
        'mt-[16px]',
        'md:mt-0',
        'mx-[16px]',
        'divide-y',
        'divide-light-gray',
        className,
      )}
    >
      <div className={clsx('py-[16px]')}>
        <StockStatus sizes={sizes} />
        <Brand brandName={brandName} />
        <ProductName productName={productName} />
        <Price price={price} discountPrice={discountPrice} />
      </div>
      <div>
        <Description description={description} />
      </div>
      <div>
        <SizeOption sizes={sizes} handleSizeChange={handleSizeChange} />
      </div>
      {selectedSize ? (
        <div>
          <Cost price={price} discountPrice={discountPrice} />
          <GoOrderButton
            productId={productId}
            productName={productName}
            price={price}
            discountPrice={discountPrice}
            selectedSize={selectedSize}
          />
        </div>
      ) : null}
    </div>
  );
};
