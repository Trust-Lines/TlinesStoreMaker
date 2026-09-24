import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export interface ServiceCardData {
  id: string;
  title: string;
  href: string;
  image: string;
  bullets: string[];
  /** Optional centered bold subtitle + paragraph, shown instead of the bullets. */
  subtitle?: string;
  description?: string;
  /** Tailwind classes for the card body color and its text color. */
  bgClass: string;
  textClass: string;
  /** Tailwind bg + text classes for the slanted title ribbon. */
  ribbonClass: string;
  /** Exact Figma ribbon vector, used as a mask and tinted by ribbonClass. */
  ribbonShape?: string;
  /** Exact Figma card outline; masks the card background instead of the CSS chamfer. */
  cardShape?: string;
  /** Ribbon left inset from the card edge, as % of card width (left-aligned ribbons). */
  ribbonInset?: number;
  /** Card outline used below md when the card takes the service-card layout on phones. */
  mobileCardShape?: string;
}

export interface ServiceCardProps {
  card: ServiceCardData;
  imageAspect?: string;
  ribbonAlign?: "left" | "right";
  /** Photo aspect below md; defaults to imageAspect. */
  mobileImageAspect?: string;
  /**
   * Figma card proportions as a MINIMUM height, in cqw of the card width (the
   * parent <li> is an @container). The card grows if its text needs more room.
   */
  minHeight?: string;
  /** minHeight below md; defaults to minHeight. */
  mobileMinHeight?: string;
  sizes?: string;
}

/**
 * Colored card with an inset photo and a slanted title ribbon, built from the
 * exact Figma vectors at every breakpoint: card outline and ribbon applied as
 * CSS masks (tinted by bgClass / ribbonClass), chamfered photo, centered
 * ribbon title. On phones the cards simply stack one per row; the section
 * gives the card its Figma aspect ratio as a minimum height (container query
 * units), so the outline isn't distorted and longer text grows the card
 * instead of spilling out of it. Right-ribbon cards (Branding / Management) take the
 * service-card layout below md (left ribbon, service outline, taller photo)
 * so every card on a phone looks the same.
 *
 * The card shape lives on a background layer only, so the ribbon can overhang
 * the card edge and focus rings stay visible.
 */
export function ServiceCard({
  card,
  imageAspect = "455 / 376",
  ribbonAlign = "left",
  mobileImageAspect,
  minHeight = "155.5cqw",
  mobileMinHeight,
  sizes = "(min-width: 768px) 33vw, 100vw",
}: ServiceCardProps) {
  const cardMask = card.cardShape ? `url(${card.cardShape})` : undefined;
  const mobileCardMask = card.mobileCardShape ? `url(${card.mobileCardShape})` : cardMask;
  const ribbonMask = card.ribbonShape ? `url(${card.ribbonShape})` : undefined;

  return (
    <Link
      href={card.href}
      style={{ "--card-min": minHeight, "--card-min-sm": mobileMinHeight ?? minHeight } as CSSProperties}
      className={`group relative isolate flex h-full min-h-[var(--card-min-sm)] flex-col pb-8 outline-offset-4 md:min-h-[var(--card-min)] transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${card.textClass}`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 ${card.bgClass} ${
          cardMask
            ? "[-webkit-mask-image:var(--card-mask-sm)] [mask-image:var(--card-mask-sm)] [mask-repeat:no-repeat] [mask-size:100%_100%] md:[-webkit-mask-image:var(--card-mask)] md:[mask-image:var(--card-mask)]"
            : "shape-chamfered"
        }`}
        style={{ "--card-mask": cardMask, "--card-mask-sm": mobileCardMask, "--chamfer": "14px" } as CSSProperties}
      />

      <div
        className="shape-chamfered relative m-2.5 aspect-[var(--img-aspect-sm)] shrink-0 overflow-hidden md:aspect-[var(--img-aspect)]"
        style={{ "--img-aspect": imageAspect, "--img-aspect-sm": mobileImageAspect ?? imageAspect, "--chamfer": "12px" } as CSSProperties}
      >
        <Image src={card.image} alt="" fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>

      {/* Ribbon outline is the exact Figma vector, used as a mask so each card
          can tint it with its own ribbon color. */}
      <h3
        style={{ "--ribbon-mask": ribbonMask, "--ribbon-x": `${card.ribbonInset ?? 2.094}%` } as CSSProperties}
        className={`relative z-10 -mt-9 flex items-center justify-center px-6 text-center font-accent text-[clamp(1.4rem,2.7vw,2.6rem)] font-bold uppercase leading-none [-webkit-mask-image:var(--ribbon-mask)] [mask-image:var(--ribbon-mask)] [mask-repeat:no-repeat] [mask-size:100%_100%] lg:text-[min(2.513vw,40px)] lg:leading-[1.2] ${card.ribbonClass} ${
          ribbonAlign === "left"
            ? "ml-[var(--ribbon-x)] aspect-[412/66] w-[107.85%] max-w-none"
            : "ml-[var(--ribbon-x)] aspect-[412/66] w-[107.85%] max-w-none md:-mr-[6.4%] md:ml-0 md:aspect-[431/69] md:w-[68.63%] md:max-w-full md:self-end"
        }`}
      >
        {card.title}
      </h3>

      {card.subtitle || card.description ? (
        // Figma: bold centered subtitle in a 255px box (78.1% of the text area), then a
        // left-aligned paragraph 317.43px wide (97.19% of the text area; 147px gap to
        // the next card's paragraph); both Montserrat 22/24.
        <div className="mt-4 pl-[6.5%] pr-[8%] font-display sm:mt-[min(1.76vw,28px)]">
          {card.subtitle ? (
            <p className="mx-auto w-[78.1%] translate-x-[1.14%] text-balance text-center text-[0.95rem] font-bold leading-snug sm:text-[clamp(0.95rem,1.2vw,1.15rem)] lg:text-[min(1.382vw,22px)] lg:leading-[1.0909]">
              {card.subtitle}
            </p>
          ) : null}
          {card.description ? (
            <p className="mt-2 w-[97.19%] text-[0.9rem] font-normal leading-[1.3] sm:mt-[min(1.57vw,25px)] sm:text-[clamp(0.95rem,1.2vw,1.15rem)] sm:leading-snug lg:text-[min(1.382vw,22px)] lg:leading-[1.0909]">
              {card.description}
            </p>
          ) : null}
        </div>
      ) : (
        // Figma subtitle: Montserrat 22/24, regular.
        <ul className="mt-5 list-none space-y-0.5 px-[12%] font-display text-[clamp(0.95rem,1.2vw,1.15rem)] font-normal leading-snug lg:text-[min(1.382vw,22px)] lg:leading-[1.0909]">
          {card.bullets.map((bullet) => (
            <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:content-['•']">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
