import clsx from 'clsx';
import Image from 'next/image';

export const HeaderMenu = () => {
  return (
    <div className={clsx('flex', 'items-center')}>
      <Image
        className={clsx('')}
        src="/images/icon/menu.svg"
        alt="メニュー"
        width={32}
        height={32}
        priority
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};
