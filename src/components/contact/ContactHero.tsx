import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./ContactForm";

export interface ContactHeroProps {
  heading: string;
  image: string;
  phone: string;
  email: string;
  socials: { label: string; href: string; icon: string }[];
}

const labelClass = "font-display text-[13px] font-medium uppercase tracking-[0.04em] text-coral lg:text-[max(13px,calc(var(--u)*18))]";
const valueClass =
  "mt-1 inline-block font-display text-[1.35rem] font-medium text-cream hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream lg:mt-[calc(var(--u)*10)] lg:text-[max(19px,calc(var(--u)*30))]";

/**
 * Contact hero (Figma frame 1592 x 959): darkened store photo with the contact
 * details on the left and the white form card on the right. From lg up the card
 * sits 831.68px in and 209px down, 623.6 wide, and runs ~178px past the hero
 * into the section below. Below lg the card stacks under the details.
 */
export function ContactHero({ heading, image, phone, email, socials }: ContactHeroProps) {
  return (
    <section aria-labelledby="contact-heading" className="relative isolate">
      <div className="relative isolate bg-forest pb-24 pt-[calc(var(--header-h)+32px)] lg:aspect-[1592/959] lg:pb-0 lg:pt-0">
        <Image src={image} alt="" fill priority sizes="(min-width: 1592px) 1592px, 100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-forest-dark/75" />

        <div className="px-6 sm:px-10 lg:absolute lg:left-[9.86%] lg:top-[25%] lg:px-0">
          <h1
            id="contact-heading"
            className="font-accent text-[2.25rem] font-bold uppercase leading-none text-cream lg:text-[max(33px,calc(var(--u)*60))]"
          >
            {heading}
          </h1>

          <dl className="mt-10 flex flex-col gap-8 pl-[0.4em] sm:pl-6 lg:mt-[calc(var(--u)*80)] lg:gap-[calc(var(--u)*62)] lg:pl-[calc(var(--u)*26)]">
            <div>
              <dt className={labelClass}>Call</dt>
              <dd>
                <a href={`tel:+1${phone.replace(/\D/g, "")}`} className={valueClass}>
                  {phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>Email</dt>
              <dd>
                <a href={`mailto:${email}`} className={valueClass}>
                  {email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>Social</dt>
              <dd className="mt-2 flex gap-2 lg:mt-[calc(var(--u)*14)]">
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="rounded-[6px] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
                  >
                    <Image src={social.icon} alt="" width={49} height={49} unoptimized className="h-11 w-11 lg:h-[calc(var(--u)*46)] lg:w-[calc(var(--u)*46)]" />
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="relative z-10 mx-4 -mt-14 sm:mx-auto sm:max-w-[560px] lg:absolute lg:left-[52.24%] lg:top-[21.8%] lg:mx-0 lg:mt-0 lg:w-[39.17%] lg:max-w-none">
        <ContactForm email={email} />
      </div>
    </section>
  );
}
