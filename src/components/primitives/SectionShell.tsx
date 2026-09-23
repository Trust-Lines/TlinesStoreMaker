import { type ElementType, type ReactNode } from "react";

type Tone = "cream" | "forest" | "sage";

const toneBackground: Record<Tone, string> = {
  cream: "bg-cream",
  forest: "bg-forest text-cream",
  sage: "bg-sage-dark/20 text-ink",
};

const spacingClass = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
} as const;

export interface SectionShellProps {
  id?: string;
  tone?: Tone;
  edgeTop?: boolean;
  edgeBottom?: boolean;
  spacing?: keyof typeof spacingClass;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function SectionShell({
  id,
  tone = "cream",
  edgeTop = false,
  edgeBottom = false,
  spacing = "md",
  as: Component = "section",
  className = "",
  children,
}: SectionShellProps) {
  const edgeClasses = [edgeTop && "section-edge-top", edgeBottom && "section-edge-bottom"]
    .filter(Boolean)
    .join(" ");

  return (
    <Component id={id} className={`relative isolate ${spacingClass[spacing]} ${className}`}>
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 ${toneBackground[tone]} ${edgeClasses}`}
      />
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">{children}</div>
    </Component>
  );
}
