import { atom } from "recoil";

export type ProductType = {
  id: string;
  isDisplay: boolean;
  productName: string;
  brandName: string;
  description: string;
  price: number;
  discountPrice?: number;
  stocks: { [size: string]: number };
};

export const productState = atom<ProductType | null>({
  key: "productState",
  default: null,
});

export const productsState = atom<ProductType[]>({
  key: "productsState",
  default: [],
});
