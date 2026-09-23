import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";
type Shape = "pill" | "chamfered";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  solid: "bg-coral text-cream hover:bg-coral-dark",
  outline: "border border-current hover:bg-current/10",
  ghost: "text-forest hover:text-coral",
};

const shapeClass: Record<Shape, string> = {
  pill: "rounded-full",
  chamfered: "shape-chamfered",
};

const sizeClass: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
};

export interface ActionLinkProps {
  label: string;
  href: string;
  variant?: Variant;
  shape?: Shape;
  size?: Size;
  icon?: ReactNode;
}

export function ActionLink({
  label,
  href,
  variant = "solid",
  shape = "pill",
  size = "md",
  icon,
}: ActionLinkProps) {
  const isGhost = variant === "ghost";
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral active:scale-[0.98] ${
        isGhost ? "" : shapeClass[shape]
      } ${variantClass[variant]} ${isGhost ? "" : sizeClass[size]}`}
    >
      {label}
      {icon}
    </Link>
  );
}
