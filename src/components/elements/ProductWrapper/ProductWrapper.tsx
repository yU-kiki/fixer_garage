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
        "gap-x-[32px]",
        "gap-y-[16px]",
        "max-w-[1280px]",
        "mx-auto",
        "px-[32px]",
        "md:grid-cols-3",
        "md:gap-y-[24px]",
        "lg:grid-cols-4",
        "lg:gap-y-[32px]",
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
