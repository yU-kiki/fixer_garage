import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ProductImageProps = {
  className?: string;
  productId: string;
} & BaseProps;

export const ProductImage = ({ className, productId }: ProductImageProps) => {
  return (
    <div
      className={clsx(
        "md:max-w-[640px]",
        "lg:max-w-[768px]",
        "md:mr-[32px]",
        className
      )}
    >
      <Image
        src={`/images/products/unknownjp/${productId}/1.png`}
        alt="product"
        width={160}
        height={90}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};
