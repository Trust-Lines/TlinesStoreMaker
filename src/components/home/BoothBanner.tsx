import Image, { getImageProps } from "next/image";

export interface BoothBannerProps {
  exhibitorLine: string;
  showName: string;
  /** Exact Figma lettering of the two title lines (coral "C"), 395 x 103. */
  titleArt: string;
  boothLabel: string;
  boothNumber: string;
  location: string;
  dates: string;
  /** Looping booth animation, 1200 x 600. */
  boothAnimation: string;
  /** First frame of the animation, shown when the visitor prefers reduced motion. */
  boothStill: string;
  boothAlt: string;
}

/**
 * NACS 2026 banner (Figma "Tlines-NACS-Web-Ad-Fo-store-maker", 1592 x 411,
 * #2E4539). Left 772px: title art 139px in / 48px down, then the cream booth
 * badge (Vector 215, 291 x 113) 100px lower with the location and dates beside
 * it (34px coral icons, Montserrat 22 / 99.7%, 233px wide). Right 820px: the
 * looping booth animation. Below lg the two halves stack.
 */
export function BoothBanner({
  exhibitorLine,
  showName,
  titleArt,
  boothLabel,
  boothNumber,
  location,
  dates,
  boothAnimation,
  boothStill,
  boothAlt,
}: BoothBannerProps) {
  const { props: animationProps } = getImageProps({
    src: boothAnimation,
    alt: boothAlt,
    width: 1200,
    height: 600,
    unoptimized: true,
  });

  const details = [
    { icon: "/images/nacs/icon-location.svg", text: location },
    { icon: "/images/nacs/icon-calendar.svg", text: dates },
  ];

  return (
    <section
      id="nacs"
      aria-labelledby="nacs-heading"
      className="bg-[#2e4539] text-cream lg:grid lg:aspect-[1592/411] lg:grid-cols-[772fr_820fr]"
    >
      <div className="px-6 pb-10 pt-10 sm:px-10 lg:p-0 lg:pl-[calc(var(--u)*139)] lg:pt-[calc(var(--u)*48)]">
        <h2 id="nacs-heading">
          <span className="sr-only">
            {exhibitorLine} {showName}
          </span>
          <Image
            src={titleArt}
            alt=""
            width={395}
            height={103}
            unoptimized
            className="h-auto w-[min(100%,300px)] sm:w-[340px] lg:w-[calc(var(--u)*395)]"
          />
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6 lg:mt-[calc(var(--u)*100)] lg:flex-nowrap lg:gap-[calc(var(--u)*32)]">
          <p className="relative isolate flex aspect-[291/113] w-[220px] shrink-0 flex-col justify-center pl-[7.6%] font-display leading-none text-forest lg:w-[calc(var(--u)*291)]">
            <Image src="/images/nacs/booth-badge.svg" alt="" fill unoptimized className="-z-10" />
            <span className="text-[21px] font-medium lg:text-[max(18px,calc(var(--u)*28))]">{boothLabel}</span>
            <span className="mt-1 text-[38px] font-bold tracking-[0.02em] lg:mt-[calc(var(--u)*6)] lg:text-[max(30px,calc(var(--u)*52))]">
              {boothNumber}
            </span>
          </p>

          <ul className="flex flex-col gap-4 lg:gap-[calc(var(--u)*28)]">
            {details.map((item) => (
              <li key={item.text} className="flex items-center gap-2 lg:gap-[calc(var(--u)*10)]">
                <Image
                  src={item.icon}
                  alt=""
                  width={34}
                  height={34}
                  unoptimized
                  className="h-7 w-7 shrink-0 lg:h-[max(24px,calc(var(--u)*34))] lg:w-[max(24px,calc(var(--u)*34))]"
                />
                <span className="max-w-[233px] font-display text-[17px] font-normal leading-[0.997] lg:max-w-[calc(var(--u)*233)] lg:text-[max(15px,calc(var(--u)*22))]">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative aspect-[1200/600] w-full lg:aspect-auto lg:h-full">
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet={boothStill} />
          <img {...animationProps} alt={animationProps.alt} className="absolute inset-0 h-full w-full object-cover" />
        </picture>
      </div>
    </section>
  );
}
