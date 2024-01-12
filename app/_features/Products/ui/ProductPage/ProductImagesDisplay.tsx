import { Splide, SplideSlide } from '@splidejs/react-splide';
import clsx from 'clsx';
import Image from 'next/image';

export type ProductImagesDisplayProps = {
  productId: string;
  imageCount: number;
};

export const ProductImagesDisplay = ({
  productId,
  imageCount,
}: ProductImagesDisplayProps) => {
  return (
    <div
      className={clsx(
        'w-[100vw]',
        'md:w-[calc(100vw-416px)]',
        'lg:w-[calc(100vw-512px)]',
        'xl:w-[calc(100vw-640px)]',
        'aspect-[3/2]',
        'md:mr-[32px]',
      )}
    >
      <Splide
        options={{
          type: 'slide',
          perPage: 1,
          perMove: 1,
          gap: '1rem',
        }}
      >
        {Array.from({ length: imageCount }, (_, i) => i + 1).map((index) => (
          <SplideSlide key={index}>
            <div
              className={clsx(
                'w-full',
                'aspect-[3/2]',
              )}
            >
              <Image
                src={`/images/products/unknownbikes/${productId}/${index}.JPG`}
                alt={`product ${index}`}
                className={clsx('w-full', 'h-full', 'object-contain')}
                width={160}
                height={90}
                priority
                sizes="100%"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
