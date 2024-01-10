import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { fetchImageCount } from '@/_services/imageServices';

export type ProductImagesDisplayProps = {
  productId: string;
  brandName: string;
};

export const ProductImagesDisplay = ({
  productId,
  brandName,
}: ProductImagesDisplayProps) => {
  const [totalImages, setTotalImages] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState(1);

  useEffect(() => {
    const loadImageCount = async () => {
      const count = await fetchImageCount(brandName, productId);
      setTotalImages(count);
    };

    loadImageCount();
  }, [productId, brandName]);

  const updateImageIndex = (newIndex: number) => {
    setImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = (imageIndex % totalImages) + 1;
    updateImageIndex(newIndex);
  };

  const goToPreviousImage = () => {
    const newIndex = imageIndex === 1 ? totalImages : imageIndex - 1;
    updateImageIndex(newIndex);
  };

  const canSlideRight = imageIndex < totalImages;
  const canSlideLeft = imageIndex > 1;

  return (
    <>
      <div
        className={clsx(
          'relative',
          'md:max-w-[640px]',
          'lg:max-w-[768px]',
          'md:mr-[32px]',
        )}
      >
        <div>
          <Image
            src={`/images/products/unknownjp/${productId}/${imageIndex}.JPG`}
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
          <div
            className={clsx(
              'absolute',
              'inset-0',
              'flex',
              'justify-between',
              'items-center',
            )}
          >
            <button
              disabled={!canSlideLeft}
              onClick={goToPreviousImage}
              className={clsx(!canSlideLeft && 'opacity-20')}
            >
              <Image
                src={`/images/icon/arrow-left.svg`}
                alt="一つ前の画像へ"
                width={32}
                height={32}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </button>
            <button
              disabled={!canSlideRight}
              onClick={goToNextImage}
              className={clsx(!canSlideRight && 'opacity-20')}
            >
              <Image
                src={`/images/icon/arrow-right.svg`}
                alt="一つ後の画像へ"
                width={32}
                height={32}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
