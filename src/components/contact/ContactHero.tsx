import Image from "next/image";
import { ContactForm } from "./ContactForm";

export interface ContactHeroProps {
  heading: string[];
  image: string;
  mascot: string;
  intro: string;
}

/**
 * Project-enquiry hero from the new Contact frame. On the 1592px canvas the
 * store photo is 959px tall, the 698x750 mascot group sits at x=131/y=300, and the 680x1031
 * form overlaps the photo and cream panel at x=800/y=245.
 */
export function ContactHero({ heading, image, mascot, intro }: ContactHeroProps) {
  return (
    <section aria-labelledby="contact-heading" className="relative isolate overflow-hidden bg-cream">
      {/* lg+: photo + divider at their Figma positions (959px tall photo). */}
      <div className="absolute inset-x-0 top-0 hidden h-[calc(var(--u)*959)] bg-forest lg:block">
        <Image src={image} alt="" fill priority sizes="(min-width: 1592px) 1592px, 100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-forest-dark/60" />
      </div>
      <Image
        src="/images/contact/hero-divider.svg"
        alt=""
        width={1592}
        height={3}
        unoptimized
        className="pointer-events-none absolute inset-x-0 top-[calc(var(--u)*956)] z-10 hidden h-[calc(var(--u)*3)] w-full lg:block"
      />

      <div className="relative mx-auto flex min-h-[1180px] w-full max-w-[1592px] flex-col px-5 pb-16 pt-[calc(var(--header-h)+42px)] sm:px-10 lg:aspect-[1592/1341] lg:min-h-0 lg:px-0 lg:pb-0 lg:pt-0">
        <h1
          id="contact-heading"
          className="relative z-20 ml-[8%] font-display text-[clamp(2rem,8vw,3.2rem)] font-extrabold uppercase leading-[0.94] text-cream lg:absolute lg:left-[calc(var(--u)*264)] lg:top-[calc(var(--u)*320)] lg:ml-0 lg:text-[calc(var(--u)*48)]"
        >
          {heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="relative z-10 mx-auto mt-8 aspect-[698/750] w-[min(100%,540px)] lg:absolute lg:left-[calc(var(--u)*131)] lg:top-[calc(var(--u)*300)] lg:mt-0 lg:w-[calc(var(--u)*698)]">
          {/* Below lg: the photo hangs off the mascot so its bottom edge always meets the
              mascot's flat cut (87.87% down the art: 659 of 750, as on desktop), at any
              width. Full-bleed; 320px up covers the header + heading above it (excess is clipped). */}
          <div aria-hidden className="absolute bottom-[12.13%] left-[calc(50%-50vw)] top-[-320px] -z-10 w-screen bg-forest lg:hidden">
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
            <div className="absolute inset-0 bg-forest-dark/60" />
            <Image src="/images/contact/hero-divider.svg" alt="" width={1592} height={3} unoptimized className="absolute inset-x-0 bottom-0 h-[3px] w-full" />
          </div>
          <Image src={mascot} alt="T Lines project specialist holding store plans" fill priority unoptimized className="object-contain" />
        </div>

        {intro && (
          <p className="relative z-10 mx-auto mt-6 w-[min(86vw,505px)] font-display text-[18px] font-medium leading-normal text-forest sm:text-[20px] lg:absolute lg:left-[calc(var(--u)*197)] lg:top-[calc(var(--u)*1061)] lg:mt-0 lg:w-[calc(var(--u)*505)] lg:text-[calc(var(--u)*22)]">
            {intro}
          </p>
        )}

        <div className="relative z-20 mx-auto mt-10 w-full max-w-[560px] lg:absolute lg:left-[calc(var(--u)*800)] lg:top-[calc(var(--u)*245)] lg:mt-0 lg:w-[calc(var(--u)*680)] lg:max-w-none">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
