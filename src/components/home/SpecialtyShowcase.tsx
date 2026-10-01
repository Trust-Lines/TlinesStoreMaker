"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import type { SpecialtyCardData } from "./SpecialtyCard";

const assetRoot = "/images/figma/specialty/showcase";
/** How long each photo stays in front before the next one comes forward. */
const SLIDE_INTERVAL_MS = 3000;
const mobileRoot = "/images/figma/specialty/mobile";
const brandingSlides = [
  `${assetRoot}/branding-deck-3.svg`,
  `${assetRoot}/branding-deck-1.svg`,
  `${assetRoot}/branding-deck-2.svg`,
];
// management-deck-2.svg is a pixel-identical copy of management-deck-1.svg (the team photo), so the third slide
// is the original management interior photo instead.
const managementSlides = [
  `${assetRoot}/management-deck-3.svg`,
  `${assetRoot}/management-deck-1.svg`,
  "/images/figma/specialty/management-photo.webp",
];

/**
 * Queue poses by depth (0 = active front), measured from the mockup. The front photo
 * sits low in the frame; the cards behind peek out from the TOP (44px / 78px higher,
 * as % of the photo box), narrower (per-deck scale) and fainter (0.8 / 0.6).
 */
const peekY = ["0%", "-8.8%", "-15.5%"] as const;
const peekOpacity = [1, 0.8, 0.6] as const;
/** Spring for every card moving to its queue position. */
const stackSpring: Transition = { type: "spring", stiffness: 300, damping: 30 };
/** How far the outgoing front card drops (~60px) while it fades out on ▼. */
const exitDrop = "12%";

/** 0 before the first click, 1 once ▼ has been pressed. */
type Direction = 1 | 0;

/**
 * Target for the card at `depth` in a deck of `count`.
 * ▼ (dir 1): the old front card exits downward (+60px, opacity 0), then re-enters the
 * back of the queue while the card behind springs forward.
 * Layer order always switches instantly; position, scale and opacity spring.
 */
function deckMotion(depth: number, count: number, dir: Direction, scales: readonly number[], reduceMotion: boolean): { animate: TargetAndTransition; transition: Transition } {
  const level = Math.min(depth, peekY.length - 1);
  const rest = { y: peekY[level], scale: scales[level], opacity: peekOpacity[level], zIndex: count - depth };

  if (reduceMotion) return { animate: rest, transition: { duration: 0 } };

  if (dir === 1 && depth === count - 1) {
    return {
      animate: {
        y: ["0%", exitDrop, exitDrop, rest.y],
        scale: [1, 1, rest.scale, rest.scale],
        opacity: [1, 0, 0, rest.opacity],
        zIndex: [count + 1, count + 1, rest.zIndex, rest.zIndex],
      },
      transition: { duration: 0.75, times: [0, 0.4, 0.45, 1], ease: "easeInOut" },
    };
  }

  return { animate: rest, transition: { ...stackSpring, zIndex: { duration: 0 } } };
}

/**
 * Figma tints for the slides peeking behind the current one (depth 1 darker, depth 2
 * lighter). Kept out of the slide images so the front photo is never tinted; the
 * opacity fades with the slide transition.
 */
function SlideTint({ root, depth }: { root: "branding" | "management"; depth: number }) {
  return (
    <>
      {[1, 2].map((level) => (
        <Image
          key={level}
          src={`${assetRoot}/${root}-tint-${level}.svg`}
          alt=""
          fill
          unoptimized
          className="pointer-events-none transition-opacity duration-500 motion-reduce:transition-none"
          style={{ opacity: depth === level ? 1 : 0 }}
        />
      ))}
    </>
  );
}

interface PhotoDeckProps {
  slides: string[];
  /** Positions the stack inside its card. */
  className: string;
  /** Front photo box inside the frame (the cards behind share it, shifted up). */
  slideClassName: string;
  /** Scale of the front / behind / furthest card (narrower the further back). */
  scales: readonly number[];
  renderSlide: (src: string, depth: number) => ReactNode;
}

/**
 * Vertical depth stack that steps forward by itself every 3 s (no controls, no scroll;
 * visitors who prefer reduced motion get a still deck). Every card is absolute inside
 * one `perspective: 1000px` viewport clipped to the stack, so the peeking cards and
 * the exit stay inside it.
 * Owns its own state so stepping one deck never re-renders (and replays) the other.
 */
