import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderShopProps = {} & BaseProps;

export const HeaderShop = ({ className }: HeaderShopProps) => {
  return (
    <div className={clsx("flex", "items-center")}>
      <Link className={clsx("")} href="/">
        <Image
          className={clsx("")}
          src="/images/icon/shop.svg"
          alt="カート"
          width={32}
          height={32}
          priority
        />
      </Link>
    </div>
  );
};
