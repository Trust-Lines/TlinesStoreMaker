import Image from "next/image";

export interface MembersStripProps {
  heading: string;
  strip: string;
  alt: string;
}

export function MembersStrip({ heading, strip, alt }: MembersStripProps) {
  return (
    <section id="members" aria-labelledby="members-heading" className="bg-cream py-12 md:py-20">
      <h2 id="members-heading" className="text-center font-display text-[clamp(1.5rem,2.1vw,2rem)] font-bold text-forest">
        {heading}
      </h2>
      <p className="sr-only">{alt}</p>
      {/* Fixed-height strip at native aspect so logos stay legible on phones. */}
      <div aria-hidden className="brand-marquee mt-5 overflow-hidden bg-forest md:mt-7">
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
