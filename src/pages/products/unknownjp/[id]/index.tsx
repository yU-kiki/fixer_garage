import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { productState } from "@/stores/productState";
import { fetchProduct } from "@/services/firebaseService";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Main } from "@/components/layouts/Main";
import { BaseProps } from "@/types/BaseProps";

export type ProductProps = {} & BaseProps;

export default function Product({ className }: ProductProps) {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useRecoilState(productState);

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchProduct(id).then((data) => {
        if (data) {
          setProduct(data);
        }
      });
    }
  }, [id]);

  return (
    <>
      <Header />
      <Main className="pt-[80px]">
        {product && (
          <div>
            <p>{product.productName}</p>
            <p>{product.brandName}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.discountPrice}</p>
          </div>
        )}
      </Main>
      <Footer />
    </>
  );
}
