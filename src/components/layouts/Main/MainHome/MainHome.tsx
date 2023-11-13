import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

export const MainHome = ({ className }: MainHomeProps) => {

  return (
    <div
      className={clsx(
        className,
        "md:w-[320px]",
        "mt-[48px]",
        "mx-auto",
        "mb-[64px]"
      )}
    >
    </div>
  );
};
