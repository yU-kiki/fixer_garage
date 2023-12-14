import { OrderInfo } from "@/features/components/Order/OrderInfo";
import { CustomerForm } from "@/features/components/Order/CustomerForm";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type OrderWrapperProps = {
  className?: string;
  productId: string;
  productName: string;
  price: number;
  discountPrice?: number;
  selectedSize: string;
} & BaseProps;

export const OrderWrapper = ({
  className,
  productId,
  productName,
  price,
  discountPrice,
  selectedSize,
}: OrderWrapperProps) => {
  const finalPrice = discountPrice || price;

  return (
    <div className={clsx(className)}>
      <OrderInfo
        productId={productId}
        productName={productName}
        finalPrice={finalPrice}
        selectedSize={selectedSize}
      />
      <CustomerForm />
    </div>
  );
};
