import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export interface ServiceToursStripProps {
  heading: string;
  tours: { id: string; title: string; image: string; href: string }[];
}

/**
 * Closing band of the service pages: forest "360 tour" bar over a sage strip
 * of chamfered tour tiles (~230 x 205 on the 1592 frame, bleeding off both
 * edges). Swipeable on small screens.
 */
export function ServiceToursStrip({ heading, tours }: ServiceToursStripProps) {
  return (
    <section aria-labelledby="service-tours-heading" className="bg-sage pb-[clamp(16px,1.9vw,30px)]">
      <h2
        id="service-tours-heading"
        className="bg-forest px-6 py-[clamp(12px,1.3vw,20px)] text-center font-accent text-[clamp(1.1rem,1.884vw,30px)] font-bold leading-tight text-cream"
      >
        {heading}
      </h2>

      <ul className="mt-[clamp(12px,1.3vw,20px)] flex snap-x snap-mandatory gap-[clamp(8px,0.8vw,13px)] overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 lg:-ml-[1.6%] lg:overflow-visible lg:px-0">
        {tours.map((tour) => (
          <li key={tour.id} className="w-[46%] shrink-0 snap-start sm:w-[28%] lg:w-[14.45%]">
            <Link
              href={tour.href}
              className="group block outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
            >
              <span
                className="shape-chamfered relative block aspect-[230/205] overflow-hidden"
                style={{ "--chamfer": "clamp(12px,1.2vw,18px)" } as CSSProperties}
              >
                <Image src={tour.image} alt="" fill sizes="(min-width: 1024px) 15vw, 46vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <Image
                  src="/images/figma/project-badge-icon-b.svg"
                  alt=""
                  width={72}
                  height={72}
                  unoptimized
                  className="absolute left-1/2 top-1/2 w-[26%] -translate-x-1/2 -translate-y-1/2"
                />
              </span>
              <span className="sr-only">{tour.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
