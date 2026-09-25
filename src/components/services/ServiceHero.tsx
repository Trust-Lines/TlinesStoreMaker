import Image from "next/image";
import type { ShapeTone } from "@/lib/content";
import { ShapeFill } from "./ShapeFill";

export interface ServiceHeroProps {
  title: string;
  image: string;
  ribbon: ShapeTone;
}

/**
 * Full-bleed service hero under the absolutely-positioned ReferenceTopBar.
 * From sm up it follows the Figma frame ratio (1592 x 923); the title ribbon
 * (653 x 225, flush left) sits at 43% of the hero height.
 */
export function ServiceHero({ title, image, ribbon }: ServiceHeroProps) {
  return (
    <section aria-labelledby="service-heading" className="relative isolate bg-forest">
      <div className="relative h-[min(100svh,560px)] min-h-[420px] w-full sm:aspect-[1592/923] sm:h-auto sm:min-h-0">
        <Image src={image} alt="" fill priority sizes="(min-width: 1592px) 1592px, 100vw" className="object-cover" />

        <div
          className={`absolute bottom-[12%] left-0 isolate flex aspect-[653/225] w-[min(82%,420px)] items-center pb-[3%] pl-[16%] sm:bottom-auto sm:top-[43%] sm:w-[41.02%] sm:pl-[7.2%] ${ribbon.text}`}
        >
          <ShapeFill src="/images/figma/service/hero-ribbon.svg" className={ribbon.fill} />
          <h1
            id="service-heading"
            className="font-accent text-[clamp(1.75rem,4.27vw,68px)] font-bold uppercase leading-none tracking-[0.02em]"
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
