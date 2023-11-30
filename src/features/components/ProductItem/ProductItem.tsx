import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ProductItemProps = {} & BaseProps;

export const ProductItem = ({ className }: ProductItemProps) => {
  return (
    <div className={clsx("w-full", className)}>
      <Link href="/">
        <Image
          src="/images/products/unknownjp/MATT_BK_WH.png"
          alt="商品画像"
          width={160}
          height={90}
          className={clsx(
            "w-full",
            "h-auto",
            "w-[calc(50vw-32px)]",
            "md:w-[calc(33vw-32px)]",
            "lg:w-[calc(25vw-32px)]"
          )}
          layout="responsive"
        />
      </Link>
    </div>
  );
};

