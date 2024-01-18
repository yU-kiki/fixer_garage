import { fetchBrand } from '@/_services/firebaseService';

interface RouteParams {
  brandId: string;
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const brand = await fetchBrand(params.brandId);

  let MetaDataProps;

  if (!brand) {
    MetaDataProps = {
      title: 'ストアが見つかりません',
      description: '指定されたストアは存在しません',
      imageURL: `https://www.fixergarage.shop/ogp.png`,
      url: 'fixergarage.shop',
      type: 'article' as const,
    };
  } else {
    MetaDataProps = {
      title: brand.name,
      description: brand.description,
      imageURL: `https://www.fixergarage.shop/metadata/${params.brandId}/ogp.png`,
      url: `fixergarage.shop/${params.brandId}`,
      type: 'article' as const,
    };
  }

  return {
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
}

export type BrandLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: BrandLayoutProps) {
  return <>{children}</>;
}
