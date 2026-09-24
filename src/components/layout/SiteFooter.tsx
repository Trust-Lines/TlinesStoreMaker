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

export function SiteFooter({
  logo,
  goldMembersHeading,
  emailAction,
  followLabel,
  columns,
  callUsHeading,
  phoneNumbers,
  copyright,
}: SiteFooterProps) {
  return (
    <footer id="footer-navigation" className="relative isolate mt-auto overflow-hidden bg-forest text-cream lg:min-h-[636px]">
      <div aria-hidden className="pointer-events-none absolute right-[12%] top-[-30%] -z-10 aspect-[516.194/421.689] w-[32.42%] rotate-180">
        <Image src="/images/figma/footer-outline-nest.svg" alt="" fill unoptimized className="h-full w-full" />
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-[-26%] left-[7.5%] -z-10 aspect-[516.194/421.689] w-[32.42%] rotate-180">
        <Image src="/images/figma/footer-outline-nest.svg" alt="" fill unoptimized className="h-full w-full" />
      </div>

      <div className="mx-auto flex min-h-full w-full max-w-[1592px] flex-col px-6 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 md:px-[8%] md:pb-[38px] md:pt-[78px]">
        <div className="grid gap-12 lg:grid-cols-[310px_1fr] lg:gap-[90px]">
          <div>
            <Link href={logo.href} className="flex w-fit items-center gap-2">
              <Image src={logo.src} alt="" width={54} height={54} unoptimized className="h-[46px] w-auto" />
              <span className="flex flex-col gap-1 leading-none">
                <Image src="/images/figma/header-logo-word2.svg" alt={logo.alt} width={126} height={24} unoptimized className="h-auto w-[126px]" />
                <Image src="/images/figma/header-logo-word1.svg" alt="" width={126} height={10} unoptimized className="h-auto w-[126px]" />
              </span>
            </Link>

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
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 xl:gap-x-10">
            {columns.map((column) => (
              <div key={column.id}>
                <p className="text-[14px] uppercase text-cream/65">{column.heading}</p>
                <ul className="mt-3 flex flex-col gap-[8px]">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href} className="text-[16px] font-semibold leading-none hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[48px] grid gap-10 lg:grid-cols-[310px_1fr] lg:gap-[90px]">
          <div>
            <p className="text-[16px] font-medium">{followLabel}</p>
            <div className="mt-3 flex items-center gap-[8px]">
              {[1, 2, 3].map((icon, index) => (
                <Link
                  key={icon}
                  href="/contact"
                  aria-label={["Instagram", "YouTube", "LinkedIn"][index]}
                  className="rounded-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
                >
                  <Image src={`/images/figma/social-icon-${icon}.svg`} alt="" width={49} height={49} unoptimized className="h-[42px] w-[42px]" />
                </Link>
              ))}
            </div>
            <Link href={emailAction.href} className="mt-5 inline-block text-[16px] font-semibold underline underline-offset-2 hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">
              {emailAction.label}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <p className="text-[14px] uppercase text-cream/65">Locations</p>
              <ul className="mt-3 flex flex-col gap-[7px]">
                {locations.map((location) => (
                  <li key={location}>
                    <a href="/contact" className="text-[16px] font-semibold underline underline-offset-2 hover:text-coral">
                      {location} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[14px] uppercase text-cream/65">{callUsHeading}</p>
              <ul className="mt-3 flex flex-col gap-[7px]">
                {phoneNumbers.map((number, index) => (
                  <li key={`${number}-${index}`}>
                    <a href={`tel:${number.replace(/[^\d+]/g, "")}`} className="whitespace-nowrap text-[16px] font-semibold tracking-wide hover:text-coral">
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-2 text-[13px] text-muted-green sm:flex-row sm:items-center sm:justify-between lg:mt-auto">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
