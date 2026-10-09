import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
};

const VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

const SIZE: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
}: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`btn ${VARIANT[variant]} ${SIZE[size]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
