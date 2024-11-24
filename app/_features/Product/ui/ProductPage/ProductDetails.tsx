'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { useRecoilState } from 'recoil';

import { orderProductState } from '@/_stores/orderState';

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
            <span className={clsx('text-[16px]')}>（送料込み）</span>
          </span>
          <span className={clsx('ml-[8px]', 'font-[600]', 'text-red')}>
            ￥{discountPrice.toLocaleString()}
            <span className={clsx('text-[16px]')}>（送料込み）</span>
          </span>
        </>
      ) : (
        <p>
          ￥{price.toLocaleString()}
          <span className={clsx('text-[16px]')}>（送料込み）</span>
        </p>
      )}
    </p>
  );
};

interface DescriptionProps {
  description: string;
}
const Description = ({ description }: DescriptionProps) => {
  return (
    <div
      className={clsx(
        'py-[16px]',
        'text-[14px]',
        'xl:text-[16px]',
        'leading-[2]',
      )}
    >
      {description}
    </div>
  );
};

interface SizeOptionProps {
  sizes: { [size: string]: number };
  selectedSize: string;
  handleSizeChange: (selectedSize: string) => void;
}
const SizeOption = ({
  sizes,
  selectedSize,
  handleSizeChange,
}: SizeOptionProps) => {
  const sizeOrder = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '47T',
    '1.Pink(限定1台)',
    '2.Pearl Green(限定1台)',
    '3.Navy(限定1台)',
    '4.Silver(限定1台)',
    '5.Celeste(限定1台)',
    '6.Yellow(限定1台)',
    '7.Blue(限定1台)',
    '8.Red(限定1台)',
    '9.Mint(限定1台)',
  ];

  const options = sizeOrder
    .filter((size) => size in sizes)
    .map((size) => ({
      value: size,
      label: sizes[size] > 0 ? size : `${size} (Sold Out)`,
      isDisabled: sizes[size] === 0,
    }));

  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>,
  ) => {
    handleSizeChange(selectedOption ? selectedOption.value : '');
  };

  const selectedOption = options.find(
    (option) => option.value === selectedSize,
  );

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'py-[16px]',
        'text-[14px]',
        'xl:text-[16px]',
      )}
    >
      <label htmlFor="size-select" className={clsx('mb-[8px]', 'font-[600]')}>
        サイズ
      </label>
      <Select
        id="size-select"
        options={options}
        classNamePrefix="react-select"
        value={selectedOption}
        onChange={handleChange}
        isOptionDisabled={(option) => option.isDisabled}
        styles={{
          control: (provided) => ({
            ...provided,
            height: '39px',
            padding: '0 8px',
            border: '1px solid lightgray',
            borderRadius: '8px',
            fontSize: '14px',
            '&:hover': {
              borderColor: 'darkgray',
            },
            '@media (min-width: 1024px)': {
              height: '42px',
            },
          }),
          option: (provided, { isDisabled }) => ({
            ...provided,
            backgroundColor: 'white',
            color: isDisabled ? 'lightgray' : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',
            '&:hover': {
              backgroundColor: '#efefef',
              fontSize: '16px',
            },
          }),
          indicatorSeparator: () => ({ display: 'none' }),
        }}
      />
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
  brandId: string;
  productId: string;
  productName: string;
  brandName: string;
  price: number;
  discountPrice?: number;
  selectedSize: string;
}
const GoOrderButton = ({
  brandId,
  productId,
  productName,
  brandName,
  price,
  discountPrice,
  selectedSize,
}: GoOrderButtonProps) => {
  const router = useRouter();
  const [orderProduct, setOrderProduct] = useRecoilState(orderProductState);

  const handleGoOrder = () => {
    const newOrderProduct = {
      ...orderProduct,
      brandId: brandId,
      productId: productId,
      productName: productName,
      brandName: brandName,
      finalPrice: discountPrice ? discountPrice : price,
      selectedSize: selectedSize,
    };

    setOrderProduct(newOrderProduct);

    localStorage.setItem('orderProduct', JSON.stringify(newOrderProduct));

    router.push('/cart');
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
      カートに入れる
    </button>
  );
};

export type ProductDetailsProps = {
  brandId: string;
  productId: string;
  productName: string;
  brandName: string;
  description: string;
  price: number;
  discountPrice?: number;
  sizes: { [size: string]: number };
};

export const ProductDetails = ({
  brandId,
  productId,
  productName,
  brandName,
  description,
  price,
  discountPrice,
  sizes,
}: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (selectedSize: string) => {
    setSelectedSize(selectedSize);
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
        <SizeOption
          sizes={sizes}
          selectedSize={selectedSize}
          handleSizeChange={handleSizeChange}
        />
      </div>
      {selectedSize ? (
        <div>
          <Cost price={price} discountPrice={discountPrice} />
          <GoOrderButton
            brandId={brandId}
            productId={productId}
            productName={productName}
            brandName={brandName}
            price={price}
            discountPrice={discountPrice}
            selectedSize={selectedSize}
          />
        </div>
      ) : null}
    </div>
  );
};
