import { ProductImage } from "@/features/components/ProductImage";
import { ProductInfo } from "@/features/components/ProductInfo";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ProductWrapperProps = {
  className?: string;
  productId: string;
  productName: string;
  brandName: string;
  description: string;
  price: number;
  discountPrice?: number;
  stocks: { [size: string]: number };
} & BaseProps;

export const ProductWrapper = ({
  className,
  productId,
  productName,
  brandName,
  description,
  price,
  discountPrice,
  stocks,
}: ProductWrapperProps) => {
  return (
    <div
      className={clsx(
        "md:flex",
        "md:justify-between",
        "md:mt-[32px]",
        "md:px-[32px]",
        className
      )}
    >
      <ProductImage productId={productId} />
      <ProductInfo
        productName={productName}
        brandName={brandName}
        description={description}
        price={price}
        discountPrice={discountPrice}
        stocks={stocks}
      />
    </div>
  );
};
