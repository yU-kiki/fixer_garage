import clsx from 'clsx';
import React from 'react';

export type NavigateButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const NavigateButton = ({ text, onClick }: NavigateButtonProps) => {
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
      {text}
    </button>
  );
};
