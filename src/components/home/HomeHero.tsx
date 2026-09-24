import Image from "next/image";
import Link from "next/link";

export interface HomeHeroProps {
  heading: string;
  backgroundImage: string;
  imageAlt: string;
  action: { label: string; href: string };
  partnerStrip: string;
}

/**
 * Full-bleed hero under the absolutely-positioned ReferenceTopBar. Mobile uses
 * a tall fixed-ish height so the copy never collides with the header; from sm
 * up it follows the Figma frame ratio (1592 x 923).
 */
export function HomeHero({ heading, backgroundImage, imageAlt, action, partnerStrip }: HomeHeroProps) {
  return (
    <section id="home" aria-labelledby="home-hero-heading" className="relative isolate bg-forest">
      <div className="relative h-[min(100svh,640px)] min-h-[480px] w-full sm:aspect-[1592/923] sm:h-auto sm:min-h-0">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(31,47,38,.85)_0%,rgba(31,47,38,.35)_45%,rgba(31,47,38,.15)_100%)] sm:bg-[linear-gradient(100deg,rgba(31,47,38,.7)_0%,rgba(31,47,38,.35)_35%,rgba(31,47,38,0)_60%)]"
        />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:bottom-[9%] sm:px-[9.5%] sm:pb-0">
          <h1
            id="home-hero-heading"
            className="max-w-[10.5ch] font-display text-[clamp(2.5rem,5.4vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-cream"
          >
            {heading}
          </h1>
          <Link
            href={action.href}
            className="relative isolate mt-6 inline-flex aspect-[338/67] w-[clamp(220px,21vw,338px)] items-center justify-center text-sm font-bold text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:mt-8 sm:text-base"
          >
            {/* Exact Figma button shape (338 x 67). */}
            <Image src="/images/figma/ribbon-service.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />
            {action.label}
          </Link>
        </div>
      </div>

      {/* Partner logos: a fixed-height strip rendered at its native aspect so
          logos stay legible on phones instead of shrinking with the viewport. */}
      <div aria-hidden className="brand-marquee overflow-hidden bg-sage-dark">
        <div className="brand-marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <Image
              key={copy}
              src={partnerStrip}
              alt=""
              width={1592}
              height={78}
              unoptimized
              className="h-11 w-auto max-w-none shrink-0 sm:h-14 lg:h-[78px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
