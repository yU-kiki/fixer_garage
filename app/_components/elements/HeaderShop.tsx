import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderShop = () => {
  return (
    <div className={clsx('flex', 'items-center')}>
      <Link className={clsx('')} href="/">
        <Image
          className={clsx('')}
          src="/images/icon/shop.svg"
          alt="カート"
          width={32}
          height={32}
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Link>
    </div>
  );
};
