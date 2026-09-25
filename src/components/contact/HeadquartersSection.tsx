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

const mapDots = [
  [8, 48], [11, 57], [14, 42], [16, 64], [18, 52], [20, 71], [23, 45], [25, 60], [27, 50], [29, 69],
  [32, 57], [35, 73], [37, 48], [39, 64], [42, 54], [45, 72], [48, 59], [51, 45], [54, 67], [57, 52],
  [60, 73], [63, 58], [66, 43], [68, 64], [71, 51], [73, 70], [76, 56], [79, 43], [82, 62], [85, 50],
  [88, 40], [91, 58], [34, 38], [44, 40], [55, 36], [65, 34], [74, 37], [84, 32],
] as const;

function LocationPin({ featured = false }: { featured?: boolean }) {
  return (
    <svg viewBox="0 0 70 88" aria-hidden className="h-full w-full overflow-visible drop-shadow-sm">
      <path d="M35 2C16.8 2 2 16.8 2 35c0 24.5 33 50 33 50s33-25.5 33-50C68 16.8 53.2 2 35 2Z" fill="#DB7358" stroke="#FFF4E1" strokeWidth="4" />
      <circle cx="35" cy="35" r={featured ? 20 : 17} fill="#FFF4E1" />
      <path d="M24 25h22v24H24zM20 22h30M28 18h14" fill="none" stroke="#DB7358" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

      <div className="mt-16 lg:absolute lg:left-[calc(var(--u)*681)] lg:top-[calc(var(--u)*131)] lg:mt-0 lg:w-[calc(var(--u)*760)]">
        <h3 className="text-center font-accent text-[clamp(2rem,8vw,3.25rem)] font-medium uppercase leading-[1.08] lg:text-[calc(var(--u)*54)]">
          <span className="block">{heading[0]}</span>
          <span className="block text-gold">{heading[1]}</span>
          <span className="block">{heading[2]}</span>
        </h3>

        <div className="relative mt-10 aspect-[943/598] w-full lg:mt-[calc(var(--u)*73)]">
          <Image src="/images/contact/us-map.svg" alt="Map of the United States showing T Lines locations" fill unoptimized className="object-contain opacity-45" />
          {mapDots.map(([left, top], index) => (
            <span key={index} aria-hidden className="absolute h-1.5 w-1.5 rounded-full bg-gold/65 lg:h-[calc(var(--u)*10)] lg:w-[calc(var(--u)*10)]" style={{ left: `${left}%`, top: `${top}%` }} />
          ))}
          <span className="absolute left-[19%] top-[58%] h-10 w-8 -translate-x-1/2 -translate-y-full lg:h-[calc(var(--u)*61)] lg:w-[calc(var(--u)*48)]"><LocationPin /></span>
          <span className="absolute left-[67%] top-[64%] h-16 w-12 -translate-x-1/2 -translate-y-full lg:h-[calc(var(--u)*96)] lg:w-[calc(var(--u)*72)]"><LocationPin featured /></span>
          <span className="absolute left-[86%] top-[39%] h-10 w-8 -translate-x-1/2 -translate-y-full lg:h-[calc(var(--u)*61)] lg:w-[calc(var(--u)*48)]"><LocationPin /></span>
        </div>
      </div>
    </section>
  );
}
