import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  color?: "yellow" | "pink" | "blue";
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

const Button = (props: Props) => {
  const { icon, color = "pink", className, children } = props;

  return (
    <button
      className={["button", color, className].join(" ")}
      {...props}
    >
      {icon && <span className="icon button__icon">{icon}</span>}
      <span className="button__label">{children}</span>
    </button>
  );
};

export default Button;
