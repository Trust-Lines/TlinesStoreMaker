import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { RotatingHeroHeading, type HeroPhrase } from "./RotatingHeroHeading";

export interface HomeHeroProps {
  heading: string;
  /** Headline phrases timed to the scenes of `backgroundVideo`; replaces the static `heading` when set. */
  phrases?: HeroPhrase[];
  backgroundImage: string;
  /** Autoplaying, looping background video; when set, it replaces `backgroundImage` (which still renders as the poster frame until the video is ready). */
  backgroundVideo?: string;
  imageAlt: string;
  action: { label: string; href: string };
  /**
   * Client logo strip exported from Figma, plus the client names for screen readers.
   * `logos` (individual exports at Figma size) replaces the single strip image.
   */
  clients: { src: string; width: number; height: number; names: string[]; logos?: { src: string; width: number; height: number }[] };
  /** Tailwind bg class for the client-strip bar. Defaults to sage-dark. */
  stripBgClass?: string;
  /** Service-page hero (Figma node 353:8060): a ribbon badge with the store name, in place of `heading`; also recolours the button below it. */
  badge?: {
    label: string;
    /** Defaults to the coral ribbon (c-store). */
    ribbonSrc?: string;
    /** Defaults to the coral button (c-store). */
    buttonSrc?: string;
    /** Tailwind text class for the badge label. Defaults to gold (c-store). */
    textClass?: string;
  };
}

/**
 * Full-bleed hero under the absolutely-positioned ReferenceTopBar. Phones and tablets: one
 * screen tall (small-viewport height, so it fits an iPhone with Safari's toolbar showing).
 * From lg up it is the Figma frame (1592 x 923 hero over an 80px logo strip); when that is
 * taller than the window the whole page is zoomed out (see layout.tsx), so the strip is
 * always in view on the first screen. The copy hangs from the bottom of the photo.
 */
