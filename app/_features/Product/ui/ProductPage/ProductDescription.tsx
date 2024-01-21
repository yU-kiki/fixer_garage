import clsx from 'clsx';

export type ProductDescriptionProps = {
  detailDescription: string;
};

export const ProductDescription = ({
  detailDescription,
}: ProductDescriptionProps) => {
  const createMarkup = (description: string) => {
    let formattedDescription = description.replace(/\\n/g, '<br />');

    formattedDescription = formattedDescription.replace(
      /\*(.*?)\*/g,
      '<span style="font-weight: 600;">$1</span>',
    );

    formattedDescription = formattedDescription.replace(
      /\[red\](.*?)\[\/red\]/g,
      '<span style="color: red;">$1</span>',
    );

    return { __html: formattedDescription };
  };

  return (
    <div
      className={clsx(
        'mt-[48px]',
        'px-[16px]',
        'md:px-[48px]',
        'divide-y',
        'divide-light-gray',
      )}
    >
      <p
        className={clsx(
          'py-[8px]',
          'font-[600]',
          'text-[20px]',
          'md:text-[24px]',
        )}
      >
        商品説明
      </p>
      <div
        className={clsx(
          'py-[16px]',
          'text-[14px]',
          'xl:text-[16px]',
          'leading-[2]',
        )}
      >
        <span dangerouslySetInnerHTML={createMarkup(detailDescription)} />
      </div>
    </div>
  );
};
