import clsx from 'clsx';
import { Metadata } from 'next';

const MetaDataProps = {
  title: 'ご注文ありがとうございます',
  description:
    'ピストバイクショップ「FIXER GARAGE」のオンラインショップ。unknownbikesの日本総代理店。',
  imageURL: `https://www.fixergarage.shop/images/ogp.png`,
  url: 'fixergarage.shop/thanks',
  type: 'article' as const,
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

export type ThanksLayoutProps = {
  children: React.ReactNode;
};

export default function ThanksLayout({ children }: ThanksLayoutProps) {
  return <div className={clsx('flex', 'justify-center')}>{children}</div>;
}
