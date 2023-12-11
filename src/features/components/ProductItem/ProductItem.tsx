import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

interface StockStatusProps {
  sizes: { [size: string]: number };
}
const StockStatus = ({ sizes }: StockStatusProps) => {
  const isSoldOut = Object.values(sizes).every((quantity) => quantity === 0);

  return (
    <>
      {isSoldOut ? (
        <p
          className={clsx(
            "inline-block",
            "mb-[8px]",
            "px-[6px]",
            "py-[2px]",
            "text-[10px]",
            "md:text-[12px]",
            "text-white",
            "bg-red"
          )}
        >
          Sold Out
        </p>
      ) : null}
    </>
  );
};

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
  discountPrice?: number;
}
const Price = ({ price, discountPrice }: PriceProps) => {
  return (
    <p
      className={clsx(
        "mb-[4px]",
        "text-[10px]",
        "md:text-[14px]",
        "text-black"
      )}
    >
      {discountPrice ? (
        <>
          <span className={clsx("line-through")}>
            ￥{price.toLocaleString()}
          </span>
          <span className={clsx("ml-[4px]", "font-[600]", "text-red")}>
            ￥{discountPrice.toLocaleString()}
          </span>
        </>
      ) : (
        <>￥{price.toLocaleString()}</>
      )}
    </p>
  );
};

export type ProductItemProps = {
  className?: string;
  productId: string;
  productName: string;
  brandName: string;
  price: number;
  discountPrice?: number;
  sizes: { [size: string]: number };
} & BaseProps;

export const ProductItem = ({
  className,
  productId,
  productName,
  brandName,
  price,
  discountPrice,
  sizes,
}: ProductItemProps) => {
  return (
    <Link
      href={`/product/unknownjp/${productId}`}
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
        src={`/images/products/unknownjp/${productId}/1.png`}
        alt="商品画像"
        width={160}
        height={90}
        priority
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div className={clsx("p-[12px]")}>
        <StockStatus sizes={sizes} />
        <Brand brandName={brandName} />
        <ProductName productName={productName} />
        <Price price={price} discountPrice={discountPrice} />
      </div>
    </Link>
  );
};
