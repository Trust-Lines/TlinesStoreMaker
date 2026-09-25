import Image from "next/image";
import { ContactForm } from "./ContactForm";

export interface ContactHeroProps {
  heading: string[];
  image: string;
  mascot: string;
  intro: string;
  email: string;
}

/**
 * Project-enquiry hero from the new Contact frame. On the 1592px canvas the
 * store photo is 959px tall, the mascot sits at x=197/y=455, and the 680x1031
 * form overlaps the photo and cream panel at x=800/y=245.
 */
export function ContactHero({ heading, image, mascot, intro, email }: ContactHeroProps) {
  return (
    <section aria-labelledby="contact-heading" className="relative isolate overflow-hidden bg-cream">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-forest sm:h-[650px] lg:h-[calc(var(--u)*959)]">
        <Image src={image} alt="" fill priority sizes="(min-width: 1592px) 1592px, 100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-forest-dark/60" />
      </div>
      <Image
        src="/images/contact/hero-divider.svg"
        alt=""
        width={1592}
        height={3}
        unoptimized
        className="pointer-events-none absolute inset-x-0 top-[497px] z-10 h-[3px] w-full sm:top-[647px] lg:top-[calc(var(--u)*956)] lg:h-[calc(var(--u)*3)]"
      />

      <div className="relative mx-auto flex min-h-[1180px] w-full max-w-[1592px] flex-col px-5 pb-16 pt-[calc(var(--header-h)+42px)] sm:px-10 lg:aspect-[1592/1341] lg:min-h-0 lg:px-0 lg:pb-0 lg:pt-0">
        <h1
          id="contact-heading"
          className="relative z-10 ml-[8%] font-display text-[clamp(2rem,8vw,3.2rem)] font-extrabold uppercase leading-[0.94] text-cream lg:absolute lg:left-[calc(var(--u)*264)] lg:top-[calc(var(--u)*320)] lg:ml-0 lg:text-[calc(var(--u)*48)]"
        >
          {heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="relative z-10 mx-auto mt-8 aspect-[593/564] w-[min(86vw,460px)] lg:absolute lg:left-[calc(var(--u)*197)] lg:top-[calc(var(--u)*455)] lg:mt-0 lg:w-[calc(var(--u)*593)]">
          <Image src={mascot} alt="T Lines project specialist holding store plans" fill priority unoptimized className="object-contain" />
        </div>

        <p className="relative z-10 mx-auto mt-6 w-[min(86vw,505px)] font-display text-[18px] font-medium leading-normal text-forest sm:text-[20px] lg:absolute lg:left-[calc(var(--u)*197)] lg:top-[calc(var(--u)*1061)] lg:mt-0 lg:w-[calc(var(--u)*505)] lg:text-[calc(var(--u)*22)]">
          {intro}
        </p>

        <div className="relative z-20 mx-auto mt-10 w-full max-w-[560px] lg:absolute lg:left-[calc(var(--u)*800)] lg:top-[calc(var(--u)*245)] lg:mt-0 lg:w-[calc(var(--u)*680)] lg:max-w-none">
          <ContactForm email={email} />
        </div>
      </div>
    </section>
  );
}
