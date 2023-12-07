import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type PurchaseInfoProps = {
  className?: string;
  productId: string;
  price: number;
  discountPrice?: number;
  selectedSize: string;
} & BaseProps;

export const PurchaseInfo = ({
  className,
  productId,
  price,
  discountPrice,
  selectedSize,
}: PurchaseInfoProps) => {
  return (
    <div className={clsx(className)}>
      {productId} {price} {discountPrice} {selectedSize}
    </div>
  );
};
