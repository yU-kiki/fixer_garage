import clsx from 'clsx';

import { Footer } from '@/_components/layouts/Footer';
import { Header } from '@/_components/layouts/Header';
import RecoilProvider from '@/_providers/RecoilProvider';
import '@/_common/styles/globals.css';

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <RecoilProvider>
      <html lang="ja">
        <head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-Q0T17ES6X2"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Q0T17ES6X2');
              `,
            }}
          />
        </head>
        <body className={clsx('text-black', 'font-hiragino')}>
          <Header />
          <main className={clsx('pt-[80px]')}>{children}</main>
          <Footer />
        </body>
      </html>
    </RecoilProvider>
  );
}
