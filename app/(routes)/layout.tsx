import clsx from 'clsx';
import { Metadata } from 'next';

import { Footer } from '@/_components/layouts/Footer';
import { Header } from '@/_components/layouts/Header';
import RecoilProvider from '@/_providers/RecoilProvider';
import '@/_common/styles/globals.css';
import '@splidejs/react-splide/css';

const MetaDataProps = {
  title: 'ホーム',
  description:
    'ピストバイクショップ「FIXER GARAGE」のオンラインショップ。unknownbikesの日本総代理店。',
  imageURL: `https://www.fixergarage.shop/images/ogp.png`,
  url: 'fixergarage.shop',
  type: 'website' as const,
};

export const metadata: Metadata = {
  title: {
    default: 'FIXER GARAGE',
    template: `${MetaDataProps.title} | FIXER GARAGE`,
  },
  description: MetaDataProps.description,
  icons: '/favicon.ico',
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: MetaDataProps.imageURL,
        width: 1200,
        height: 630,
        alt: MetaDataProps.title,
      },
    ],
  },
  openGraph: {
    title: MetaDataProps.title,
    description: MetaDataProps.description,
    url: MetaDataProps.url,
    siteName: 'FIXER GARAGE ONLINE STORE',
    images: [
      {
        url: MetaDataProps.imageURL,
        width: 1200,
        height: 630,
        alt: MetaDataProps.title,
      },
    ],
    type: MetaDataProps.type,
    locale: 'ja_JP',
  },
};

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
            src="https://www.googletagmanager.com/gtag/js?id=G-WM3ZYHPDRB"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WM3ZYHPDRB');
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
