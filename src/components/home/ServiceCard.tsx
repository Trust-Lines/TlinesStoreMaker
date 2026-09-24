import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export interface ServiceCardData {
  id: string;
  title: string;
  href: string;
  image: string;
  bullets: string[];
  /** Tailwind classes for the card body color and its text color. */
  bgClass: string;
  textClass: string;
  /** Tailwind bg + text classes for the slanted title ribbon. */
  ribbonClass: string;
}

export interface ServiceCardProps {
  card: ServiceCardData;
  imageAspect?: string;
  ribbonAlign?: "left" | "right";
  sizes?: string;
}

/**
 * Colored chamfered card with an inset photo and a slanted title ribbon.
 * The chamfer clip lives on a background layer only, so the ribbon can
 * overhang the card edge and focus rings stay visible.
 */
export function ServiceCard({
  card,
  imageAspect = "455 / 376",
  ribbonAlign = "left",
  sizes = "(min-width: 768px) 33vw, 100vw",
}: ServiceCardProps) {
  return (
    <Link
      href={card.href}
      className={`group relative isolate flex h-full flex-col pb-8 outline-offset-4 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${card.textClass}`}
    >
      <div
        aria-hidden
        className={`shape-chamfered absolute inset-0 -z-10 ${card.bgClass}`}
        style={{ "--chamfer": "14px" } as CSSProperties}
      />

      <div
        className="shape-chamfered relative m-2.5 overflow-hidden"
        style={{ aspectRatio: imageAspect, "--chamfer": "12px" } as CSSProperties}
      >
        <Image src={card.image} alt="" fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>

      {/* Ribbon outline is the exact Figma vector, used as a mask so each card
          can tint it with its own ribbon color. */}
      <h3
        className={`relative z-10 -mt-7 flex items-center justify-center px-6 font-accent text-[clamp(1.5rem,2.7vw,2.6rem)] font-bold uppercase leading-none tracking-[0.02em] [mask-repeat:no-repeat] [mask-size:100%_100%] sm:-mt-9 ${card.ribbonClass} ${
          ribbonAlign === "left"
            ? "-mr-3 ml-2 aspect-[338/67] [mask-image:url(/images/figma/ribbon-service.svg)]"
            : "-mr-3 ml-[18%] aspect-[464/74] [mask-image:url(/images/figma/ribbon-specialty.svg)]"
        }`}
      >
        {card.title}
      </h3>

      <ul className="mt-5 list-none space-y-0.5 px-8 text-[clamp(0.95rem,1.2vw,1.15rem)] leading-snug sm:px-[12%]">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:content-['•']">
            {bullet}
          </li>
        ))}
      </ul>
    </Link>
  );
}
