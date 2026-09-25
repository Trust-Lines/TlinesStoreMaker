import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionLabel } from "./SectionLabel";

/* About us page sections ("About us" Figma frame, 1592 wide). Sizes use --u
   (one Figma px on the 1592 frame); below lg every section stacks. */

const mask = (src: string): CSSProperties => ({ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` });

/** Hero (1592 x 518): photo, "QUALITY / IS THE KEY" centred ~250px down (469px box). */
export function AboutHero({ image, imageAlt, headingLines }: { image: string; imageAlt: string; headingLines: string[] }) {
  const [first, middle, last] = headingLines;
  return (
    <section aria-labelledby="about-heading" className="relative isolate bg-forest">
      <div className="relative h-[min(100svh,420px)] min-h-[340px] sm:aspect-[1592/518] sm:h-auto sm:min-h-0">
        <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1592px) 1592px, 100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-forest-dark/35" />
        {/* Figma: QUALITY 70/65 bold (-2.1px), IS THE 50/65 medium (-1.5px), KEY 70 bold; centred, uppercase, #FFF4E0. */}
        <h1
          id="about-heading"
          className="absolute left-1/2 top-[56%] w-[min(90%,469px)] -translate-x-1/2 text-center font-display uppercase text-cream sm:top-[48%] lg:w-[calc(var(--u)*469)]"
        >
          <span className="block text-[clamp(2.6rem,4.4vw,70px)] font-bold leading-[0.93] tracking-[-0.03em]">{first}</span>
          <span className="block leading-[0.93]">
            <span className="text-[clamp(1.85rem,3.14vw,50px)] font-medium tracking-[-0.03em]">{middle}</span>
            <span className="ml-[0.22em] text-[clamp(2.6rem,4.4vw,70px)] font-bold tracking-[-0.03em]">{last}</span>
          </span>
        </h1>
      </div>
    </section>
  );
}

/**
 * Our Story: forest tab label 85px under the hero, then a 1310 x 730 poster
 * (140px side margins) with the forest play shape (217 x 157) centred. The play
 * button only renders once a video file is supplied.
 */
export function AboutStory({ title, poster, posterAlt, video }: { title: string; poster: string; posterAlt: string; video: string | null }) {
  return (
    <section aria-labelledby="our-story" className="bg-cream px-5 pb-16 pt-12 sm:px-10 lg:px-[8.8%] lg:pb-[calc(var(--u)*295)] lg:pt-[calc(var(--u)*85)]">
      <SectionLabel id="our-story" text={title} variant="tab" fill="bg-forest" textColor="text-cream" />
      <div
        className="shape-chamfered relative mt-8 aspect-[1310/730] w-full overflow-hidden lg:mt-[calc(var(--u)*77)]"
        style={{ "--chamfer": "max(18px, calc(var(--u) * 56))" } as CSSProperties}
      >
        {video ? (
          <video controls preload="none" poster={poster} className="h-full w-full object-cover" aria-label={title}>
            <source src={video} />
          </video>
        ) : (
          <>
            <Image src={poster} alt={posterAlt} fill sizes="(min-width: 1592px) 1310px, 90vw" className="object-cover" />
            {/* Complete Figma paused-video control: shaped badge and play icon. */}
            <span aria-hidden className="absolute left-1/2 top-1/2 grid aspect-[217/157] w-[18%] max-w-[217px] -translate-x-1/2 -translate-y-1/2 place-items-center">
              <Image src="/images/about/play-button.svg" alt="" fill unoptimized />
            </span>
          </>
        )}
      </div>
    </section>
  );
}

/**
 * Our Mission (forest, 1592 x 835): cream flush-left label 175px down, copy at
 * x=160 / y=325 (580 wide), photo 705 x 560 at x=750 / y=160.
 */
export function AboutMission({ title, paragraphs, image, imageAlt }: { title: string; paragraphs: string[]; image: string; imageAlt: string }) {
  return (
    <section aria-labelledby="our-mission" className="relative bg-forest pb-14 pt-12 text-cream lg:aspect-[1592/835] lg:p-0">
      <SectionLabel
        id="our-mission"
        text={title}
        variant="flush"
        fill="bg-cream"
        textColor="text-forest"
        className="lg:absolute lg:left-0 lg:top-[20.96%]"
      />
      <div className="mt-6 space-y-5 px-6 text-[16px] leading-relaxed text-cream/90 sm:px-10 lg:absolute lg:left-[10.05%] lg:top-[38.92%] lg:mt-0 lg:w-[36.43%] lg:space-y-[calc(var(--u)*22)] lg:px-0 lg:text-[max(15px,calc(var(--u)*19))] lg:leading-[1.6]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div
        className="relative mx-6 mt-8 aspect-[701/567] overflow-hidden sm:mx-10 lg:absolute lg:left-[47.11%] lg:top-[19.16%] lg:mx-0 lg:mt-0 lg:w-[44.03%]"
      >
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 701px, 100vw" className="object-contain" />
      </div>
    </section>
  );
}

/** Members at (cream, 555 tall): coral tab 130px down, four coral logos 280px down, spread 160–1445. */
export function AboutMembers({ title, logos }: { title: string; logos: { name: string; src: string; width: number; height: number }[] }) {
  return (
    <section aria-labelledby="members-at" className="bg-cream px-6 pb-16 pt-14 sm:px-10 lg:px-[10.05%] lg:pb-[calc(var(--u)*190)] lg:pt-[calc(var(--u)*130)]">
      <SectionLabel id="members-at" text={title} variant="tab" fill="bg-coral" textColor="text-cream" />
      <ul className="mt-10 grid grid-cols-2 items-center justify-items-center gap-8 sm:flex sm:justify-between lg:mt-[calc(var(--u)*52)]">
        {logos.map((logo) => (
          <li key={logo.name}>
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              unoptimized
              className="h-auto w-[calc(var(--w)*0.62px)] sm:w-[calc(var(--w)*0.8px)] lg:w-[calc(var(--u)*var(--w))]"
              style={{ "--w": logo.width } as CSSProperties}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Trusted by (gold, 1592 x 707): coral tab label (#F7C56B text) 105px down; logos
 * at their native Figma sizes in two rows: 3 centred ~108px apart at y=308, then
 * 5 spread edge to edge (≈175px side margins) at y=424, centre-aligned.
 */
export function AboutTrustedBy({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; src: string; width: number; height: number; tint?: boolean }[][];
}) {
  return (
    <section aria-labelledby="trusted-by" className="bg-gold px-6 pb-16 pt-14 sm:px-10 lg:px-0 lg:pb-[calc(var(--u)*182)] lg:pt-[calc(var(--u)*105)]">
      <SectionLabel id="trusted-by" text={title} variant="tab" fill="bg-coral" textColor="text-gold" />
      <div className="mt-10 flex flex-col items-center gap-8 lg:mt-[calc(var(--u)*105)] lg:gap-[calc(var(--u)*51)]">
        {rows.map((row, index) => (
          <ul
            key={index}
            className={`flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-6 ${
              index === 0 ? "lg:gap-x-[calc(var(--u)*108)]" : "lg:flex-nowrap lg:justify-between lg:px-[calc(var(--u)*175)]"
            }`}
          >
            {row.map((logo) => (
              <li key={logo.name} style={{ "--w": logo.width, "--h": logo.height } as CSSProperties}>
                {logo.tint ? (
                  // Cream strip artwork recoloured #547255 through a mask.
                  <span
                    role="img"
                    aria-label={logo.name}
                    className="block h-[calc(var(--h)*0.55px)] w-[calc(var(--w)*0.55px)] bg-sage-dark [mask-repeat:no-repeat] [mask-size:100%_100%] sm:h-[calc(var(--h)*0.75px)] sm:w-[calc(var(--w)*0.75px)] lg:h-[calc(var(--u)*var(--h))] lg:w-[calc(var(--u)*var(--w))]"
                    style={mask(logo.src)}
                  />
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    unoptimized
                    className="h-auto w-[calc(var(--w)*0.55px)] sm:w-[calc(var(--w)*0.75px)] lg:w-[calc(var(--u)*var(--w))]"
                  />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
