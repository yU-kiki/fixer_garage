import React from "react";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";


export type ConfirmOrderButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & BaseProps;

export const ConfirmOrderButton: React.FC<ConfirmOrderButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "w-full",
        "mt-[32px]",
        "px-[64px]",
        "py-[16px]",
        "text-white",
        "bg-black",
        "rounded-[100px]",
        className
      )}
      onClick={onClick}
    >
      注文を確定する
    </button>
  );
};
