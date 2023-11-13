import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type LogoProps = {} & BaseProps;

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link className={clsx("font-bold", "text-2xl")} href="/">
      <Image
        className={clsx("")}
        src="/images/logo.svg"
        alt="ロゴ"
        width={80}
        height={80}
        priority
      />
    </Link>
  );
};
