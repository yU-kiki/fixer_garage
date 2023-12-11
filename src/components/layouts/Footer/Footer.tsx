import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type FooterProps = {} & BaseProps;

export const Footer = ({ className }: FooterProps) => {
  const links = [
    {
      href: "https://unknownbikesjp.notion.site/a9cb406162204305967d96a1e9d7cad6",
      label: "利用規約",
      style: { marginTop: "120px" },
    },
    {
      href: "https://unknownbikesjp.notion.site/1e8192b3759c410194a133f7dde6adfc",
      label: "プライバシーポリシー",
      style: { marginTop: "16px" },
    },
    {
      href: "https://unknownbikesjp.notion.site/ba73d5370c69483b9113d409284e17f8",
      label: "特定商取引法に関する表示",
      style: { marginTop: "16px", marginBottom: "120px" },
    },
  ];

  return (
    <footer
      className={clsx(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        className
      )}
    >
      {links.map((link, index) => (
        <a
          key={index}
          className={clsx(
            "inline-block",
            "text-[14px]",
            "text-center",
            "text-gray"
          )}
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
