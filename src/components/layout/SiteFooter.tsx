import Image from "next/image";
import Link from "next/link";

export interface FooterLinkColumn {
  id: string;
  heading: string;
  links: { id: string; label: string; href: string }[];
}

export interface SiteFooterProps {
  logo: { src: string; alt: string; href: string };
  goldMembersHeading?: string;
  /** Uppercase tagline under the logo, one entry per line. */
  tagline?: string[];
  emailAction: { label: string; href: string };
  followLabel: string;
  columns: FooterLinkColumn[];
  callUsHeading: string;
  phoneNumbers: string[];
  copyright: string;
}

const memberMarks = [
  { label: "NACS", className: "text-[#1684a5]" },
  { label: "NATSO", className: "text-[#30425b]" },
  { label: "M·PACT", className: "text-[#175a83]" },
  { label: "nga", className: "text-[#e1483f]" },
];

const locations = [
  "Atalanta, Georgia (GA)",
  "Phoenix, Arizona (AZ)",
  "Milford, Connecticut (CT)",
];

const socials = ["Instagram", "YouTube", "LinkedIn"];

/**
 * Footer matching the Figma frame (1592 x 636, #2E4437). From lg up:
 * left column at 139.5px (logo, tagline, email box, socials); link columns at
 * 688 / 872 / 1095 / 1271; Locations at 688 and Call us at 1101; copyright
 * repeated bottom-left and bottom-right, ending at 1454. Values are % of the
 * frame so the layout scales with the page. Below lg it stacks.
 */
