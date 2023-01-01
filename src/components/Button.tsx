import type { ReactNode } from "react";

type Props = {
  as?: "button" | "a";
  href?: string;
  icon?: ReactNode;
  color?: "yellow" | "pink" | "blue";
  className?: string;
} & React.ComponentPropsWithoutRef<"button"> &
  React.ComponentPropsWithoutRef<"a">;

export default function Button(props: Props) {
  const { as: Tag = "button", href, icon, color = "pink", className, children, ...rest } = props;

  return (
    <Tag
      href={href}
      className={["button", color, className].join(" ")}
      {...rest}
    >
      {icon && <span className="icon button__icon">{icon}</span>}
      <span className="button__label">{children}</span>
    </Tag>
  );
}