export function HomeHero({
  heading,
  phrases,
  backgroundImage,
  backgroundVideo,
  imageAlt,
  action,
  clients,
  stripBgClass = "bg-sage-dark",
  badge,
}: HomeHeroProps) {
  return (
    <section id="home" aria-labelledby="home-hero-heading" className="relative isolate flex h-[100svh] min-h-[560px] flex-col bg-forest lg:h-auto lg:min-h-0">
      <div className="relative min-h-0 w-full flex-1 lg:aspect-[1592/923] lg:flex-none">
        {backgroundVideo ? (
          <video
            id="home-hero-video"
            autoPlay
            loop
            muted
            playsInline
            poster={backgroundImage}
            aria-label={imageAlt}
            className="absolute inset-0 size-full object-cover object-[62%_center] sm:object-center"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={backgroundImage}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-center"
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(31,47,38,.85)_0%,rgba(31,47,38,.35)_45%,rgba(31,47,38,.15)_100%)] sm:bg-[linear-gradient(100deg,rgba(31,47,38,.7)_0%,rgba(31,47,38,.35)_35%,rgba(31,47,38,0)_60%)]"
        />

        {/* lg+: Figma heading box at x=121.13, y=560.8 (60.76% of the 923px hero),
            463.6 wide; the button follows below, left-aligned with it. */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:bottom-[9%] sm:px-[9.5%] sm:pb-0 lg:bottom-[16%] lg:pl-[7.61%] lg:pr-0">
          {badge ? (
            <h1
              id="home-hero-heading"
              // Below lg the badge is --bw wide (240px on phones, growing to 360px on tablets) and
              // its padding / type are fractions of --bw — plain % padding would resolve against the
              // hero column and push the word onto the ribbon's tip. Longer labels ("Truck Stops")
              // get proportionally smaller type so they always fit between the ends.
              className={`relative isolate flex aspect-[938.227/162.975] w-[var(--bw)] items-center justify-start pb-[calc(var(--bw)*0.02)] pl-[calc(var(--bw)*0.13)] pr-[calc(var(--bw)*0.1)] font-accent text-[length:calc(var(--bw)*var(--badge-k))] font-bold uppercase leading-none tracking-[0.04em] whitespace-nowrap [--bw:clamp(240px,42vw,360px)] lg:aspect-auto lg:h-[calc(var(--u)*163)] lg:w-max lg:min-w-[calc(var(--u)*488)] lg:-ml-[calc(var(--u)*121)] lg:overflow-hidden lg:pb-[calc(var(--u)*3)] lg:pl-[calc(var(--u)*106)] lg:pr-[calc(var(--u)*90)] lg:text-[calc(var(--u)*48)] ${badge.textClass ?? "text-gold"}`}
              style={{ "--badge-k": Math.min(0.11, 0.77 / (badge.label.length * 0.9)).toFixed(4) } as CSSProperties}
            >
              {/* lg+: the badge runs from the page's left edge to 90px past the word (never shorter than
                  the Figma 488px), so long labels like "Truck Stops" stay on the ribbon. The ribbon art
                  keeps its Figma size (940 x 163, flipped) pinned to the right, so its angled tip is
                  never stretched; the extra length on the left is cropped by the h1. Below lg the art
                  simply fills the badge. */}
              <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full lg:w-[calc(var(--u)*940)]">
                <Image src={badge.ribbonSrc ?? "/images/figma/hero-badge-ribbon.svg"} alt="" fill unoptimized className="lg:-scale-x-100" />
              </span>
              {badge.label}
            </h1>
          ) : (
            <h1
              id="home-hero-heading"
              className="max-w-[10.5ch] font-display text-[clamp(2.5rem,5.4vw,5.25rem)] font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-cream lg:w-[calc(var(--u)*463.6)] lg:max-w-none lg:text-[calc(var(--u)*60)] lg:leading-[0.9667] lg:tracking-normal"
            >
              {phrases && backgroundVideo ? <RotatingHeroHeading phrases={phrases} videoId="home-hero-video" /> : heading}
            </h1>
          )}
          <Link
            href={action.href}
            className="relative isolate mt-6 inline-flex aspect-[338/67] w-[var(--bw)] items-start justify-center pl-[calc(var(--bw)*57/338)] pr-[calc(var(--bw)*59/338)] pt-[calc(var(--bw)*17/338)] text-center whitespace-nowrap font-display text-[calc(var(--bw)*24/338)] [--bw:clamp(220px,21.23vw,338px)] lg:[--bw:calc(var(--u)*338)] font-bold leading-none text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:mt-8"
          >
            {/* Exact Figma button shape (338 x 67). Text: Montserrat 24/24 bold; box inset
                17 top / 26 bottom / 57 left / 59 right — padding and font derived
                from the button width (--bw), so the proportions hold at every size. */}
            <Image src={badge?.buttonSrc ?? "/images/figma/ribbon-service.svg"} alt="" fill unoptimized className="pointer-events-none -z-10" />
            {action.label}
          </Link>
        </div>
      </div>

      {/* Client logos: the Figma strip (Frame 427319137, 4097 x 102 of cream
          logos) on the #547255 bar (Rectangle 4412, 80px tall). Logos are 142px
          apart with no end margins, so each copy gets one 142px gap after it to
          keep the loop seamless. Sized via --strip-h so it scales per breakpoint. */}
      <p className="sr-only">Clients: {clients.names.join(", ")}</p>
      <div aria-hidden className={`brand-marquee overflow-hidden ${stripBgClass}`}>
        <div className="brand-marquee-track flex h-[var(--strip-h)] w-max items-center [--strip-h:44px] sm:[--strip-h:56px] lg:[--strip-h:calc(var(--u)*80)]" style={{ animationDuration: "90s" }}>
          {[0, 1].map((copy) =>
            clients.logos ? (
              // Figma row: 1571 tall (200 padding around the 1171-tall logo), logos
              // 1341 apart; every size is that fraction of --strip-h. Each copy ends
              // with the same gap so the loop stays seamless.
              <div key={copy} className="flex h-full shrink-0 items-center gap-[calc(var(--strip-h)*1341/1571)] pr-[calc(var(--strip-h)*1341/1571)]">
                {clients.logos.map((logo) => (
                  <Image
                    key={logo.src}
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    unoptimized
                    className="w-auto max-w-none shrink-0"
                    style={{ height: `calc(var(--strip-h) * ${logo.height} / 1571)` }}
                  />
                ))}
              </div>
            ) : (
              <Image
                key={copy}
                src={clients.src}
                alt=""
                width={clients.width}
                height={clients.height}
                unoptimized
                className="h-[var(--strip-h)] w-auto max-w-none shrink-0 mr-[calc(var(--strip-h)*35/102)]"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