export function SiteFooter({
  logo,
  goldMembersHeading,
  tagline,
  emailAction,
  followLabel,
  columns,
  callUsHeading,
  phoneNumbers,
  copyright,
}: SiteFooterProps) {
  return (
    <footer id="footer-navigation" className="relative isolate mt-auto bg-forest text-cream lg:min-h-[636px]">
      {/* Decorative outlines (Figma "Subtract" vectors, #395240), clipped to the footer:
          top group hangs from the top edge at x=813 (531.9 wide, 247.07 from the right);
          bottom group rises from the bottom edge at x=155 (519 x 218, top at y=421). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[51.07%] top-0 aspect-[495/232] w-[33.41%]">
          <Image src="/images/figma/footer-outline-top.svg" alt="" fill unoptimized className="h-full w-full" />
        </div>
        <div className="absolute bottom-[-3px] left-[9.74%] aspect-[519/218] w-[32.6%]">
          <Image src="/images/figma/footer-outline-bottom.svg" alt="" fill unoptimized className="h-full w-full" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1592px] flex-col px-6 pb-8 pt-12 sm:px-8 sm:pt-14 lg:min-h-[636px] lg:pb-[2.2%] lg:pl-[8.76%] lg:pr-[8.67%] lg:pt-[6.03%]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,548fr)_minmax(0,766fr)] lg:gap-0">
          {/* Left column: logo, tagline, email, socials */}
          <div className="flex flex-col">
            <Link href={logo.href} className="flex w-fit items-center gap-2 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">
              <Image src={logo.src} alt="" width={54} height={54} unoptimized className="h-[46px] w-auto lg:h-[min(3.4vw,54px)]" />
              <span className="flex flex-col gap-1 leading-none">
                <Image src="/images/figma/header-logo-word2.svg" alt={logo.alt} width={126} height={24} unoptimized className="h-auto w-[126px] lg:w-[min(10.3vw,164px)]" />
                <Image src="/images/figma/header-logo-word1.svg" alt="" width={126} height={10} unoptimized className="h-auto w-[126px] lg:w-[min(10.3vw,164px)]" />
              </span>
            </Link>

            {tagline?.length ? (
              // Figma: 322 x 122 box, text centered vertically; Montserrat 32/32, semibold.
              <p className="mt-8 flex flex-col justify-center font-display text-[clamp(1.5rem,2.01vw,32px)] font-semibold uppercase leading-none text-cream lg:mt-[min(2.32vw,37px)] lg:h-[min(7.66vw,122px)] lg:w-[min(20.23vw,322px)]">
                {tagline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ) : null}

            {goldMembersHeading ? (
              <>
                <p className="mt-5 font-display text-[clamp(24px,2.2vw,30px)] font-medium leading-none">{goldMembersHeading}</p>
                <div className="mt-4 grid max-w-[298px] grid-cols-4 gap-1 sm:flex sm:gap-[6px]">
                  {memberMarks.map((mark, index) => (
                    <div
                      key={mark.label}
                      className="flex aspect-square w-full max-w-[70px] shrink-0 items-center justify-center bg-cream text-center"
                      style={{
                        clipPath:
                          index % 2 === 0
                            ? "polygon(14% 0,88% 3%,100% 16%,98% 86%,84% 100%,12% 95%,0 82%,1% 14%)"
                            : "polygon(12% 3%,88% 0,100% 14%,99% 84%,86% 96%,13% 100%,0 85%,1% 16%)",
                      }}
                    >
                      <span className={`font-display text-[16px] font-extrabold leading-none ${mark.className}`}>{mark.label}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {/* "Send us an email" as an outlined field-style link (Figma ~323 x 46). */}
            <Link
              href={emailAction.href}
              className="mt-8 flex h-[46px] w-full max-w-[323px] items-center justify-between rounded-[4px] border border-cream px-4 text-[14px] font-medium transition-colors hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral lg:mt-[min(1.7vw,27px)] lg:w-[min(20.3vw,323px)]"
            >
              {emailAction.label}
              <span aria-hidden>→</span>
            </Link>

            <p className="mt-6 text-[16px] font-medium lg:mt-[min(1.5vw,24px)]">{followLabel}</p>
            <div className="mt-3 flex items-center gap-[8px]">
              {socials.map((label, index) => (
                <Link
                  key={label}
                  href="/contact"
                  aria-label={label}
                  className="rounded-[6px] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
                >
                  <Image src={`/images/figma/social-icon-${index + 1}.svg`} alt="" width={49} height={49} unoptimized className="h-[44px] w-[44px] lg:h-[min(3vw,48px)] lg:w-[min(3vw,48px)]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right column: link columns, then locations + call us */}
          <div className="flex flex-col gap-10 lg:gap-[min(4.65vw,74px)] lg:pt-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-[184fr_223fr_176fr_183fr] lg:gap-0">
              {columns.map((column) => (
                <div key={column.id}>
                  <p className="text-[14px] uppercase text-cream/65">{column.heading}</p>
                  <ul className="mt-2 flex flex-col lg:mt-4 lg:gap-[14px]">
                    {column.links.map((link) => (
                      <li key={link.id}>
                        <Link href={link.href} className="inline-flex min-h-11 items-center text-[16px] font-semibold leading-none hover:text-coral lg:min-h-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral lg:text-[min(1.13vw,18px)]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 lg:grid-cols-[413fr_353fr] lg:gap-0">
              <div className="sm:col-span-2 lg:col-span-1">
                <p className="text-[14px] uppercase text-cream/65">Locations</p>
                <ul className="mt-2 flex flex-col lg:mt-4 lg:gap-[12px]">
                  {locations.map((location) => (
                    <li key={location}>
                      <a href="/contact" className="inline-flex min-h-11 items-center gap-1 text-[16px] font-semibold underline underline-offset-2 hover:text-coral lg:min-h-0 lg:text-[min(1.13vw,18px)]">
                        {location} <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[14px] uppercase text-cream/65">{callUsHeading}</p>
                <ul className="mt-2 flex flex-col lg:mt-4 lg:gap-[12px]">
                  {phoneNumbers.map((number, index) => (
                    <li key={`${number}-${index}`}>
                      <a href={`tel:${number.replace(/[^\d+]/g, "")}`} className="inline-flex min-h-11 items-center whitespace-nowrap text-[16px] font-semibold tracking-wide hover:text-coral lg:min-h-0 lg:text-[min(1.13vw,18px)]">
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-2 text-[13px] text-muted-green sm:flex-row sm:items-center sm:justify-between lg:mt-auto lg:text-[min(0.94vw,15px)]">
          <p>{copyright}</p>
          <p aria-hidden className="hidden sm:block">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
