import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export interface ServiceCardData {
  id: string;
  title: string;
  href: string;
  image: string;
  bullets: string[];
  /** Optional heading, shown above the description / bullets. */
  subtitle?: string;
  /** Heading weight (Figma: Branding regular, Management bold). */
  subtitleBold?: boolean;
  /** Wide layout (md+): text box right inset in px of the 628 card (Figma 560 box = 26, 558 box = 28). */
  textRightInset?: number;
  /** Paragraph shown instead of the bullets. */
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
  /** Card outline used below md (phones), when a wide card takes the service layout. */
  mobileCardShape?: string;
  /** Ribbon left inset from the card edge, as % of card width. */
  ribbonInset?: number;
}

export interface ServiceCardProps {
  card: ServiceCardData;
  imageAspect?: string;
  /** Photo aspect below md; defaults to imageAspect. */
  mobileImageAspect?: string;
  /**
   * Figma card proportions as a MINIMUM height, in cqw of the card width (the
   * parent <li> is an @container). The card grows if its text needs more room.
   */
  minHeight?: string;
  /** minHeight below md; defaults to minHeight. */
  mobileMinHeight?: string;
  /** Photo insets from the card edge (CSS lengths; cqw / % = of card width). */
  photoInset?: { top?: string; left?: string; right?: string };
  /**
   * "left": service-card layout at every size.
   * "right": Branding / Management — service layout below md, the wide Figma
   * layout (right-hand ribbon, bullets) from md up.
   */
  ribbonAlign?: "left" | "right";
  sizes?: string;
}

/**
 * Colored card built from the exact Figma vectors (card outline + ribbon as
 * CSS masks tinted by bgClass / ribbonClass).
 *
 * Service layout — Figma card 381.593 x 643.424: photo 360.65 x 346.83 inset
 * 10.25 / 8.74 / 12.61; ribbon 412.726 x 71.823 (Orbitron 32/48); description
 * box 320 wide at x=31, y=424 (Montserrat 22/26). All sizes are in cqw (% of the
 * card width) so the whole card scales as one at every breakpoint. The card's
 * Figma proportions are a minimum height; longer text grows the card instead
 * of spilling out.
 *
 * The card shape lives on a background layer only, so the ribbon can overhang
 * the card edge and focus rings stay visible.
 */
export function ServiceCard({
  card,
  imageAspect = "360.65 / 346.83",
  mobileImageAspect,
  minHeight = "168.61cqw",
  mobileMinHeight,
  photoInset,
  ribbonAlign = "left",
  sizes = "(min-width: 768px) 33vw, 100vw",
}: ServiceCardProps) {
  const wide = ribbonAlign === "right";
  const cardMask = card.cardShape ? `url(${card.cardShape})` : undefined;
  const mobileCardMask = card.mobileCardShape ? `url(${card.mobileCardShape})` : cardMask;
  const ribbonMask = card.ribbonShape ? `url(${card.ribbonShape})` : undefined;

  return (
    <Link
      href={card.href}
      style={{ "--card-min": minHeight, "--card-min-sm": mobileMinHeight ?? minHeight } as CSSProperties}
      className={`group relative isolate flex h-full min-h-[var(--card-min-sm)] flex-col pb-[6.3cqw] outline-offset-4 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral md:min-h-[var(--card-min)] ${
        wide ? "md:pb-8" : ""
      } ${card.textClass}`}
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
        className="shape-chamfered relative mb-[2.62cqw] ml-[var(--ph-l)] mr-[var(--ph-r)] mt-[var(--ph-t)] aspect-[var(--img-aspect-sm)] shrink-0 overflow-hidden md:aspect-[var(--img-aspect)]"
        style={
          {
            "--img-aspect": imageAspect,
            "--img-aspect-sm": mobileImageAspect ?? imageAspect,
            "--ph-t": photoInset?.top ?? "2.686cqw",
            "--ph-l": photoInset?.left ?? "2.29cqw",
            "--ph-r": photoInset?.right ?? "3.305cqw",
            "--chamfer": "12px",
          } as CSSProperties
        }
      >
        <Image src={card.image} alt="" fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>

      {/* Ribbon: exact Figma vector as a mask, tinted per card. Service layout:
          412.726 x 71.823 (108.16% of the card), Orbitron 32/48 (8.386cqw). */}
      <h3
        style={{ "--ribbon-mask": ribbonMask, "--ribbon-x": `${card.ribbonInset ?? 2.094}%` } as CSSProperties}
        className={`relative z-10 -mt-[9.43cqw] ml-[var(--ribbon-x)] flex aspect-[412.726/71.823] w-[108.16%] max-w-none items-center justify-center px-6 text-center font-accent text-[8.386cqw] font-bold uppercase leading-[1.5] [-webkit-mask-image:var(--ribbon-mask)] [mask-image:var(--ribbon-mask)] [mask-repeat:no-repeat] [mask-size:100%_100%] ${card.ribbonClass} ${
          wide
            ? "md:-mr-[6.4%] md:ml-0 md:aspect-[431/69] md:w-[68.63%] md:max-w-full md:self-end md:text-[6.051cqw] md:leading-[7.643cqw]"
            : ""
        }`}
      >
        {card.title}
      </h3>

      {/* Text area. Service layout (Figma 381.593 wide card): box 320 wide (83.86cqw)
          starting 31px in (8.124cqw), top 424px down (5.53cqw below the ribbon);
          Montserrat 22/26. Wide layout from md (Branding / Management, 628 wide card):
          560 x 121 text box 42px in and ~30px below the ribbon (heading, then bullet with
          dot at 53px / text at 74px), Montserrat 22/24 regular; ribbon title Orbitron 38/48 — all in cqw so it scales with the card. */}
      <div
        style={{ "--text-pr": `${((card.textRightInset ?? 26) / 628) * 100}cqw` } as CSSProperties}
        className={`mt-[5.53cqw] pl-[8.124cqw] font-display text-[5.765cqw] font-normal leading-[6.814cqw] ${
          wide ? "md:mt-[4.78cqw] md:pl-[6.69cqw] md:pr-[var(--text-pr)] md:text-[3.503cqw] md:leading-[3.822cqw]" : ""
        }`}
      >
        {card.subtitle ? <p className={`w-[83.86cqw] md:w-auto ${card.subtitleBold ? "font-bold" : ""}`}>{card.subtitle}</p> : null}
        {card.description ? (
          <p className={`w-[83.86cqw] ${card.subtitle ? "mt-[4cqw]" : ""}`}>{card.description}</p>
        ) : card.bullets.length ? (
          <ul className={`list-none space-y-0.5 pr-[8cqw] ${card.subtitle ? "mt-[3cqw] md:mt-[3.98cqw]" : ""} ${wide ? "md:pl-[1.75cqw] md:pr-0" : ""}`}>
            {card.bullets.map((bullet) => (
              <li
                key={bullet}
                className={`relative pl-[4.5cqw] before:absolute before:left-0 before:content-['•'] ${wide ? "md:pl-[3.34cqw]" : ""}`}
              >
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}
