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
  /** ▼ art (the Figma → tile, rotated), button width (% of the stack) and label. */
  next: { src: string; className: string; label: string };
}

/**
 * Click-driven vertical depth stack (no scroll). Every card is absolute inside one
 * `perspective: 1000px` viewport clipped to the stack, so the peeking cards and
 * the ▼ exit stay inside it. A single ▼ button sits centred inside the front photo,
 * just above its bottom edge, and cycles the deck forward.
 * Owns its own state so stepping one deck never re-renders (and replays) the other.
 */
function PhotoDeck({ slides, className, slideClassName, scales, renderSlide, next }: PhotoDeckProps) {
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
 * Branding card 485 x 833 at x=101, Project Management card 883.5 x 833 at x=607 (21px gap,
 * 101.5px right margin); 105px below the NACS banner, 144px above Projects. In both, the photo stack starts 194px below the
 * card top and ends 28px above its bottom; the Branding stack is inset 20px left /
 * 18px right (447 wide), the Project Management stack is 847 wide, centred.
 */
export function SpecialtyShowcase({ cards }: { cards: SpecialtyCardData[] }) {
  const branding = cards.find((card) => card.id === "branding") ?? cards[0];
  const management = cards.find((card) => card.id === "management") ?? cards[1];

  return (
    <section aria-label="Branding and project management services" className="bg-cream px-5 py-12 sm:px-10 lg:px-0 lg:pb-[calc(var(--u)*144)] lg:pt-[calc(var(--u)*105)]">
      <div className="mx-auto flex max-w-[1391px] flex-col items-center gap-6 lg:grid lg:w-[calc(var(--u)*1389.5)] lg:grid-cols-[calc(var(--u)*485)_calc(var(--u)*883.5)] lg:items-start lg:gap-[calc(var(--u)*21)]">
        <article id={branding.id} className="relative z-10 flex w-full max-w-[560px] flex-col items-center rounded-[10px] bg-forest pb-[5.8%] text-cream lg:block lg:aspect-[485/833] lg:w-[calc(var(--u)*485)] lg:max-w-none lg:pb-0">
          <Image src={`${assetRoot}/branding-ribbon.svg`} alt="" width={362} height={77} unoptimized className="absolute left-1/2 top-0 h-auto w-[74.64%] -translate-x-1/2" />
          <h2 className="relative z-10 flex aspect-[362/77] w-[74.64%] items-center justify-center text-center font-accent text-[clamp(18px,5.5vw,36px)] font-bold lg:absolute lg:left-1/2 lg:top-[1.45%] lg:aspect-auto lg:h-[6.67%] lg:w-[66.39%] lg:-translate-x-1/2 uppercase leading-[1.333] lg:text-[calc(var(--u)*36)]">
            <Link href={branding.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">{branding.title}</Link>
          </h2>
          <p className="relative z-10 mt-4 w-[83.51%] text-center font-display text-[clamp(14px,3.6vw,22px)] lg:absolute lg:left-1/2 lg:top-[12.1%] lg:mt-0 lg:-translate-x-1/2 font-medium leading-[1.318] lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*29)]">
            {branding.description}
          </p>

          {/* Photo stack: 194 from the top, 28 from the bottom, 20 left, 18 right (447 x 611). */}
          <PhotoDeck
            slides={brandingSlides}
            className="relative mt-5 aspect-[447/611] w-[92.16%] lg:absolute lg:bottom-[3.36%] lg:left-[4.12%] lg:mt-0 lg:aspect-auto lg:h-[73.35%]"
            slideClassName="absolute bottom-[1%] left-[1.4%] right-[1.4%] top-[16%] overflow-hidden rounded-[10px] border-2 border-cream"
            scales={[1, 0.94, 0.87]}
            next={{ src: `${assetRoot}/branding-arrow-next.svg`, className: "w-[14.3%]", label: "branding project" }}
            renderSlide={(src, depth) => (
              <>
                <Image src={src} alt="" fill unoptimized className="object-cover" />
                <SlideTint root="branding" depth={depth} />
              </>
            )}
          />
        </article>

        <article id={management.id} className="relative isolate flex w-full max-w-[560px] flex-col items-center rounded-[10px] bg-[#547255] pb-[5.8%] text-cream lg:block lg:aspect-[883.5/833] lg:w-[calc(var(--u)*883.5)] lg:max-w-none lg:rounded-none lg:bg-transparent lg:pb-0">
          <Image src={`${assetRoot}/management-card.svg`} alt="" fill unoptimized className="-z-10 hidden lg:block" />
          <Image src={`${assetRoot}/management-ribbon.svg`} alt="" width={602} height={77} unoptimized className="absolute left-1/2 top-0 h-auto w-[68.14%] -translate-x-1/2" />
          <h2 className="relative z-10 flex aspect-[602/77] w-[68.14%] items-center justify-center whitespace-nowrap px-2 text-center font-accent text-[clamp(12px,3.6vw,36px)] font-bold lg:absolute lg:left-1/2 lg:top-[1.45%] lg:aspect-auto lg:h-[6.72%] lg:w-[79.68%] lg:-translate-x-1/2 lg:px-0 uppercase leading-[1.333] lg:text-[calc(var(--u)*36)]">
            <Link href={management.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">{management.title}</Link>
          </h2>
          <p className="relative z-10 mt-4 w-[83.51%] text-center font-display text-[clamp(14px,3.6vw,22px)] lg:absolute lg:left-1/2 lg:top-[12.1%] lg:mt-0 lg:w-[79.68%] lg:-translate-x-1/2 font-medium leading-[1.318] lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*29)]">
            {management.description}
          </p>
          <PhotoDeck
            slides={managementSlides}
            className="relative mt-5 aspect-[847/611] w-[92.16%] lg:absolute lg:bottom-[3.36%] lg:left-1/2 lg:mt-0 lg:w-[95.87%] lg:-translate-x-1/2"
            slideClassName="absolute bottom-[1%] left-[0.6%] right-[0.6%] top-[16%] overflow-hidden rounded-[10px] border-2 border-cream"
            scales={[1, 0.97, 0.91]}
            next={{ src: `${assetRoot}/arrow-next.svg`, className: "w-[14.3%] lg:w-[7.56%]", label: "project management image" }}
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