function PhotoDeck({ slides, className, slideClassName, scales, renderSlide }: PhotoDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(0);
  const reduceMotion = useReducedMotion() ?? false;
  const count = slides.length;

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((current) => (current + 1) % count);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, count]);

  return (
    <div className={className}>
      <div className="absolute inset-[3px] overflow-hidden rounded-[10px]" style={{ perspective: "1000px" }}>
        {slides.map((src, slideIndex) => {
          const depth = (slideIndex - currentIndex + count) % count;
          const { animate, transition } = deckMotion(depth, count, direction, scales, reduceMotion);

          return (
            <motion.div
              key={src}
              aria-hidden={depth !== 0}
              className={slideClassName}
              initial={false}
              animate={animate}
              transition={transition}
              style={{ transformOrigin: "50% 0%" }}
            >
              {renderSlide(src, depth)}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Phone version of a Branding / Project Management card: ribbon and bullet list on
 * one side, the photo stack on the other (side = where the copy sits). Everything is
 * placed in % of the 874 x 663 Figma frame and sized in container-query units, so the
 * card scales as one piece; text never drops below a readable minimum.
 */
function MobileSpecialtyCard({
  card,
  side,
  slides,
  cardSrc,
  ribbonSrc,
  root,
}: {
  card: SpecialtyCardData;
  side: "left" | "right";
  slides: string[];
  cardSrc: string;
  ribbonSrc: string;
  root: "branding" | "management";
}) {
  const left = side === "left";
  const heading = card.title.replace(/^project\s+/i, "");

  return (
    <article id={`${card.id}-mobile`} className="relative aspect-[874/663] w-full text-cream [container-type:inline-size]">
      <span aria-hidden className={`absolute ${left ? "inset-[1.36%_0.8%_1.21%_1.37%]" : "inset-[1.06%_0.81%]"}`}>
        <Image src={cardSrc} alt="" fill unoptimized />
      </span>

      <span aria-hidden className={`absolute ${left ? "inset-[4.22%_56.29%_77.54%_1.37%]" : "inset-[3.94%_0.81%_77.74%_56.62%] -scale-x-100"}`}>
        <Image src={ribbonSrc} alt="" fill unoptimized />
      </span>
      <h2
        className={`absolute top-[8.3%] font-accent uppercase ${left ? "left-[5.6%]" : "right-[3.8%] text-right"}`}
      >
        <Link href={card.href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
          <span className="block text-[max(12px,2.75cqw)] font-medium leading-[1.54]">Project</span>
          <span className="block text-[max(16px,4.12cqw)] font-bold leading-[1.03]">{heading}</span>
        </Link>
      </h2>

      <ul
        className={`absolute top-[36%] w-[33.7%] list-disc pl-[4.1cqw] font-display text-[max(11px,2.75cqw)] font-medium leading-[1.05] marker:text-cream ${left ? "left-[5.4%]" : "left-[60.8%]"}`}
      >
        {card.points.map((point) => (
          <li key={point} className="mb-[2.06cqw]">
            {point.replace(/\*\*/g, "")}
          </li>
        ))}
      </ul>

      <PhotoDeck
        slides={slides}
        className={`absolute bottom-[3.62%] top-[4.22%] ${left ? "left-[46.45%] right-[2.4%]" : "left-[2.65%] right-[45.91%]"}`}
        slideClassName="absolute bottom-[1%] left-[1.4%] right-[1.4%] top-[16%] overflow-hidden rounded-[10px] border-2 border-cream"
        scales={[1, 0.94, 0.87]}
        renderSlide={(src, depth) => (
          <>
            <Image src={src} alt="" fill unoptimized className="object-cover" />
            <SlideTint root={root} depth={depth} />
          </>
        )}
      />
    </article>
  );
}

/**
 * Asymmetrical Branding / Project Management composition (Figma frame, 1592 wide):
 * Branding card 485 x 833 at x=101, Project Management card 885.5 x 833 20px to its
 * right (100.5px right margin). In both, the photo stack starts 194px below the
 * card top and ends 28px above its bottom; the Branding stack is inset 20px left /
 * 18px right (447 wide), the Project Management stack is 847 wide, centred.
 */
export function SpecialtyShowcase({ cards }: { cards: SpecialtyCardData[] }) {
  const branding = cards.find((card) => card.id === "branding") ?? cards[0];
  const management = cards.find((card) => card.id === "management") ?? cards[1];

  return (
    <section aria-label="Branding and project management services" className="bg-cream px-5 py-12 sm:px-10 lg:px-0 lg:pb-[calc(var(--u)*80)] lg:pt-[calc(var(--u)*95)]">
      {/* Below lg: the two landscape phone cards (Figma nodes 657:7167 / 657:7170, 874 x 663). */}
      <div className="mx-auto flex max-w-[640px] flex-col gap-5 lg:hidden">
        <MobileSpecialtyCard
          card={branding}
          side="left"
          slides={brandingSlides}
          cardSrc={`${mobileRoot}/branding-card.svg`}
          ribbonSrc={`${mobileRoot}/branding-ribbon.svg`}
          root="branding"
        />
        <MobileSpecialtyCard
          card={management}
          side="right"
          slides={managementSlides}
          cardSrc={`${mobileRoot}/management-card.svg`}
          ribbonSrc={`${mobileRoot}/management-ribbon.svg`}
          root="management"
        />
      </div>

      <div className="mx-auto hidden max-w-[1391px] items-start lg:grid lg:w-[calc(var(--u)*1390.5)] lg:grid-cols-[calc(var(--u)*485)_calc(var(--u)*885.5)] lg:gap-[calc(var(--u)*20)] lg:overflow-visible lg:pb-0">
        <article id={branding.id} className="relative z-10 aspect-[485/833] w-[88vw] max-w-[485px] shrink-0 snap-center rounded-[10px] bg-forest text-cream lg:w-[calc(var(--u)*485)]">
          <Image src={`${assetRoot}/branding-ribbon.svg`} alt="" width={362} height={77} unoptimized className="absolute left-1/2 top-0 h-auto w-[74.64%] -translate-x-1/2" />
          <h2 className="absolute left-1/2 top-[1.45%] z-10 flex h-[6.67%] w-[66.39%] -translate-x-1/2 items-center justify-center text-center font-accent text-[clamp(16px,4.5vw,36px)] font-bold uppercase leading-[1.333] lg:text-[calc(var(--u)*36)]">
            <Link href={branding.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">{branding.title}</Link>
          </h2>
          <p className="absolute left-1/2 top-[12.1%] z-10 w-[83.51%] -translate-x-1/2 text-center font-display text-[clamp(13px,2.7vw,22px)] font-medium leading-[1.318] lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*29)]">
            {branding.description}
          </p>

          {/* Photo stack: 194 from the top, 28 from the bottom, 20 left, 18 right (447 x 611). */}
          <PhotoDeck
            slides={brandingSlides}
            className="absolute bottom-[3.36%] left-[4.12%] h-[73.35%] w-[92.16%]"
            slideClassName="absolute bottom-[1%] left-[1.4%] right-[1.4%] top-[16%] overflow-hidden rounded-[10px] border-2 border-cream"
            scales={[1, 0.94, 0.87]}
            renderSlide={(src, depth) => (
              <>
                <Image src={src} alt="" fill unoptimized className="object-cover" />
                <SlideTint root="branding" depth={depth} />
              </>
            )}
          />
        </article>

        <article id={management.id} className="relative isolate aspect-[886/833] w-[88vw] max-w-[886px] shrink-0 snap-center text-cream lg:w-[calc(var(--u)*886)]">
          <Image src={`${assetRoot}/management-card.svg`} alt="" fill unoptimized className="-z-10" />
          <Image src={`${assetRoot}/management-ribbon.svg`} alt="" width={602} height={77} unoptimized className="absolute left-1/2 top-0 h-auto w-[67.95%] -translate-x-1/2" />
          <h2 className="absolute left-1/2 top-[1.45%] z-10 flex h-[6.72%] w-[79.46%] -translate-x-1/2 items-center justify-center text-center font-accent text-[clamp(16px,4.1vw,36px)] font-bold uppercase leading-[1.333] lg:text-[calc(var(--u)*36)]">
            <Link href={management.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">{management.title}</Link>
          </h2>
          <p className="absolute left-1/2 top-[12.1%] z-10 w-[79.46%] -translate-x-1/2 text-center font-display text-[clamp(13px,2.5vw,22px)] font-medium leading-[1.318] lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*29)]">
            {management.description}
          </p>
          <PhotoDeck
            slides={managementSlides}
            className="absolute bottom-[3.36%] left-1/2 aspect-[847/611] w-[95.6%] -translate-x-1/2"
            slideClassName="absolute bottom-[1%] left-[0.6%] right-[0.6%] top-[16%] overflow-hidden rounded-[10px] border-2 border-cream"
            scales={[1, 0.97, 0.91]}
            renderSlide={(src, depth) => (
              <>
                <Image src={src} alt="" fill unoptimized className="object-cover" />
                <SlideTint root="management" depth={depth} />
              </>
            )}
          />
        </article>
      </div>
    </section>
  );
}
