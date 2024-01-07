import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderLogo = () => {
  return (
    <Link className={clsx('')} href="/">
      <Image
        className={clsx('')}
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
  );
};
