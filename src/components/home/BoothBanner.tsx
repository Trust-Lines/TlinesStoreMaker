import Image, { getImageProps } from "next/image";
import Link from "next/link";

export interface BoothBannerProps {
  boothLabel: string;
  boothNumber: string;
  exhibitorLine: string;
  showName: string;
  illustration: string;
  /** Animated NACS web ad from Figma (node 175:8729), 970 x 250. */
  animatedAd: string;
  /** First frame of the ad, shown when the visitor prefers reduced motion. */
  stillAd: string;
  adAlt: string;
  action: { label: string; href: string };
}

/**
 * NACS trade-show banner. From sm up it renders the Figma web ad as-is
 * (full-bleed animated GIF, ending on its "Explore More" CTA, so the whole
 * banner is a link). On phones the ad's baked-in copy would shrink to a few
 * pixels, so a stacked HTML version with the same content is shown instead.
 */
export function BoothBanner({
  boothLabel,
  boothNumber,
  exhibitorLine,
  showName,
  illustration,
  animatedAd,
  stillAd,
  adAlt,
  action,
}: BoothBannerProps) {
  const { props: adProps } = getImageProps({
    src: animatedAd,
    alt: adAlt,
    width: 970,
    height: 250,
    unoptimized: true,
  });

  return (
    <section aria-label={`${exhibitorLine} ${showName}, booth ${boothNumber}`} className="my-6 md:my-12">
      <Link
        href={action.href}
        aria-label={`${action.label}: ${adAlt}`}
        className="hidden outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral sm:block"
      >
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet={stillAd} />
          <img {...adProps} alt={adProps.alt} className="block aspect-[1594/411] h-auto w-full object-cover" />
        </picture>
      </Link>

      <div className="overflow-hidden bg-[linear-gradient(180deg,#2e4437_0%,#2e4437_50%,#586553_100%)] text-cream sm:hidden">
        <div className="flex flex-col gap-6 px-6 pb-2 pt-10">
          <div className="flex items-center gap-3">
            <Image src="/images/figma/header-logo-mark.svg" alt="" width={86} height={85} unoptimized className="h-16 w-auto" />
            <span className="flex flex-col gap-1.5">
              <Image src="/images/figma/header-logo-word2.svg" alt="T Lines Store Maker" width={213} height={40} unoptimized className="h-auto w-40" />
              <Image src="/images/figma/header-logo-word1.svg" alt="" width={213} height={17} unoptimized className="h-auto w-40" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="rounded-md bg-cream px-3 py-1.5 font-display leading-none text-forest">
              <span className="block text-[0.9rem] font-medium">{boothLabel}</span>
              <span className="block text-[1.6rem] font-bold tracking-wide">{boothNumber}</span>
            </p>
            <p className="font-display text-base font-medium leading-tight">
              {exhibitorLine}
              <br />
              <span className="font-bold">{showName}</span>
            </p>
          </div>

          <Link
            href={action.href}
            className="inline-flex min-h-11 w-fit items-center rounded-md bg-coral px-6 text-sm font-semibold transition-colors hover:bg-coral-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            {action.label}
          </Link>
        </div>

        <div className="relative aspect-[872/407] w-full">
          <Image
            src={illustration}
            alt=""
            fill
            sizes="100vw"
            className="object-cover [mask-image:linear-gradient(to_bottom,transparent,#000_18%)]"
          />
        </div>
      </div>
    </section>
  );
}
