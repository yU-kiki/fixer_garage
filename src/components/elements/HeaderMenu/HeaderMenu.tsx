import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderMenuProps = {} & BaseProps;

export const HeaderMenu = ({ className }: HeaderMenuProps) => {
  return (
    <div className={clsx("flex", "items-center")}>
      <Image
        className={clsx("")}
        src="/images/icon/menu.svg"
        alt="メニュー"
        width={32}
        height={32}
        priority
      />
    </div>
  );
};
