import Image from "next/image";
import type { CSSProperties } from "react";
import type { ShapeTone } from "@/lib/content";
import { ShapeFill } from "./ShapeFill";

export interface ServiceFeatureRowProps {
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
  /** Text on the right, image on the left (the Figma rows alternate). */
  reversed?: boolean;
  titleTone: ShapeTone;
  boxTone: ShapeTone;
}

const ribbon = {
  left: { title: "/images/figma/service/title-ribbon-left.svg", box: "/images/figma/service/text-box-left.svg" },
  right: { title: "/images/figma/service/title-ribbon-right.svg", box: "/images/figma/service/text-box-right.svg" },
};

/**
 * One alternating row of the service page ("CStore" Figma frame, 1592 wide):
 * a coral title ribbon (497 x 130) over a gold text box (653 x 304), both flush
 * to the page edge, beside an 800 x 445 photo inset 92px from the other edge.
 * Widths are % of the frame so the row scales as one piece from lg up.
 */
export function ServiceFeatureRow({ id, title, paragraphs, image, reversed = false, titleTone, boxTone }: ServiceFeatureRowProps) {
  const side = reversed ? ribbon.right : ribbon.left;
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`flex flex-col gap-6 lg:items-center lg:justify-between lg:gap-0 ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <div className={`flex w-full flex-col lg:w-[41.02%] ${reversed ? "items-end" : "items-start"}`}>
        <div
          className={`relative isolate flex min-h-[64px] w-[min(80%,420px)] items-center py-[3%] lg:aspect-[497/130] lg:min-h-0 lg:w-[76.1%] ${titleTone.text} ${
            reversed ? "pl-[14%] pr-[8%]" : "pl-[26%] pr-[12%]"
          }`}
        >
          <ShapeFill src={side.title} className={titleTone.fill} />
          <h2
            id={headingId}
            className="font-display text-[clamp(1.5rem,2.9vw,46px)] font-bold leading-[0.95]"
          >
            {title}
          </h2>
        </div>

        <div
          className={`relative isolate mt-[clamp(4px,0.63vw,10px)] flex w-[min(94%,520px)] flex-col justify-center gap-[1em] pb-[9%] pt-[7%] font-display text-[clamp(0.9rem,1.2vw,19px)] font-medium leading-snug ${boxTone.text} lg:aspect-[653/304] lg:w-full lg:pb-[6%] lg:pt-[5%] ${
            reversed ? "pl-[14%] pr-[8%] lg:pl-[12%] lg:pr-[22%]" : "pl-[8%] pr-[14%] lg:pl-[22%] lg:pr-[26%]"
          }`}
        >
          <ShapeFill src={side.box} className={boxTone.fill} />
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div
        className={`shape-chamfered relative mx-5 aspect-[800/445] sm:mx-8 lg:mx-0 lg:w-[50.25%] ${reversed ? "lg:ml-[5.78%]" : "lg:mr-[5.78%]"}`}
        style={{ "--chamfer": "clamp(18px,2.5vw,40px)" } as CSSProperties}
      >
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
    </section>
  );
}
