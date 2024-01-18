import { fetchProduct } from '@/_services/firebaseService';

interface RouteParams {
  brandId: string;
  productId: string;
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const product = await fetchProduct(params.brandId, params.productId);

  let MetaDataProps;

  if (!product) {
    MetaDataProps = {
      title: '商品が見つかりません',
      description: '指定された商品は存在しません',
      imageURL: `https://www.fixergarage.shop/ogp.png`,
      url: 'fixergarage.shop',
      type: 'article' as const,
    };
  } else {
    MetaDataProps = {
      title: `${product.productName}（${product.brandName}）`,
      description: product.description,
      imageURL: `https://www.fixergarage.shop/images/products/${params.brandId}/${params.productId}/1.JPG`,
      url: `fixergarage.shop/product/${params.brandId}/${params.productId}`,
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

export type ProductLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: ProductLayoutProps) {
  return <>{children}</>;
}
