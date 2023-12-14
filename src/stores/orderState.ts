import { atom } from "recoil";

export type OrderType = {
  productId: string;
  productName: string;
  finalPrice: number;
  selectedSize: string;
};

export const orderInfoState = atom<OrderType>({
  key: "orderInfoState",
  default: {
    productId: "",
    productName: "",
    finalPrice: 0,
    selectedSize: "",
  },
});
