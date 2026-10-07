"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import type { SpecialtyCardData } from "./SpecialtyCard";

const assetRoot = "/images/figma/specialty/showcase";
/** How long each photo stays in front before the next one comes forward. */
const SLIDE_INTERVAL_MS = 3000;
const mobileRoot = "/images/figma/specialty/mobile";
const desktopRoot = "/images/figma/specialty/desktop";
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
  `${desktopRoot}/management-photo-2.webp`,
  `${desktopRoot}/management-photo-3.webp`,
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
function SlideTint({ prefix, depth }: { prefix: string; depth: number }) {
  return (
    <>
      {[1, 2].map((level) => (
        <Image
          key={level}
          src={`${prefix}-${level}.svg`}
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
  tintPrefix,
  textClass,
  pointsClass,
}: {
  card: SpecialtyCardData;
  side: "left" | "right";
  slides: string[];
  cardSrc: string;
  ribbonSrc: string;
  tintPrefix: string;
  textClass: string;
  pointsClass: string;
}) {
  const left = side === "left";
  const heading = card.title.replace(/^project\s+/i, "");

  return (
    <article id={`${card.id}-mobile`} className={`relative aspect-[874/663] w-full ${textClass} [container-type:inline-size]`}>
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
        className={`absolute top-[36%] w-[calc(24.83%+4.1cqw)] list-disc pl-[4.1cqw] font-display text-[max(11px,2.746cqw)] font-medium leading-[1.2083] marker:text-current ${pointsClass} ${left ? "left-[5.4%]" : "left-[60.8%]"}`}
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
            <SlideTint prefix={tintPrefix} depth={depth} />
          </>
        )}
      />
    </article>
  );
}

/** Design px -> % of the card's own width / height (cards are 692 px tall). */
const cardPct = (value: number, of: number) => `${(value / of) * 100}%`;
const CARD_H = 692;

/**
 * The card's bullet points as a slideshow: one point at a time, plain text in the card's
 * title colour (no band or pill behind it), centred where the old full-width strip sat
 * (148px down, 43px tall, 24px Montserrat Medium). It fades to the next point every 3 s, so no point is
 * ever cut off at the card edge. Screen readers get the whole list; visitors who prefer
 * reduced motion see the points swap without the fade.
 */
function PointsSlideshow({ points, cardWidth, size = 24, className }: { points: string[]; cardWidth: number; size?: number; className: string }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const items = points.map((point) => point.replace(/\*\*/g, ""));
  const count = items.length;
  // At 24px a character averages ~13.8 design px (scaled for other sizes); the bullet adds
  // ~20px and the text keeps 20px clear of each card edge. A point longer than that budget
  // is set smaller so it still fits on one line (e.g. "Communication and progress updates"
  // on the 485 card).
  const charBudget = (cardWidth - 40 - 20) / ((13.8 * size) / 24);
  const fontPx = (text: string) => size * Math.min(1, charBudget / text.length);

  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div
      className={`absolute inset-x-0 flex items-center justify-center font-display font-medium ${className}`}
      style={{ top: cardPct(148, CARD_H), height: cardPct(43, CARD_H), fontSize: `calc(var(--u) * ${size})` }}
    >
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          aria-hidden
          className="flex h-full items-center whitespace-nowrap leading-[1.21] before:mr-[calc(var(--u)*14)] before:size-[calc(var(--u)*6)] before:shrink-0 before:rounded-full before:bg-current before:content-['']"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ fontSize: `calc(var(--u) * ${fontPx(items[index]).toFixed(2)})` }}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * Photos that take turns in the same frame, crossfading every 3 s. A single photo just
 * sits there; visitors who prefer reduced motion get the first one still. Every photo is
 * rendered up front so the fade never waits for a download.
 */
