import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderLogoProps = {} & BaseProps;

export const HeaderLogo = ({ className }: HeaderLogoProps) => {
  return (
    <Link className={clsx("")} href="/">
      <Image
        className={clsx("")}
        src="/images/logo.svg"
        alt="ロゴ"
        width={160}
        height={32}
        priority
      />
    </Link>
  );
};
