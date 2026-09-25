import Image from "next/image";

export interface BlogHeroProps {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  /** Heading level id, so the page can label its main landmark. */
  headingId?: string;
}

/**
 * Journal hero (Figma 1592 x 768): darkened store photo; coral eyebrow ribbon
 * (169 x 33) at x=141 / y=292, heading Montserrat 64/72 bold (-1.28px tracking),
 * description ~750 wide.
 */
export function BlogHero({ eyebrow, heading, description, image, headingId = "blog-heading" }: BlogHeroProps) {
  return (
    <section aria-labelledby={headingId} className="relative isolate bg-forest">
      <div className="relative flex min-h-[440px] items-end px-6 pb-14 pt-[calc(var(--header-h)+40px)] sm:px-10 lg:block lg:aspect-[1592/768] lg:min-h-0 lg:p-0">
        <Image src={image} alt="" fill priority sizes="(min-width: 1592px) 1592px, 100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-forest-dark/75" />

        <div className="lg:absolute lg:left-[8.73%] lg:top-[38%] lg:w-[calc(var(--u)*760)]">
          <p className="relative isolate inline-flex aspect-[169/33] w-[150px] items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.06em] text-cream lg:w-[max(150px,calc(var(--u)*169))] lg:text-[max(12px,calc(var(--u)*12))]">
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-coral [mask-repeat:no-repeat] [mask-size:100%_100%]"
              style={{ maskImage: "url(/images/blog/eyebrow-ribbon.svg)", WebkitMaskImage: "url(/images/blog/eyebrow-ribbon.svg)" }}
            />
            {eyebrow}
          </p>
          <h1
            id={headingId}
            className="mt-4 font-display text-[2.4rem] font-bold leading-[1.125] tracking-[-0.02em] text-cream lg:mt-[calc(var(--u)*20)] lg:text-[max(36px,calc(var(--u)*64))]"
          >
            {heading}
          </h1>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-cream/80 lg:mt-[calc(var(--u)*18)] lg:max-w-none lg:text-[max(14px,calc(var(--u)*20))]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
