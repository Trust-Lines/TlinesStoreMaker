import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export interface FooterLinkColumn {
  id: string;
  heading: string;
  links: { id: string; label: string; href: string }[];
}

export interface FooterBrandPill {
  id: string;
  href: string;
  bgClass: string;
  logo: { src: string; alt: string; width: number; height: number };
}

export interface SiteFooterProps {
  logo: { src: string; alt: string; href: string };
  /** The three T Lines brand pills beside the logo (Store Maker / Premium Store fitouts / Design & Build). */
  brandPills: FooterBrandPill[];
  /** Heading lines; the last word of the last line is set in bold. */
  newsletter: { heading: string[]; placeholder: string; email: string };
  followLabel: string;
  columns: FooterLinkColumn[];
  locations: { label: string; href: string }[];
  callUsHeading: string;
  phoneNumbers: string[];
  copyright: string;
}

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/tlines.storemaker" },
  { label: "YouTube", href: "https://www.youtube.com/@Tlinesusa" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/tlines-store-maker/" },
];

const labelClass = "font-display text-[14px] uppercase text-cream/65 lg:text-[calc(var(--u)*16)]";
const linkClass =
  "inline-flex min-h-11 items-center font-display text-[16px] font-semibold leading-none hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral lg:min-h-0 lg:text-[calc(var(--u)*20)]";

/**
 * Footer matching the Figma frame (1592 x 722, #2E4437). From lg up, on the
 * --u scale: logo at x=138/y=62 with the three 323 x 81 brand pills in a row
 * from x=444; newsletter block at y=248; link columns at 679 / 902 / 1146 /
 * 1312 from y=267; socials at y=503; Locations at 892 and Call us at 1291 from
 * y=516; copyright repeated bottom-left and bottom-right. Below lg it stacks.
 */
export function SiteFooter({
  logo,
  brandPills,
  newsletter,
  followLabel,
  columns,
  locations,
  callUsHeading,
  phoneNumbers,
  copyright,
}: SiteFooterProps) {
  const lastLine = newsletter.heading.at(-1) ?? "";
  const boldAt = lastLine.lastIndexOf(" ") + 1;

  return (
    <footer id="footer-navigation" className="relative isolate mt-auto overflow-hidden bg-forest text-cream">
      {/* Decorative outlines (Figma "Subtract" vectors, #395240), clipped to the footer:
          top group hangs from the top edge at x=813; bottom group rises from the bottom edge at x=155. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[51.07%] top-0 aspect-[495/232] w-[33.41%]">
          <Image src="/images/figma/footer-outline-top.svg" alt="" fill unoptimized className="h-full w-full" />
        </div>
        <div className="absolute bottom-[-3px] left-[9.74%] aspect-[519/218] w-[32.6%]">
          <Image src="/images/figma/footer-outline-bottom.svg" alt="" fill unoptimized className="h-full w-full" />
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1592px] flex-col gap-10 px-6 pb-8 pt-12 sm:px-8 sm:pt-14 lg:block lg:h-[calc(var(--u)*722)] lg:p-0">
        <div className="flex flex-col gap-6 lg:contents">
          <Link
            href={logo.href}
            className="flex w-fit items-center outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral lg:absolute lg:left-[calc(var(--u)*138)] lg:top-[calc(var(--u)*62)]"
          >
            <Image src={logo.src} alt={logo.alt} width={183} height={110} unoptimized className="h-[64px] w-auto lg:h-[calc(var(--u)*110)]" />
          </Link>

          <div className="flex flex-col gap-2 sm:flex-row lg:absolute lg:left-[calc(var(--u)*444)] lg:top-[calc(var(--u)*70)] lg:gap-[calc(var(--u)*18)]">
            {brandPills.map((pill) => (
              <Link
                key={pill.id}
                href={pill.href}
                className={`flex h-[64px] w-full max-w-[323px] items-center justify-center rounded-[8px] border border-cream px-4 outline-offset-2 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral lg:h-[calc(var(--u)*81)] lg:w-[calc(var(--u)*323)] lg:max-w-none ${pill.bgClass}`}
              >
                <Image src={pill.logo.src} alt={pill.logo.alt} width={pill.logo.width} height={pill.logo.height} unoptimized className="h-auto max-h-[41px] w-auto max-w-[80%] lg:max-h-[calc(var(--u)*41)]" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:absolute lg:left-[calc(var(--u)*138)] lg:top-[calc(var(--u)*248)] lg:gap-[calc(var(--u)*38)]">
          <p className="font-display text-[28px] leading-[1.3] lg:text-[calc(var(--u)*36)]">
            {newsletter.heading.slice(0, -1).map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
            <span className="block">
              {lastLine.slice(0, boldAt)}
              <strong className="font-bold">{lastLine.slice(boldAt)}</strong>
            </span>
          </p>
          <NewsletterForm placeholder={newsletter.placeholder} email={newsletter.email} />
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:absolute lg:left-[calc(var(--u)*679)] lg:top-[calc(var(--u)*267)] lg:grid-cols-[calc(var(--u)*223)_calc(var(--u)*244)_calc(var(--u)*166)_auto] lg:gap-0"
        >
          {columns.map((column) => (
            <div key={column.id}>
              <p className={labelClass}>{column.heading}</p>
              <ul className="mt-2 flex flex-col lg:mt-[calc(var(--u)*22)] lg:gap-[calc(var(--u)*17)]">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="lg:absolute lg:left-[calc(var(--u)*138)] lg:top-[calc(var(--u)*503)]">
          <p className={labelClass}>{followLabel}</p>
          <div className="mt-3 flex items-center gap-[10px] lg:mt-[calc(var(--u)*18)] lg:gap-[calc(var(--u)*10)]">
            {socials.map(({ label, href }, index) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-[6px] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
              >
                <Image src={`/images/figma/social-icon-${index + 1}.svg`} alt="" width={49} height={49} unoptimized className="h-[44px] w-[44px] lg:h-[calc(var(--u)*49)] lg:w-[calc(var(--u)*49)]" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:contents">
          <div className="lg:absolute lg:left-[calc(var(--u)*892)] lg:top-[calc(var(--u)*516)]">
            <p className={labelClass}>Locations</p>
            <ul className="mt-2 flex flex-col lg:mt-[calc(var(--u)*22)] lg:gap-[calc(var(--u)*12)]">
              {locations.map((location) => (
                <li key={location.label}>
                  <Link href={location.href} className={`${linkClass} gap-1 underline underline-offset-2`}>
                    {location.label} <span aria-hidden>↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:absolute lg:left-[calc(var(--u)*1291)] lg:top-[calc(var(--u)*516)]">
            <p className={labelClass}>{callUsHeading}</p>
            <ul className="mt-2 flex flex-col lg:mt-[calc(var(--u)*22)] lg:gap-[calc(var(--u)*12)]">
              {phoneNumbers.map((number, index) => (
                <li key={`${number}-${index}`}>
                  <a href={`tel:${number.replace(/[^\d+]/g, "")}`} className={`${linkClass} whitespace-nowrap tracking-wide`}>
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 font-display text-[13px] text-muted-green sm:flex-row sm:items-center sm:justify-between lg:absolute lg:left-[calc(var(--u)*138)] lg:right-[calc(var(--u)*146)] lg:top-[calc(var(--u)*686)] lg:text-[calc(var(--u)*15)]">
          <p>{copyright}</p>
          <p aria-hidden className="hidden sm:block">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
