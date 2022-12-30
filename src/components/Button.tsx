import type { ReactNode } from "react";

type Props = {
  label: string;
  as?: "button" | "a";
  href?: string | undefined;
  onClick?: () => void;
  type?: "button" | "submit" | undefined;
  icon?: ReactNode;
  disabled?: boolean;
  color?: "yellow" | "pink" | "blue" | undefined;
  className?: string;
};

const Button = ({
  label,
  as: Tag = "button",
  href,
  onClick,
  type,
  icon,
  disabled,
  color = "pink",
  className,
}: Props) => {
  return (
    <Tag
      className={["button", color, className].join(" ")}
      href={href}
      disabled={disabled}
      onClick={onClick}
      type={type}
      target={href ?? "_blank"}
      rel={href ?? "noreferrer noopener"}
    >
      {icon && <span className="icon button__icon">{icon}</span>}
      <span className="button__label">{label}</span>
    </Tag>
  );
};

export default Button;
