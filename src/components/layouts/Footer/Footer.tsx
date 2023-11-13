import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type FooterProps = {} & BaseProps;

export const Footer = ({ className }: FooterProps) => {
  const links = [
    {
      href: "",
      label: "利用規約",
      style: { marginTop: "120px" },
    },
    {
      href: "",
      label: "プライバシーポリシー",
      style: { marginTop: "16px" },
    },
    {
      href: "",
      label: "特定商取引法に関する表示",
      style: { marginTop: "16px" },
    },
  ];

  return (
    <footer className={clsx(className)}>
      {links.map((link, index) => (
        <a
          key={index}
          className={clsx("block", "text-[14px]", "text-center", "text-gray")}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={link.style}
        >
          {link.label}
        </a>
      ))}
    </footer>
  );
};
