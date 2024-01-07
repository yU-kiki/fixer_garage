import clsx from 'clsx';

export type ProductDescriptionProps = {
  className?: string;
  brandName: string;
  detailDescription: string;
};

export const ProductDescription = ({
  className,
  brandName,
  detailDescription,
}: ProductDescriptionProps) => {
  const createMarkup = (description: string) => {
    return { __html: description.replace(/\\n/g, '<br />') };
  };

  return (
    <div
      className={clsx(
        'mt-[48px]',
        'px-[16px]',
        'md:px-[48px]',
        'divide-y',
        'divide-light-gray',
        className,
      )}
    >
      <p
        className={clsx(
          'py-[8px]',
          'font-[600]',
          'text-[20px]',
          'md:text-[24px]',
          className,
        )}
      >
        商品説明
      </p>
      <p
        className={clsx(
          'py-[8px]',
          'md:py-[16px]',
          'text-[14px]',
          'md:text-[16px]',
          'leading-[2]',
          className,
        )}
      >
        <span
          className={clsx(
            'font-[600]',
            'text-[18px]',
            'md:text-[20px]',
            className,
          )}
        >
          商品詳細
        </span>
        <br />
        <p>{brandName}</p>
        <span dangerouslySetInnerHTML={createMarkup(detailDescription)} />
      </p>
    </div>
  );
};
