import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { productState } from "@/stores/productState";
import { fetchProduct } from "@/services/firebaseService";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Main } from "@/components/layouts/Main";
import { ProductWrapper } from "@/components/elements/ProductWrapper";
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
        {product?.isDisplay && (
          <ProductWrapper
            productId={product.id}
            productName={product.productName}
            brandName={product.brandName}
            description={product.description}
            price={product.price}
            discountPrice={product.discountPrice}
            sizes={product.sizes}
          />
        )}
      </Main>
      <Footer />
    </>
  );
}
