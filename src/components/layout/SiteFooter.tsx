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
      <svg
        aria-hidden
        viewBox="0 0 521 426"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-[-20%] left-[7.2%] -z-10 aspect-[516.194/421.689] w-[32.42%] rotate-180"
      >
        <path d="M88.7319 391.08L441.975 422.909C446.521 423.319 448.794 423.523 450.993 423.234C452.943 422.977 454.844 422.433 456.636 421.621C458.656 420.706 460.478 419.331 464.121 416.582L505.659 385.238C510.434 381.635 512.822 379.833 514.527 377.549C516.037 375.526 517.15 373.236 517.808 370.799C518.552 368.048 518.494 365.057 518.378 359.075L512.645 62.8425C512.502 55.4723 512.431 51.7872 511.226 48.5758C510.16 45.7366 508.463 43.1769 506.262 41.0903C503.773 38.7302 500.406 37.2304 493.672 34.2308L428.83 5.34579C426.303 4.22005 425.039 3.65719 423.725 3.27575C422.558 2.93703 421.362 2.7054 420.153 2.58376C418.791 2.4468 417.409 2.49715 414.644 2.59786L109.322 13.7185C105.54 13.8562 103.649 13.9251 101.839 14.3324C100.233 14.6939 98.678 15.2523 97.2088 15.9949C95.5533 16.8317 94.0504 17.9812 91.0448 20.2803L15.0584 78.4029C10.4515 81.9267 8.14804 83.6886 6.4877 85.9071C5.01706 87.8722 3.92068 90.0911 3.25338 92.4531C2.50003 95.1197 2.50003 98.0198 2.50003 103.82L2.50001 317.071C2.50001 322.993 2.50001 325.953 3.28175 328.667C3.97413 331.07 5.11103 333.322 6.63355 335.306C8.35264 337.546 10.735 339.304 15.4996 342.82L72.6032 384.958C75.2855 386.937 76.6267 387.927 78.0885 388.673C79.3863 389.335 80.7526 389.854 82.1631 390.22C83.7518 390.631 85.4118 390.781 88.7319 391.08Z" stroke="#395240" strokeWidth="5" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 441 361"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-[18%] top-[-10%] -z-10 aspect-[435.748/354.981] w-[27.37%] rotate-180"
      >
        <path d="M76.6651 329.707L371.598 356.208C376.134 356.615 378.402 356.819 380.596 356.53C382.542 356.274 384.439 355.733 386.228 354.924C388.244 354.013 390.064 352.644 393.702 349.905L425.177 326.221C429.966 322.618 432.36 320.817 434.069 318.531C435.583 316.506 436.7 314.213 437.36 311.773C438.105 309.018 438.047 306.022 437.931 300.031L433.205 56.5092C433.061 49.1315 432.99 45.4427 431.782 42.2289C430.715 39.3875 429.015 36.8264 426.81 34.7397C424.317 32.3794 420.946 30.8816 414.202 27.8859L363.43 5.33175C360.909 4.21151 359.648 3.65139 358.336 3.27185C357.172 2.93475 355.979 2.70425 354.773 2.58322C353.414 2.44693 352.035 2.49701 349.278 2.59716L94.2393 11.8606C90.4656 11.9976 88.5788 12.0661 86.7725 12.4718C85.1695 12.8317 83.617 13.3879 82.1499 14.1276C80.497 14.9611 78.9958 16.1062 75.9934 18.3964L15.0926 64.8503C10.4734 68.3736 8.16388 70.1353 6.499 72.3555C5.02436 74.3221 3.92484 76.5437 3.25559 78.9088C2.50003 81.5791 2.50003 84.4838 2.50003 90.2933L2.50001 264.7C2.50001 270.63 2.50001 273.596 3.28398 276.313C3.97828 278.719 5.11836 280.974 6.64488 282.959C8.36854 285.201 10.757 286.958 15.5339 290.473L60.5627 323.609C63.2422 325.581 64.5819 326.566 66.0415 327.31C67.3374 327.969 68.7014 328.486 70.1093 328.85C71.6951 329.26 73.3518 329.409 76.6651 329.707Z" stroke="#395240" strokeWidth="5" />
      </svg>

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
