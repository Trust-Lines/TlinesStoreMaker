import Image from "next/image";

export interface MembersStripProps {
  heading: string;
  strip: string;
  alt: string;
}

export function MembersStrip({ heading, strip, alt }: MembersStripProps) {
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
      <div aria-hidden className="brand-marquee overflow-hidden bg-gold">
        <div className="brand-marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <Image
              key={copy}
              src={strip}
              alt=""
              width={1592}
              height={109}
              unoptimized
              className="h-16 w-auto max-w-none shrink-0 sm:h-20 lg:h-[109px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
