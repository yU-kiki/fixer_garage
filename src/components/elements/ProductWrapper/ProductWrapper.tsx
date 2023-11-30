import { ProductItem } from "@/features/components/ProductItem";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ProductWrapperProps = {} & BaseProps;

export const ProductWrapper = ({ className }: ProductWrapperProps) => {
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
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </div>
  );
};
