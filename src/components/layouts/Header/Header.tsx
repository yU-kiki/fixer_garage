import { Logo } from "@/components/elements/Logo";
import { HeaderList } from "@/features/components/HeaderList";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderProps = {} & BaseProps;

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={clsx(
        className,
        "flex",
        "justify-between",
        "items-center",
        "fixed",
        "top-0",
        "z-[10]",
        "w-[100%]",
        "px-[16px]",
        "md:px-[48px]",
        "shadow-md",
        "bg-white"
      )}
    >
      <Logo />
      <HeaderList />
    </header>
  );
};
