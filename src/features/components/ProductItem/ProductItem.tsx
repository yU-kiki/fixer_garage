import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

interface BrandProps {
  brandName: string;
}
const Brand = ({ brandName }: BrandProps) => (
  <p
    className={clsx("mb-[4px]", "font-[600]", "text-[10px]", "md:text-[12px]")}
  >
    {brandName}
  </p>
);

interface ProductNameProps {
  productName: string;
}
const ProductName = ({ productName }: ProductNameProps) => (
  <p
    className={clsx("mb-[8px]", "font-[600]", "text-[12px]", "md:text-[18px]")}
  >
    {productName}
  </p>
);

interface PriceProps {
  price: number;
}
const Price = ({ price }: PriceProps) => (
  <p className={clsx("mb-[4px]", "text-[10px]", "md:text-[14px]")}>
    ￥{price.toLocaleString()}
  </p>
);

export type ProductItemProps = {} & BaseProps;

export const ProductItem = ({ className }: ProductItemProps) => {
  return (
    <Link
      href="/"
      className={clsx(
        "rounded-[12px]",
        "bg-white",
        "shadow-box",
        "overflow-hidden",
        "cursor-pointer",
        className
      )}
    >
      <Image
        src="/images/products/unknownjp/MATT_BK_WH.png"
        alt="商品画像"
        width={160}
        height={90}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div className={clsx("p-[12px]")}>
        <Brand brandName="unknown" />
        <ProductName productName="MATT_BK_WH" />
        <Price price={126000} />
      </div>
    </Link>
  );
};
