import { ProductImage } from "@/features/components/ProductImage";
import { ProductInfo } from "@/features/components/ProductInfo";
import { DetailProductInfo } from "@/features/components/DetailProductInfo";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ProductWrapperProps = {
  className?: string;
  productId: string;
  productName: string;
  brandName: string;
  description: string;
  detail_description: string;
  price: number;
  discountPrice?: number;
  sizes: { [size: string]: number };
} & BaseProps;

export const ProductWrapper = ({
  className,
  productId,
  productName,
  brandName,
  description,
  detail_description,
  price,
  discountPrice,
  sizes,
}: ProductWrapperProps) => {
  return (
    <div>
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
          productId={productId}
          productName={productName}
          brandName={brandName}
          description={description}
          price={price}
          discountPrice={discountPrice}
          sizes={sizes}
        />
      </div>
      <DetailProductInfo
        brandName={brandName}
        detailDescription={detail_description}
      />
    </div>
  );
};
