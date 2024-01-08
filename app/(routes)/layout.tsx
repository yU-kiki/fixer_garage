import clsx from 'clsx';

import { Footer } from '@/_components/layouts/Footer';
import { Header } from '@/_components/layouts/Header';
import RecoilProvider from '@/_providers/RecoilProvider';
import '@/_common/styles/globals.css';

export type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <RecoilProvider>
      <html lang="ja">
        <body className={clsx('text-black', 'font-hiragino')}>
          <Header />
          <main className={clsx('pt-[80px]')}>{children}</main>
          <Footer />
        </body>
      </html>
    </RecoilProvider>
  );
}
