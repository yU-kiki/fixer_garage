import { atom } from 'recoil';

export type CustomerType = {
  name: string;
  email: string;
  phone: string;
  isBillingDiff: boolean;
  postcode: string;
  prefecture: string;
  city: string;
  address: string;
  buildingAddress?: string;
  billingPostcode?: string;
  billingPrefecture?: string;
  billingCity?: string;
  billingAddress?: string;
  billingBuildingAddress?: string;
};

export const customerInfoState = atom<CustomerType>({
  key: 'customerInfoState',
  default: {
    name: '',
    email: '',
    phone: '',
    isBillingDiff: false,
    postcode: '',
    prefecture: '',
    city: '',
    address: '',
    buildingAddress: '',
    billingPostcode: '',
    billingPrefecture: '',
    billingCity: '',
    billingAddress: '',
    billingBuildingAddress: '',
  },
});
