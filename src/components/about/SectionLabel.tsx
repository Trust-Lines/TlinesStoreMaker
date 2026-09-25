import type { CSSProperties } from "react";

export interface SectionLabelProps {
  id: string;
  text: string;
  /**
   * "tab": centred 426 x 98 tab (Figma Vector 20 / Vector 5).
   * "flush": 492 x 96 ribbon flush with the page's left edge (Figma Vector 21), text 150px in.
   */
  variant: "tab" | "flush";
  /** Tailwind bg class (shape colour) and text class. */
  fill: string;
  textColor: string;
  className?: string;
}

const shapes = {
  tab: "url(/images/about/label-left-tab.svg)",
  flush: "url(/images/about/label-flush-left.svg)",
};

/** About-page section label: Figma ribbon shape + Montserrat 44/48 bold title. */
export function SectionLabel({ id, text, variant, fill, textColor, className = "" }: SectionLabelProps) {
  const tab = variant === "tab";
  return (
    <h2
      id={id}
      className={`relative isolate flex items-center font-display text-[clamp(1.6rem,2.76vw,44px)] font-bold leading-[1.09] ${textColor} ${
        tab
          ? // Figma text box inside the 426 x 98 tab: 92 left / 90.32 right / 25 top & bottom.
            "mx-auto aspect-[426/98] w-[min(80%,300px)] justify-center whitespace-nowrap sm:w-[340px] lg:w-[calc(var(--u)*426)] lg:pl-[calc(var(--u)*92)] lg:pr-[calc(var(--u)*90.32)]"
          : "aspect-[492/96] w-[min(88%,340px)] pl-[24%] sm:w-[380px] lg:w-[calc(var(--u)*492)] lg:pl-[calc(var(--u)*150)]"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 ${fill} [mask-repeat:no-repeat] [mask-size:100%_100%]`}
        style={{ maskImage: shapes[variant], WebkitMaskImage: shapes[variant] } as CSSProperties}
      />
      {text}
    </h2>
  );
}
