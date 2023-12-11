import { PurchaseInfo } from "@/features/components/PurchaseInfo";
import { CustomerForm } from "@/features/components/CustomerForm";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type PurchaseWrapperProps = {
  className?: string;
  productId: string;
  productName: string;
  price: number;
  discountPrice?: number;
  selectedSize: string;
} & BaseProps;

export const PurchaseWrapper = ({
  className,
  productId,
  productName,
  price,
  discountPrice,
  selectedSize,
}: PurchaseWrapperProps) => {
  const finalPrice = discountPrice || price;

  return (
    <div className={clsx(className)}>
      <PurchaseInfo
        productId={productId}
        productName={productName}
        finalPrice={finalPrice}
        selectedSize={selectedSize}
      />
      <CustomerForm />
    </div>
  );
};
