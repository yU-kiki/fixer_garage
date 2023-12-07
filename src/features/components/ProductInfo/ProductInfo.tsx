import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

interface StockStatusProps {
  stocks: { [size: string]: number };
}
const StockStatus = ({ stocks }: StockStatusProps) => {
  const isSoldOut = Object.values(stocks).every((quantity) => quantity === 0);

  return (
    <>
      {isSoldOut ? (
        <p
          className={clsx(
            "inline-block",
            "mb-[8px]",
            "px-[16px]",
            "py-[4px]",
            "text-[16px]",
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
  <p className={clsx("mb-[4px]", "font-[600]", "text-[16px]")}>{brandName}</p>
);

interface ProductNameProps {
  productName: string;
}
const ProductName = ({ productName }: ProductNameProps) => (
  <p className={clsx("mb-[8px]", "font-[600]", "text-[24px]")}>{productName}</p>
);

interface PriceProps {
  price: number;
  discountPrice?: number;
}
const Price = ({ price, discountPrice }: PriceProps) => {
  return (
    <p className={clsx("text-[20px]", "text-black")}>
      {discountPrice ? (
        <>
          <span className={clsx("line-through")}>
            ￥{price.toLocaleString()}
          </span>
          <span className={clsx("ml-[8px]", "font-[600]", "text-red")}>
            ￥{discountPrice.toLocaleString()}
          </span>
        </>
      ) : (
        <>￥{price.toLocaleString()}</>
      )}
    </p>
  );
};

interface DescriptionProps {
  description: string;
}
const Description = ({ description }: DescriptionProps) => (
  <p
    className={clsx(
      "py-[16px]",
      "text-[12px]",
      "md:text-[16px]",
      "leading-[2]"
    )}
  >
    {description}
  </p>
);

interface StockOptionProps {
  stocks: { [size: string]: number };
}
const StockOption = ({ stocks }: StockOptionProps) => {
  const sizeOrder = ["XS", "S", "M", "L", "XL"];

  return (
    <div className={clsx("flex", "flex-col", "py-[16px]", "text-[16px]")}>
      <label htmlFor="stock-select" className={clsx("mb-[8px]", "font-[600]")}>
        サイズ
      </label>
      <select
        id="stock-select"
        className={clsx(
          "px-[16px]",
          "py-[8px]",
          "border",
          "border-gray",
          "rounded-[8px]"
        )}
      >
        <option value="">未選択</option>
        {sizeOrder
          .filter((size) => size in stocks)
          .map((size) => {
            const quantity = stocks[size];
            return quantity > 0 ? (
              <option key={size} value={size}>
                {size}
              </option>
            ) : (
              <option key={size} value={size} disabled>
                {size} (Sold Out)
              </option>
            );
          })}
      </select>
    </div>
  );
};



export type ProductInfoProps = {
  className?: string;
  productName: string;
  brandName: string;
  description: string;
  price: number;
  discountPrice?: number;
  stocks: { [size: string]: number };
} & BaseProps;

export const ProductInfo = ({
  className,
  productName,
  brandName,
  description,
  price,
  discountPrice,
  stocks,
}: ProductInfoProps) => {
  return (
    <div
      className={clsx(
        "md:min-w-[288px]",
        "md:max-w-[288px]",
        "lg:max-w-[384px]",
        "xl:max-w-[512px]",
        "mt-[16px]",
        "md:mt-0",
        "mx-[16px]",
        "divide-y",
        "divide-light-gray",
        className
      )}
    >
      <div className={clsx("py-[16px]")}>
        <StockStatus stocks={stocks} />
        <Brand brandName={brandName} />
        <ProductName productName={productName} />
        <Price price={price} discountPrice={discountPrice} />
      </div>
      <div>
        <Description description={description} />
      </div>
      <div>
        <StockOption stocks={stocks} />
      </div>
    </div>
  );
};
