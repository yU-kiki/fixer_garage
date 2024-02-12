import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

export type ToggleProductCardProps = {
  finalPrice: number;
  children: React.ReactNode;
};

export const ToggleProductCard = ({
  finalPrice,
  children,
}: ToggleProductCardProps) => {
  const [isProductCardVisible, setIsProductCardVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(0);

  const toggleProductCardVisibility = () => {
    setIsProductCardVisible(!isProductCardVisible);
  };

  useEffect(() => {
    if (contentRef.current !== null) {
      setHeight(isProductCardVisible ? contentRef.current.scrollHeight : 0);
    }
  }, [isProductCardVisible]);

  return (
    <>
      <div
        className={clsx(
          'flex',
          'justify-between',
          'pt-[24px]',
          'pb-[16px]',
          'border-b-[1px]',
          'border-light-gray',
        )}
        onClick={toggleProductCardVisibility}
      >
        <div className={clsx('flex', 'gap-x-[8px]', 'text-blue-light')}>
          <p>{isProductCardVisible ? '注文内容の非表示' : '注文内容の表示'}</p>
          <div className="relative">
            <div
              className={clsx(
                'absolute',
                'left-[5px]',
                'w-[10px]',
                'h-[10px]',
                'rotate-45',
                isProductCardVisible
                  ? 'top-[9px] border-l-[2px] border-t-[2px]'
                  : 'top-[5px] border-r-[2px] border-b-[2px]',
              )}
            ></div>
          </div>
        </div>
        <p className={clsx('text-[18px]')}>
          ￥{finalPrice.toLocaleString()}
          <span className={clsx('text-[16px]')}>（税込）</span>
        </p>
      </div>
      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className={clsx(
          'transition-all',
          'duration-500',
          'ease-out',
          'overflow-hidden ',
        )}
      >
        {children}
      </div>
    </>
  );
};