function PhotoCrossfade({ photos, sizes }: { photos: { src: string; alt: string; href?: string }[]; sizes: string }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const count = photos.length;

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, count]);

  return (
    <>
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={i === index ? photo.alt : ""}
          aria-hidden={i !== index}
          fill
          sizes={sizes}
          priority={i === 0}
          className={`object-fill transition-opacity duration-700 motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* A photo with an href (brand book PDF) is a link to it, opened in a new tab; only the photo in front is clickable. */}
      {photos[index].href && (
        <a
          href={photos[index].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the brand book (PDF): ${photos[index].alt}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        />
      )}
    </>
  );
}

interface DesktopCardProps {
  card: SpecialtyCardData;
  /** Design width of the card in px (height is always 692). */
  width: number;
  cardSrc: string;
  ribbon: { src: string; x: number; w: number };
  /** "PROJECT / HEADING" text box, design px. */
  textBox: { x: number; w: number };
  /** Text colour of the "PROJECT / HEADING" title. */
  textClass: string;
  /** Text colour of the points under the ribbon (they sit on the card colour). */
  pointsClass: string;
  /** Points font size in design px (24 by default). */
  pointsSize?: number;
  /** One or more photos (design px box); several rotate every 3 s. */
  photo: { photos: { src: string; alt: string; href?: string }[]; x: number; w: number };
}

/**
 * Desktop Branding / Project Management card (Figma frame 685:11257, 692px tall): coral
 * ribbon with "PROJECT" over the name, the points pill (one point at a time) 148px down, and a
 * 453px-tall photo frame from 214px down (several photos take turns in it). Everything is placed in % of the card, which is itself
 * sized in --u, so the card scales as one piece.
 */
function DesktopSpecialtyCard({ card, width, cardSrc, ribbon, textBox, textClass, pointsClass, pointsSize, photo }: DesktopCardProps) {
  const heading = card.title.replace(/^project\s+/i, "");
  return (
    <article
      id={card.id}
      className={`relative shrink-0 ${textClass}`}
      style={{ width: `calc(var(--u) * ${width})`, aspectRatio: `${width} / ${CARD_H}` }}
    >
      <Image src={cardSrc} alt="" fill unoptimized className="pointer-events-none" />

      <span aria-hidden className="absolute top-0" style={{ left: cardPct(ribbon.x, width), width: cardPct(ribbon.w, width), height: cardPct(116.931, CARD_H) }}>
        <Image src={ribbon.src} alt="" fill unoptimized />
      </span>
      <h2
        className="absolute z-10 flex flex-col items-center justify-center text-center font-accent uppercase"
        style={{ left: cardPct(textBox.x, width), width: cardPct(textBox.w, width), top: cardPct(15, CARD_H), height: cardPct(87, CARD_H) }}
      >
        <Link href={card.href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
          <span className="block font-normal leading-[40px]" style={{ fontSize: "calc(var(--u) * 24)", lineHeight: "calc(var(--u) * 40)" }}>Project</span>
          <span className="block font-bold" style={{ fontSize: "calc(var(--u) * 36)", lineHeight: "calc(var(--u) * 40)" }}>{heading}</span>
        </Link>
      </h2>

      <PointsSlideshow points={card.points} cardWidth={width} size={pointsSize} className={pointsClass} />

      <span className="absolute" style={{ left: cardPct(photo.x, width), width: cardPct(photo.w, width), top: cardPct(214, CARD_H), height: cardPct(453, CARD_H) }}>
        <PhotoCrossfade photos={photo.photos} sizes="(min-width: 1024px) 60vw, 100vw" />
      </span>
    </article>
  );
}

const cstoreRoot = "/images/figma/specialty/cstore";
const truckRoot = "/images/figma/specialty/truck";
const groceryRoot = "/images/figma/specialty/grocery";

/**
 * Card art and colours per page. "home": the homepage greens. "cstore" (C-store page):
 * coral Branding card with a gold ribbon (#547255 title, cream points); gold Project
 * Management card with a coral ribbon (cream title, #547255 points).
 * "truck" (Truck Stops page): sage Branding card with a coral ribbon; coral Project
 * Management card with a sage ribbon; cream text throughout.
 * "grocery" (Grocery page): olive #939878 Branding card with a sage #557256 ribbon; sage
 * Project Management card with an olive ribbon; cream text throughout.
 * Same shapes, photos and layout as the homepage.
 */
const palettes = {
  home: {
    branding: {
      desktopCard: `${desktopRoot}/branding-card.svg`,
      desktopRibbon: `${desktopRoot}/branding-ribbon.svg`,
      mobileCard: `${mobileRoot}/branding-card.svg`,
      mobileRibbon: `${mobileRoot}/branding-ribbon.svg`,
      tint: `${assetRoot}/branding-tint`,
      text: "text-cream",
      points: "text-cream",
    },
    management: {
      desktopCard: `${desktopRoot}/management-card.svg`,
      desktopRibbon: `${desktopRoot}/management-ribbon.svg`,
      mobileCard: `${mobileRoot}/management-card.svg`,
      mobileRibbon: `${mobileRoot}/management-ribbon.svg`,
      tint: `${assetRoot}/management-tint`,
      text: "text-cream",
      points: "text-cream",
    },
  },
  cstore: {
    branding: {
      desktopCard: `${cstoreRoot}/desktop-branding-card.svg`,
      desktopRibbon: `${cstoreRoot}/desktop-branding-ribbon.svg`,
      mobileCard: `${cstoreRoot}/mobile-branding-card.svg`,
      mobileRibbon: `${cstoreRoot}/mobile-branding-ribbon.svg`,
      tint: `${cstoreRoot}/branding-tint`,
      text: "text-[#547255]",
      points: "text-cream",
    },
    management: {
      desktopCard: `${cstoreRoot}/desktop-management-card.svg`,
      desktopRibbon: `${cstoreRoot}/desktop-management-ribbon.svg`,
      mobileCard: `${cstoreRoot}/mobile-management-card.svg`,
      mobileRibbon: `${cstoreRoot}/mobile-management-ribbon.svg`,
      tint: `${cstoreRoot}/management-tint`,
      text: "text-cream",
      points: "text-[#547255]",
    },
  },
  truck: {
    branding: {
      desktopCard: `${truckRoot}/desktop-branding-card.svg`,
      desktopRibbon: `${truckRoot}/desktop-branding-ribbon.svg`,
      mobileCard: `${truckRoot}/mobile-branding-card.svg`,
      mobileRibbon: `${truckRoot}/mobile-branding-ribbon.svg`,
      tint: `${truckRoot}/branding-tint`,
      text: "text-cream",
      points: "text-cream",
    },
    management: {
      desktopCard: `${truckRoot}/desktop-management-card.svg`,
      desktopRibbon: `${truckRoot}/desktop-management-ribbon.svg`,
      mobileCard: `${truckRoot}/mobile-management-card.svg`,
      mobileRibbon: `${truckRoot}/mobile-management-ribbon.svg`,
      tint: `${truckRoot}/management-tint`,
      text: "text-cream",
      points: "text-cream",
    },
  },
  grocery: {
    branding: {
      desktopCard: `${groceryRoot}/desktop-branding-card.svg`,
      desktopRibbon: `${groceryRoot}/desktop-branding-ribbon.svg`,
      mobileCard: `${groceryRoot}/mobile-branding-card.svg`,
      mobileRibbon: `${groceryRoot}/mobile-branding-ribbon.svg`,
      tint: `${groceryRoot}/branding-tint`,
      text: "text-cream",
      points: "text-cream",
    },
    management: {
      desktopCard: `${groceryRoot}/desktop-management-card.svg`,
      desktopRibbon: `${groceryRoot}/desktop-management-ribbon.svg`,
      mobileCard: `${groceryRoot}/mobile-management-card.svg`,
      mobileRibbon: `${groceryRoot}/mobile-management-ribbon.svg`,
      tint: `${groceryRoot}/management-tint`,
      text: "text-cream",
      points: "text-cream",
    },
  },
} as const;

export type ShowcasePalette = keyof typeof palettes;

/**
 * Branding / Project Management section. From lg up it is the Figma frame 685:11257:
 * Project Management (485 x 692) on the left, Branding (885.5 x 692) on the right, 20px
 * apart (1390.5 wide, centred), each with its points pill. Below lg it is the two
 * landscape phone cards (Figma nodes 657:7167 / 657:7170).
 */
export function SpecialtyShowcase({ cards, palette = "home" }: { cards: SpecialtyCardData[]; palette?: ShowcasePalette }) {
  const branding = cards.find((card) => card.id === "branding") ?? cards[0];
  const management = cards.find((card) => card.id === "management") ?? cards[1];
  const colors = palettes[palette];
  // The branding collages carry the page's own frame colour: green (home, also used on Truck Stops),
  // coral (C-store) or sage (Grocery).
  const photoSet = palette === "cstore" ? "cstore" : palette === "grocery" ? "grocery" : "home";

  return (
    <section aria-label="Branding and project management services" className="bg-cream px-5 py-12 sm:px-10 lg:px-0 lg:pb-[calc(var(--u)*80)] lg:pt-[calc(var(--u)*95)]">
      {/* Below lg: the two landscape phone cards (Figma nodes 657:7167 / 657:7170, 874 x 663). */}
      <div className="mx-auto flex max-w-[640px] flex-col gap-5 lg:hidden">
        <MobileSpecialtyCard
          card={branding}
          side="left"
          slides={brandingSlides}
          cardSrc={colors.branding.mobileCard}
          ribbonSrc={colors.branding.mobileRibbon}
          tintPrefix={colors.branding.tint}
          textClass={colors.branding.text}
          pointsClass={colors.branding.points}
        />
        <MobileSpecialtyCard
          card={management}
          side="right"
          slides={managementSlides}
          cardSrc={colors.management.mobileCard}
          ribbonSrc={colors.management.mobileRibbon}
          tintPrefix={colors.management.tint}
          textClass={colors.management.text}
          pointsClass={colors.management.points}
        />
      </div>

      <div className="mx-auto hidden items-start justify-center gap-[calc(var(--u)*20)] lg:flex">
        <DesktopSpecialtyCard
          card={management}
          width={485}
          cardSrc={colors.management.desktopCard}
          ribbon={{ src: colors.management.desktopRibbon, x: 64.5, w: 362 }}
          textBox={{ x: 86, w: 314 }}
          textClass={colors.management.text}
          pointsClass={colors.management.points}
          photo={{
            photos: [
              { src: `${desktopRoot}/management-photo.webp`, alt: "Blueprints laid over shelving in a finished store" },
              { src: `${desktopRoot}/management-photo-2.webp`, alt: "Project managers and a client walking a store build-out" },
              { src: `${desktopRoot}/management-photo-3.webp`, alt: "Team members coordinating in the warehouse" },
            ],
            x: 20,
            w: 447,
          }}
        />
        <DesktopSpecialtyCard
          card={branding}
          width={885.5}
          cardSrc={colors.branding.desktopCard}
          ribbon={{ src: colors.branding.desktopRibbon, x: 242, w: 402 }}
          textBox={{ x: 286, w: 314 }}
          textClass={colors.branding.text}
          pointsClass={colors.branding.points}
          pointsSize={28}
          photo={{
            photos: [
              { src: `${desktopRoot}/branding-${photoSet}-prince.webp`, alt: "Prince Market store interior and branding collage", href: "/pdfs/prince-market-branding.pdf" },
              { src: `${desktopRoot}/branding-${photoSet}-cafe.webp`, alt: "T Lines Café kiosk and branding collage" },
              { src: `${desktopRoot}/branding-${photoSet}-speedy.webp`, alt: "Speedy c-store interior and branding collage", href: "/pdfs/speedy-branding.pdf" },
            ],
            x: 19,
            w: 847,
          }}
        />
      </div>
    </section>
  );
}
