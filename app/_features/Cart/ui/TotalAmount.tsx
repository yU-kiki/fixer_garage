import clsx from 'clsx';

export type TotalAmountProps = {
  finalPrice: number;
};

export const TotalAmount = ({ finalPrice }: TotalAmountProps) => {
  return (
    <div
      className={clsx(
        'flex',
        'justify-between',
        'mt-[24px]',
        'mx-[8px]',
        'text-[18px]',
        'md:text-[20px]',
      )}
    >
      <p>商品合計（税込）</p>
      <p>￥{finalPrice.toLocaleString()}</p>
    </div>
  );
};
