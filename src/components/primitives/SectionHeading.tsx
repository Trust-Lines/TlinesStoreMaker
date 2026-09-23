import { type ElementType } from "react";

type Align = "left" | "center";
type Tone = "dark" | "light";

const alignClass: Record<Align, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
};

const toneClass: Record<Tone, { title: string; subtitle: string }> = {
  dark: { title: "text-forest", subtitle: "text-ink/60" },
  light: { title: "text-cream", subtitle: "text-cream/70" },
};

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: Align;
  tone?: Tone;
  as?: ElementType;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  tone = "dark",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const colors = toneClass[tone];
  return (
    <div className={`flex flex-col gap-3 ${alignClass[align]}`}>
      <Heading
        className={`font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl ${colors.title}`}
      >
        {title}
        {subtitle ? (
          <>
            <br />
            <span className="font-normal">{subtitle}</span>
          </>
        ) : null}
      </Heading>
    </div>
  );
}
