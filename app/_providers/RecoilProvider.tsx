'use client';

import { ReactNode, useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { orderProductState } from '@/_stores/orderState';

function InitializeOrderProduct() {
  const setOrderProduct = useSetRecoilState(orderProductState);

  useEffect(() => {
    const savedOrderProduct = localStorage.getItem('orderProduct');
    if (savedOrderProduct) {
      setOrderProduct(JSON.parse(savedOrderProduct));
    }
  }, [setOrderProduct]);

  return null;
}

export default function RecoilProvider({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      {children}
      <InitializeOrderProduct />
    </RecoilRoot>
  );
}
