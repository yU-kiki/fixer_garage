import { atom } from 'recoil';

export type ProductType = {
  id: string;
  isDisplay: boolean;
  productName: string;
  brandName: string;
  description: string;
  detailDescription: string;
  price: number;
  discountPrice?: number;
  sizes: { [size: string]: number };
  imageCount: number;
};

export const productState = atom<ProductType | null>({
  key: 'productState',
  default: null,
});

export const productsState = atom<ProductType[]>({
  key: 'productsState',
  default: [],
});
