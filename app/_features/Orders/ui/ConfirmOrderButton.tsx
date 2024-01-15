import clsx from 'clsx';
import React from 'react';

export type ConfirmOrderButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const ConfirmOrderButton: React.FC<ConfirmOrderButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'w-full',
        'mt-[32px]',
        'px-[64px]',
        'py-[16px]',
        'text-white',
        'bg-black',
        'rounded-[100px]',
      )}
      onClick={onClick}
    >
      注文情報を送信する
    </button>
  );
};
