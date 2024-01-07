import clsx from 'clsx';

export type OrderLayoutProps = {
  children: React.ReactNode;
};

export default function OrderLayout({ children }: OrderLayoutProps) {
  return <div className={clsx('flex', 'justify-center')}>{children}</div>;
}
