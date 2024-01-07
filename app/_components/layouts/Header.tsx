import clsx from 'clsx';

import { HeaderLogo } from '@/_components/elements/HeaderLogo';

export const Header = () => {
  return (
    <header
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'fixed',
        'top-0',
        'z-[10]',
        'h-[80px]',
        'w-full',
        'px-[16px]',
        'md:px-[48px]',
        'shadow-md',
        'bg-white',
      )}
    >
      {/* <HeaderMenu /> */}
      <HeaderLogo />
      {/* <HeaderShop /> */}
    </header>
  );
};
