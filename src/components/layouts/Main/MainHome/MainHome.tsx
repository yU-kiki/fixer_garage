import { ProductWrapper } from "@/components/elements/ProductWrapper";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

export const MainHome = ({ className }: MainHomeProps) => {

  return (
    <div
      className={clsx(
        className,
        "mt-[48px]",
        "mx-auto",
        "mb-[64px]"
      )}
    >
      <ProductWrapper />
    </div>
  );
};
