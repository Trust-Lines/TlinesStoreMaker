import Image from "next/image";
import type { HeadquarterId } from "@/lib/content";

export interface HeadquartersSectionProps {
  heading: string[];
  offices: {
    id: HeadquarterId;
    title: string;
    label: string;
    address: string[];
    hours: string[];
    phone: string;
    email: string;
  }[];
}

const detailIcons = {
  address: "/images/contact/icon-address.svg",
  hours: "/images/contact/icon-hours.svg",
  phone: "/images/contact/icon-phone.svg",
  email: "/images/contact/icon-email.svg",
};

/** Green headquarters band from the new Contact page. */
export function HeadquartersSection({ heading, offices }: HeadquartersSectionProps) {
  const office = offices[0];
  const details = [
    { key: "address", label: "Address:", lines: office.address },
    { key: "hours", label: "Hours:", lines: office.hours },
    { key: "phone", label: "Phone Number", lines: [office.phone], href: `tel:${office.phone.replace(/[^\d+]/g, "")}` },
    { key: "email", label: "Email Address", lines: [office.email], href: `mailto:${office.email}` },
  ] as const;

  return (
    <section aria-labelledby="hq-heading" className="relative overflow-hidden bg-sage-dark px-6 py-16 text-cream sm:px-10 lg:aspect-[1592/959] lg:px-0 lg:py-0">
      <div className="lg:absolute lg:left-[calc(var(--u)*153)] lg:top-[calc(var(--u)*156)] lg:w-[calc(var(--u)*404)]">
        <h2 id="hq-heading" className="font-display text-[2rem] font-bold leading-[0.94] lg:text-[calc(var(--u)*42)]">
          {office.title.split("\n").map((line) => <span key={line} className="block">{line}</span>)}
        </h2>

        <dl className="mt-10 flex flex-col gap-8 lg:mt-[calc(var(--u)*49)] lg:gap-[calc(var(--u)*42)]">
          {details.map((item) => (
            <div key={item.key} className="flex items-center gap-4 lg:gap-[calc(var(--u)*18)]">
              <Image
                src={detailIcons[item.key]}
                alt=""
                width={38}
                height={38}
                unoptimized
                className="h-7 w-7 shrink-0 object-contain lg:h-[calc(var(--u)*32)] lg:w-[calc(var(--u)*38)]"
              />
              <div>
                <dt className="font-display text-[12px] font-medium text-cream/80 lg:text-[calc(var(--u)*14)]">{item.label}</dt>
                <dd className="mt-0.5 font-display text-[15px] font-semibold leading-[1.22] lg:text-[calc(var(--u)*18)]">
                  {"href" in item ? (
                    <a href={item.href} className="hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">{item.lines[0]}</a>
                  ) : (
                    item.lines.map((line) => <span key={line} className="block">{line}</span>)
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <span aria-hidden className="hidden lg:absolute lg:left-[calc(var(--u)*556)] lg:top-[calc(var(--u)*287)] lg:block lg:h-[calc(var(--u)*423)] lg:w-px lg:bg-cream/25" />

      <h3 className="mt-16 text-center font-accent text-[clamp(2rem,8vw,3.25rem)] font-medium uppercase leading-[1.08] lg:absolute lg:left-[calc(var(--u)*755)] lg:top-[calc(var(--u)*137)] lg:mt-0 lg:text-left lg:text-[calc(var(--u)*54)] lg:leading-[1.13]">
        <span className="block">{heading[0]}</span>
        <span className="block text-gold lg:pl-[calc(var(--u)*239)]">{heading[1]}</span>
        <span className="block">{heading[2]}</span>
      </h3>

      <div className="relative mt-10 aspect-[784/429] w-full lg:absolute lg:left-[calc(var(--u)*683)] lg:top-[calc(var(--u)*397)] lg:mt-0 lg:w-[calc(var(--u)*728)]">
        <Image src="/images/contact/us-map-locations.png" alt="Map of the United States showing T Lines locations" fill unoptimized className="object-contain" />
      </div>
    </section>
  );
}
