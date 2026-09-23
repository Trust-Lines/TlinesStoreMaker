import Image from "next/image";
import Link from "next/link";

export interface FooterLinkColumn {
  id: string;
  heading: string;
  links: { id: string; label: string; href: string }[];
}

export interface SiteFooterProps {
  logo: { src: string; alt: string; href: string };
  goldMembersHeading: string;
  emailAction: { label: string; href: string };
  followLabel: string;
  columns: FooterLinkColumn[];
  callUsHeading: string;
  phoneNumbers: string[];
  copyright: string;
}

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
    <footer className="relative isolate mt-auto overflow-hidden bg-forest pt-16 text-cream md:h-[636px] md:pt-[72px]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <Image src="/images/figma/footer-bg-wave.svg" alt="" width={1639} height={685} unoptimized className="h-auto w-full" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 -z-10 w-[360px] rotate-[105deg] opacity-90 md:w-[430px]"
      >
        <Image src="/images/figma/footer-swirl-1.svg" alt="" width={369} height={452} unoptimized className="h-auto w-full" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 -z-10 w-[380px] rotate-90 opacity-90 md:w-[440px]"
      >
        <Image src="/images/figma/footer-swirl-2.svg" alt="" width={422} height={516} unoptimized className="h-auto w-full" />
      </div>

      <div className="mx-auto w-full max-w-[1592px] px-6 pb-10 md:px-[7.6%]">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex max-w-sm flex-col gap-6">
            <Link href={logo.href} className="flex items-center gap-3">
              <Image src={logo.src} alt="" width={86} height={85} unoptimized className="h-14 w-auto" />
              <span className="flex flex-col leading-none">
                <Image src="/images/figma/header-logo-word1.svg" alt="" width={213} height={17} unoptimized className="h-2.5 w-auto" />
                <Image src="/images/figma/header-logo-word2.svg" alt={logo.alt} width={213} height={40} unoptimized className="h-5 w-auto" />
              </span>
            </Link>

            <div>
              <p className="font-display text-3xl font-semibold leading-tight">{goldMembersHeading}</p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                {[0, 1, 2].map((i) => (
                  <Image key={i} src="/images/figma/nacs-logo.svg" alt="NACS" width={125} height={47} unoptimized className="h-9 w-auto" />
                ))}
              </div>
            </div>

            <Link
              href={emailAction.href}
              className="relative inline-flex h-[48px] w-fit items-center gap-4 rounded-lg border border-cream px-4 py-2.5 text-base font-medium text-cream transition-colors hover:bg-cream hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              {emailAction.label}
              <Image src="/images/figma/arrow-icon-lg.svg" alt="" width={23} height={23} unoptimized />
            </Link>

            <div>
              <p className="text-lg font-medium">{followLabel}</p>
              <div className="mt-3 flex items-center gap-3">
                <Image src="/images/figma/social-icon-1.svg" alt="Facebook" width={49} height={49} unoptimized className="h-10 w-10" />
                <Image src="/images/figma/social-icon-2.svg" alt="Instagram" width={49} height={49} unoptimized className="h-10 w-10" />
                <Image src="/images/figma/social-icon-3.svg" alt="LinkedIn" width={49} height={49} unoptimized className="h-10 w-10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.id}>
                <p className="text-lg uppercase text-cream/70">{column.heading}</p>
                <ul className="mt-3 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href} className="text-xl font-semibold hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-lg uppercase text-cream/70">{callUsHeading}</p>
              <ul className="mt-3 flex flex-col gap-3">
                {phoneNumbers.map((number, i) => (
                  <li key={`${number}-${i}`}>
                    <a href={`tel:${number.replace(/[^\d+]/g, "")}`} className="text-xl font-semibold tracking-wide hover:text-coral">
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/15 pt-5 text-sm text-muted-green">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
