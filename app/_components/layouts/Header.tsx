import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { CartIcon } from '@/_components/layouts/CartIcon';

export const Header = () => {
  return (
    <header
      className={clsx(
        'flex',
        'justify-between',
        'items-center',
        'fixed',
        'top-0',
        'z-[10]',
        'w-full',
        'h-[80px]',
        'px-[24px]',
        'md:px-[48px]',
        'shadow-md',
        'bg-white',
      )}
    >
      <Link
        href="/unknownbikesjp"
        className={clsx('md:mx-auto', 'md:pl-[32px]')}
      >
        <Image
          src="/images/logo.svg"
          alt="ロゴ"
          width={160}
          height={32}
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Link>
      <CartIcon />
    </header>
  );
};
