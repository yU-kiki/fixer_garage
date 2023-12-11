import { HeaderMenu } from "@/components/elements/HeaderMenu";
import { HeaderLogo } from "@/components/elements/HeaderLogo";
import { HeaderShop } from "@/components/elements/HeaderShop";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderProps = {} & BaseProps;

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={clsx(
        className,
        "flex",
        "justify-center",
        "items-center",
        "fixed",
        "top-0",
        "z-[10]",
        "h-[80px]",
        "w-full",
        "px-[16px]",
        "md:px-[48px]",
        "shadow-md",
        "bg-white"
      )}
    >
      {/* <HeaderMenu /> */}
      <HeaderLogo />
      {/* <HeaderShop /> */}
    </header>
  );
};
