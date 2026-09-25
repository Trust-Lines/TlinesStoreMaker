import Image from "next/image";
import Link from "next/link";

export interface HomeHeroProps {
  heading: string;
  backgroundImage: string;
  imageAlt: string;
  action: { label: string; href: string };
  /** Client logo strip exported from Figma, plus the client names for screen readers. */
  clients: { src: string; width: number; height: number; names: string[] };
  /** Tailwind bg class for the client-strip bar. Defaults to sage-dark. */
  stripBgClass?: string;
}

/**
 * Full-bleed hero under the absolutely-positioned ReferenceTopBar. Mobile uses
 * a tall fixed-ish height so the copy never collides with the header; from sm
 * up it follows the Figma frame ratio (1592 x 923).
 */
export function HomeHero({ heading, backgroundImage, imageAlt, action, clients, stripBgClass = "bg-sage-dark" }: HomeHeroProps) {
  return (
    <section id="home" aria-labelledby="home-hero-heading" className="relative isolate bg-forest">
      <div className="relative h-[min(100svh,640px)] min-h-[480px] w-full sm:aspect-[1592/923] sm:h-auto sm:min-h-0">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(31,47,38,.85)_0%,rgba(31,47,38,.35)_45%,rgba(31,47,38,.15)_100%)] sm:bg-[linear-gradient(100deg,rgba(31,47,38,.7)_0%,rgba(31,47,38,.35)_35%,rgba(31,47,38,0)_60%)]"
        />

        {/* lg+: Figma heading box at x=121.13, y=560.8 (60.76% of the 923px hero),
            463.6 wide; the button follows below, left-aligned with it. */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:bottom-[9%] sm:px-[9.5%] sm:pb-0 lg:bottom-auto lg:top-[60.76%] lg:pl-[7.61%] lg:pr-0">
          <h1
            id="home-hero-heading"
            className="max-w-[10.5ch] font-display text-[clamp(2.5rem,5.4vw,5.25rem)] font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-cream lg:w-[min(29.12vw,463.6px)] lg:max-w-none lg:text-[min(3.769vw,60px)] lg:leading-[0.9667] lg:tracking-normal"
          >
            {heading}
          </h1>
          <Link
            href={action.href}
            className="relative isolate mt-6 inline-flex aspect-[338/67] w-[var(--bw)] items-start justify-center pl-[calc(var(--bw)*57/338)] pr-[calc(var(--bw)*59/338)] pt-[calc(var(--bw)*17/338)] text-center whitespace-nowrap font-display text-[calc(var(--bw)*24/338)] [--bw:clamp(220px,21.23vw,338px)] font-bold leading-none text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:mt-8"
          >
            {/* Exact Figma button shape (338 x 67). Text: Montserrat 24/24 bold; box inset
                17 top / 26 bottom / 57 left / 59 right — padding and font derived
                from the button width (--bw), so the proportions hold at every size. */}
            <Image src="/images/figma/ribbon-service.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />
            {action.label}
          </Link>
        </div>
      </div>

      {/* Client logos: the Figma strip (Frame 427319102, 1705 x 50 of cream
          logos) on the #547255 bar (Rectangle 4412, 80px tall). Logos are 142px
          apart with no end margins, so each copy gets one 142px gap after it to
          keep the loop seamless. Sized via --strip-h so it scales per breakpoint. */}
      <p className="sr-only">Clients: {clients.names.join(", ")}</p>
      <div aria-hidden className={`brand-marquee overflow-hidden ${stripBgClass}`}>
        <div className="brand-marquee-track flex h-[var(--strip-h)] w-max items-center [--strip-h:44px] sm:[--strip-h:56px] lg:[--strip-h:80px]">
          {[0, 1].map((copy) => (
            <Image
              key={copy}
              src={clients.src}
              alt=""
              width={clients.width}
              height={clients.height}
              unoptimized
              className="h-[calc(var(--strip-h)*50/80)] w-auto max-w-none shrink-0 mr-[calc(var(--strip-h)*50/80*142/50)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
