import Image from "next/image";
import Link from "next/link";

export interface HeroSectionProps {
  eyebrow: string;
  heading: string;
  backgroundImage: string;
  primaryAction: { label: string; href: string };
}

export function HeroSection({ eyebrow, heading, backgroundImage, primaryAction }: HeroSectionProps) {
  return (
    <div className="relative isolate overflow-hidden bg-forest">
      {/* aspect-[1592/950] is too short once the viewport gets much narrower
          than the frame it was designed at — the eyebrow/heading/button
          stack overflows it and gets clipped by this wrapper's own
          overflow-hidden. A taller ratio on mobile gives that copy room;
          sm and up keep the original Figma-matched ratios. */}
      <div className="relative aspect-[3/4] w-full sm:aspect-[1592/950] md:aspect-[1592/921]">
        <Image src={backgroundImage} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(31,47,38,.92) 0%, rgba(31,47,38,.78) 22%, rgba(31,47,38,.42) 40%, rgba(31,47,38,.08) 58%, rgba(31,47,38,0) 68%)",
          }}
        />

        <div className="absolute inset-x-0 top-[43%] md:top-[54%]">
          <div className="px-6 md:px-[10%]">
            <p className="font-display text-xl font-normal text-cream md:text-3xl">{eyebrow}</p>
            <h1 className="mt-2 max-w-[420px] font-display text-4xl font-semibold leading-[1.05] text-cream md:text-6xl">
              {heading}
            </h1>
            <Link
              href={primaryAction.href}
              className="relative isolate mt-8 inline-flex h-[54px] w-[212px] items-center justify-center gap-2 text-sm font-bold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              <Image
                src="/images/figma/see-more-arrow-bg-2.svg"
                alt=""
                fill
                unoptimized
                className="pointer-events-none -z-10 h-full w-full"
              />
              {primaryAction.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Partner logo strip, matching the dark bar under the hero photo. */}
      <div className="bg-forest">
        <div className="mx-auto flex w-full max-w-[1592px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 md:h-[80px] md:justify-between md:px-0 md:py-0">
          <Image
            src="/images/figma/hero-bottom-icons.svg"
            alt="Trusted by leading c-store, grocery, and travel-plaza brands"
            width={1588}
            height={34}
            unoptimized
            className="h-6 w-auto opacity-90 md:h-8"
          />
        </div>
      </div>
    </div>
  );
}
