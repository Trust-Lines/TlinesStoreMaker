import Image from "next/image";

export interface MembersStripProps {
  heading: string;
  strip?: string;
  logos?: Array<{ src: string; width: number; height: number }>;
  alt: string;
  /** Tailwind bg class for the strip. Defaults to gold. */
  bgClass?: string;
}

export function MembersStrip({ heading, strip, logos, alt, bgClass = "bg-gold" }: MembersStripProps) {
  return (
    <section id="members" aria-labelledby="members-heading" className="bg-cream py-8 md:py-10 lg:pb-[2.01%] lg:pt-[2.32%]">
      <h2 id="members-heading" className="sr-only">
        {heading}
      </h2>
      <p className="sr-only">{alt}</p>
      {/* Figma: gold #F7C56B strip (1592 x 109), forest logos 131px apart, ~37px
          under the Projects frame (heading kept for screen readers only); 32px
          down to the "Let's Get Started" band. Fixed-height strip at native aspect so logos
          stay legible on phones. */}
      <div aria-hidden className={`brand-marquee overflow-hidden ${bgClass}`}>
        <div className="brand-marquee-track flex w-max [--strip-h:64px] sm:[--strip-h:80px] lg:[--strip-h:109px]">
          {logos
            ? [0, 1].map((copy) => (
                <div
                  key={copy}
                  className="mr-[calc(var(--strip-h)*0.9873)] inline-flex h-[var(--strip-h)] shrink-0 items-center gap-[calc(var(--strip-h)*1.5511)] px-[calc(var(--strip-h)*0.2819)] py-[calc(var(--strip-h)*0.1409)]"
                >
                  {logos.map((logo) => (
                    <Image
                      key={`${copy}-${logo.src}`}
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      unoptimized
                      className="w-auto max-w-none shrink-0"
                      style={{ height: `calc(var(--strip-h) * ${logo.height / 1419})` }}
                    />
                  ))}
                </div>
              ))
            : [0, 1].map((copy) => (
                <Image
                  key={copy}
                  src={strip ?? ""}
                  alt=""
                  width={1592}
                  height={109}
                  unoptimized
                  className="h-[var(--strip-h)] w-auto max-w-none shrink-0"
                />
              ))}
        </div>
      </div>
    </section>
  );
}
