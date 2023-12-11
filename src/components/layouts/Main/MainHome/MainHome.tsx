import { ProductsWrapper } from "@/components/elements/ProductsWrapper";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

export const MainHome = ({ className }: MainHomeProps) => {

  return (
    <div
      className={clsx(
        className,
        "md:mt-[16px]",
        "mx-auto",
        "mb-[64px]"
      )}
    >
      <ProductsWrapper />
    </div>
  );
};
