import { atom } from 'recoil';

export type OrderProductType = {
  productId: string;
  productName: string;
  brandName: string;
  finalPrice: number;
  selectedSize: string;
};

export const orderProductState = atom<OrderProductType>({
  key: 'orderProductState',
  default: {
    productId: '',
    productName: '',
    brandName: '',
    finalPrice: 0,
    selectedSize: '',
  },
});

export const getDefaultOrderProduct = (): OrderProductType => ({
  productId: '',
  productName: '',
  brandName: '',
  finalPrice: 0,
  selectedSize: '',
});

export type OrderCustomerType = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  prefecture: string;
  city: string;
  address: string;
  buildingAddress?: string;
  isBillingDiff: boolean;
  billingPostcode?: string;
  billingPrefecture?: string;
  billingCity?: string;
  billingAddress?: string;
  billingBuildingAddress?: string;
};

export const orderCustomerState = atom<OrderCustomerType>({
  key: 'orderCustomerState',
  default: {
    name: '',
    email: '',
    phone: '',
    postcode: '',
    prefecture: '',
    city: '',
    address: '',
    buildingAddress: '',
    isBillingDiff: false,
    billingPostcode: '',
    billingPrefecture: '',
    billingCity: '',
    billingAddress: '',
    billingBuildingAddress: '',
  },
});

export const getDefaultOrderCustomer = (): OrderCustomerType => ({
  name: '',
  email: '',
  phone: '',
  postcode: '',
  prefecture: '',
  city: '',
  address: '',
  buildingAddress: '',
  isBillingDiff: false,
  billingPostcode: '',
  billingPrefecture: '',
  billingCity: '',
  billingAddress: '',
  billingBuildingAddress: '',
});

export type CombinedPurchaseType = OrderProductType &
  OrderCustomerType & {
    time: string;
  };
