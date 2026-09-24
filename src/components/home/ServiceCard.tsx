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
  /** Exact Figma ribbon vector, used as a mask and tinted by ribbonClass. */
  ribbonShape?: string;
  /** Exact Figma card outline; masks the card background instead of the CSS chamfer. */
  cardShape?: string;
}

export interface ServiceCardProps {
  card: ServiceCardData;
  imageAspect?: string;
  /** Photo aspect below sm (phones); defaults to imageAspect. */
  mobileImageAspect?: string;
  ribbonAlign?: "left" | "right";
  sizes?: string;
}

/**
 * Colored card with an inset photo and a slanted title ribbon.
 *
 * sm+ (tablet/desktop): exact Figma vectors — card outline and ribbon applied
 * as CSS masks, chamfered photo, centered ribbon title.
 * Below sm (phones): the Figma vectors would be distorted by the narrower box,
 * so the card switches to a compact variant — rounded card, wide photo with
 * rounded top corners, full-width ribbon with a rounded left end and slanted
 * right end, title left-aligned.
 *
 * The card shape lives on a background layer only, so the ribbon can overhang
 * the card edge and focus rings stay visible.
 */
export function ServiceCard({
  card,
  imageAspect = "455 / 376",
  mobileImageAspect,
  ribbonAlign = "left",
  sizes = "(min-width: 768px) 33vw, 100vw",
}: ServiceCardProps) {
  const cardMask = card.cardShape ? `url(${card.cardShape})` : undefined;
  const ribbonMask = card.ribbonShape ? `url(${card.ribbonShape})` : undefined;

  return (
    <Link
      href={card.href}
      className={`group relative isolate flex h-full flex-col pb-5 outline-offset-4 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral sm:pb-8 ${card.textClass}`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 rounded-[18px] ${card.bgClass} sm:rounded-none ${
          cardMask
            ? "sm:[-webkit-mask-image:var(--card-mask)] sm:[mask-image:var(--card-mask)] sm:[mask-repeat:no-repeat] sm:[mask-size:100%_100%]"
            : "shape-chamfered-sm"
        }`}
        style={{ "--card-mask": cardMask, "--chamfer": "14px" } as CSSProperties}
      />

      <div
        className="shape-chamfered-sm relative m-2.5 mb-0 aspect-[var(--img-aspect-sm)] overflow-hidden rounded-t-[14px] sm:mb-2.5 sm:aspect-[var(--img-aspect)] sm:rounded-none"
        style={{ "--img-aspect": imageAspect, "--img-aspect-sm": mobileImageAspect ?? imageAspect, "--chamfer": "12px" } as CSSProperties}
      >
        <Image src={card.image} alt="" fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>

      {/* sm+: ribbon outline is the exact Figma vector, used as a mask so each card
          can tint it with its own ribbon color. Phones: full-width CSS ribbon. */}
      <h3
        style={{ "--ribbon-mask": ribbonMask } as CSSProperties}
        className={`relative z-10 -ml-1.5 -mr-3.5 flex items-center justify-start rounded-l-[18px] py-2 pl-[9%] pr-6 text-left font-accent text-[clamp(1.35rem,6vw,1.6rem)] font-bold uppercase leading-none [clip-path:polygon(0_0,100%_0,95%_100%,0_100%)] sm:-mt-9 sm:justify-center sm:rounded-none sm:py-0 sm:pl-6 sm:text-center sm:text-[clamp(1.5rem,2.7vw,2.6rem)] sm:[-webkit-mask-image:var(--ribbon-mask)] sm:[clip-path:none] sm:[mask-image:var(--ribbon-mask)] sm:[mask-repeat:no-repeat] sm:[mask-size:100%_100%] lg:text-[min(2.513vw,40px)] lg:leading-[1.2] ${card.ribbonClass} ${
          ribbonAlign === "left"
            ? "sm:ml-2 sm:-mr-[9.95%] sm:aspect-[412/66]"
            : "sm:-mr-[6.4%] sm:ml-0 sm:aspect-[431/69] sm:w-[68.63%] sm:self-end"
        }`}
      >
        {card.title}
      </h3>

      {/* Figma subtitle: Montserrat 22/24, regular. */}
      <ul className="mt-4 list-none space-y-0.5 px-7 font-display text-[1rem] font-normal leading-snug sm:mt-5 sm:px-[12%] sm:text-[clamp(0.95rem,1.2vw,1.15rem)] lg:text-[min(1.382vw,22px)] lg:leading-[1.0909]">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:content-['•']">
            {bullet}
          </li>
        ))}
      </ul>
    </Link>
  );
}
