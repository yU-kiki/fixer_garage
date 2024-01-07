import clsx from 'clsx';
import Image from 'next/image';

export type ProductImagesDisplayProps = {
  className?: string;
  productId: string;
};

export const ProductImagesDisplay = ({
  className,
  productId,
}: ProductImagesDisplayProps) => {
  return (
    <div
      className={clsx(
        'md:max-w-[640px]',
        'lg:max-w-[768px]',
        'md:mr-[32px]',
        className,
      )}
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
    </div>
  );
};
