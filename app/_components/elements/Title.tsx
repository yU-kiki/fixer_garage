import clsx from 'clsx';

export type TitleProps = {
  title: string;
};

export const Title = ({ title }: TitleProps) => {
  return (
    <div className={clsx('relative')}>
      <div
        className={clsx(
          'absolute',
          'w-[4px]',
          'h-full',
          'rounded-[2px]',
          'bg-blue',
        )}
      ></div>
      <p
        className={clsx(
          'pl-[16px]',
          'font-[600]',
          'text-[24px]',
          'md:text-[28px]',
        )}
      >
        {title}
      </p>
    </div>
  );
};
