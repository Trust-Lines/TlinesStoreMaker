"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { SpecialtyCardData } from "./SpecialtyCard";

const assetRoot = "/images/figma/specialty/showcase";
const brandingSlides = [
  `${assetRoot}/branding-deck-3.svg`,
  `${assetRoot}/branding-deck-1.svg`,
  `${assetRoot}/branding-deck-2.svg`,
];
const managementSlides = [
  `${assetRoot}/management-deck-3.svg`,
  `${assetRoot}/management-deck-1.svg`,
  `${assetRoot}/management-deck-2.svg`,
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
 * The Figma arrow tile (68 x 73) turned 90° clockwise, so → reads ▼.
 * The rotated art is 73 wide x 68 tall; the inner box swaps the button's sides.
 */
function RailArrow({ src }: { src: string }) {
  return (
    <span className="absolute left-1/2 top-1/2 h-[107.35%] w-[93.15%] -translate-x-1/2 -translate-y-1/2 rotate-90">
      <Image src={src} alt="" fill unoptimized />
    </span>
  );
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
  frame: string;
  /** ▼ art (the Figma → tile, rotated), button width (% of the stack) and label. */
  next: { src: string; className: string; label: string };
}

/**
 * Click-driven vertical depth stack (no scroll). Every card is absolute inside one
 * `perspective: 1000px` viewport clipped to the cream frame, so the peeking cards and
 * the ▼ exit stay inside it. A single ▼ button sits centred inside the front photo,
 * just above its bottom edge, and cycles the deck forward.
 * Owns its own state so stepping one deck never re-renders (and replays) the other.
 */
function PhotoDeck({ slides, className, slideClassName, scales, renderSlide, frame, next }: PhotoDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(0);
  const reduceMotion = useReducedMotion() ?? false;
  const count = slides.length;
  const showNext = () => {
    setDirection(1);
    setCurrentIndex((current) => (current + 1) % count);
  };

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
      <Image src={frame} alt="" fill unoptimized className="pointer-events-none z-10" />
      {/* Front photo ends 1% above the stack bottom; the button sits ~12px above that. */}
      <button
        type="button"
        onClick={showNext}
        aria-label={`Next ${next.label}`}
        className={`absolute bottom-[3%] left-1/2 z-20 block aspect-[73/68] -translate-x-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream ${next.className}`}
      >
        <RailArrow src={next.src} />
      </button>
    </div>
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
      <div className="mx-auto flex max-w-[1391px] snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:w-[calc(var(--u)*1390.5)] lg:grid-cols-[calc(var(--u)*485)_calc(var(--u)*885.5)] lg:gap-[calc(var(--u)*20)] lg:overflow-visible lg:pb-0">
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
            frame={`${assetRoot}/branding-frame.svg`}
            next={{ src: `${assetRoot}/branding-arrow-next.svg`, className: "w-[14.3%]", label: "branding project" }}
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
            frame={`${assetRoot}/management-frame.svg`}
            next={{ src: `${assetRoot}/arrow-next.svg`, className: "w-[7.56%]", label: "project management image" }}
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
