import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { productsState } from "@/stores/productState";
import { fetchProducts } from "@/services/firebaseService";
import { ProductItem } from "@/features/components/ProductItem";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ProductsWrapperProps = {} & BaseProps;

export const ProductsWrapper = ({ className }: ProductsWrapperProps) => {
  const [products, setProducts] = useRecoilState(productsState);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, [setProducts]);

  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-2",
        "gap-x-[16px]",
        "gap-y-[32px]",
        "max-x-[1280px]",
        "mx-auto",
        "px-[24px]",
        "py-[32px]",
        "md:grid-cols-3",
        "md:gap-x-[24px]",
        "lg:grid-cols-4",
        "lg:gap-x-[32px]",
        className
      )}
    >
      {products.map((product, index) => (
        <ProductItem
          key={index}
          productId={product.id}
          productName={product.productName}
          brandName={product.brandName}
          price={product.price}
          discountPrice={product.discountPrice}
          sizes={product.sizes}
        />
      ))}
    </div>
  );
};