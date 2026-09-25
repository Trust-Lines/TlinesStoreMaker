import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { withBold } from "./withBold";

export interface SpecialtyCardData {
  id: string;
  /** Small first ribbon line (Orbitron 28/37 regular), e.g. "Project". */
  eyebrow: string;
  /** Large second ribbon line (Orbitron 38/37 bold). */
  title: string;
  href: string;
  image: string;
  /** CSS object-position for the photo crop. */
  imagePosition?: string;
  /** Bullet copy; wrap a word in **double asterisks** to bold it. */
  points: string[];
  /** Tailwind bg class for the card body. */
  bgClass: string;
}

const shapes = {
  card: "url(/images/figma/specialty/card.svg)",
  photo: "url(/images/figma/specialty/photo-mask.svg)",
  ribbon: "url(/images/figma/specialty/ribbon.svg)",
};

const maskClass = "[mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]";

/**
 * Branding / Management card (Figma "Vector", 628.455 x 782.425): photo
 * 608.455 x 438.528 inset 10px with soft-cut corners; coral ribbon 456 x 90
 * starting 214px in (overhanging the right edge ~40px) and overlapping the
 * photo by 51px, two left-aligned lines; 550 x 180 bullet box 34px in and 36px
 * below the ribbon, Montserrat 22/36 medium (dot 14px, text 36px into the box),
 * all #FFF4E0. Sizes are in cqw (% of card width); the Figma height is a minimum.
 */
export function SpecialtyCard({ card }: { card: SpecialtyCardData }) {
  return (
    <Link
      href={card.href}
      className="group relative isolate flex h-full min-h-[124.5cqw] flex-col pb-[8cqw] text-cream outline-offset-4 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
    >
      <span aria-hidden className={`absolute inset-0 -z-10 ${card.bgClass} ${maskClass}`} style={{ maskImage: shapes.card, WebkitMaskImage: shapes.card } as CSSProperties} />

      <span
        className={`relative mx-[1.59cqw] mt-[1.59cqw] block aspect-[608.455/438.528] shrink-0 overflow-hidden ${maskClass}`}
        style={{ maskImage: shapes.photo, WebkitMaskImage: shapes.photo } as CSSProperties}
      >
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: card.imagePosition ?? "center" }}
        />
      </span>

      <h3
        className={`relative z-10 -mt-[8.11cqw] ml-[28cqw] flex aspect-[456/90] w-[72.56cqw] max-w-none shrink-0 flex-col justify-center pl-[10.7cqw] pt-[0.6cqw] font-accent uppercase sm:ml-[34.05cqw] ${maskClass} bg-coral`}
        style={{ maskImage: shapes.ribbon, WebkitMaskImage: shapes.ribbon } as CSSProperties}
      >
        <span className="block text-[4.455cqw] font-normal leading-[5.1cqw]">{card.eyebrow}</span>
        <span className="block text-[6.047cqw] font-bold leading-[5.887cqw]">{card.title}</span>
      </h3>

      {/* Figma 22/36 = 3.5cqw of the 628 card; floored at 14px for narrow cards. */}
      <ul className="ml-[5.4cqw] mt-[5.72cqw] flex w-[87.5cqw] list-none flex-col font-display text-[clamp(14px,3.5cqw,22px)] font-medium leading-[1.636]">
        {card.points.map((point) => (
          <li key={point} className="relative pl-[1.64em] before:absolute before:left-[0.64em] before:content-['•']">
            {withBold(point)}
          </li>
        ))}
      </ul>
    </Link>
  );
}
