import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderListProps = {} & BaseProps;

export const HeaderList = ({ className }: HeaderListProps) => {
  return (
    <div className={clsx("flex", "items-center")}>
      <Link className={clsx("font-[600]")} href="/">
        ホーム
      </Link>
    </div>
  );
};
