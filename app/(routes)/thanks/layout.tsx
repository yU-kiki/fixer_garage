import clsx from 'clsx';

export type ThanksLayoutProps = {
  children: React.ReactNode;
};

export default function ThanksLayout({ children }: ThanksLayoutProps) {
  return <div className={clsx('flex', 'justify-center')}>{children}</div>;
}
