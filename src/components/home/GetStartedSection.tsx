import Image from "next/image";
import Link from "next/link";

interface CtaPanel {
  title: string;
  description: string;
  action: { label: string; href: string };
}

export interface GetStartedSectionProps {
  primary: CtaPanel;
  secondary: CtaPanel;
}

/**
 * Contact CTA. From lg up it follows the Figma frame (1592 x 301): the
 * "Let's Get Started" panel is the exact Vector 203 shape (1069 x 301, its
 * angled edge overlapping the sage panel), copy starts 139.5px in, and
 * "Still not sure?" is centered in the remaining 1069–1592 strip.
 * Below lg the two panels stack.
 */
export function GetStartedSection({ primary, secondary }: GetStartedSectionProps) {
  return (
    <section id="contact" aria-label="Contact" className="relative grid bg-sage-dark text-cream lg:block lg:aspect-[1592/301]">
      <Image
        src="/images/figma/get-started-panel.svg"
        alt=""
        width={1069}
        height={301}
        unoptimized
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-[67.15%] lg:block"
      />

      <div className="relative bg-forest px-6 py-12 sm:px-10 lg:absolute lg:inset-y-0 lg:left-[8.76%] lg:flex lg:w-[50%] lg:flex-col lg:justify-center lg:bg-transparent lg:p-0">
        <h2 className="font-display text-[clamp(1.6rem,2.3vw,2.25rem)] font-medium">{primary.title}</h2>
        <p className="mt-3 max-w-[30rem] text-[clamp(1rem,1.3vw,1.25rem)] font-light leading-snug text-cream/90">{primary.description}</p>
        <Link
          href={primary.action.href}
          className="mt-6 inline-flex min-h-12 w-fit items-center justify-center rounded-md bg-coral px-8 text-sm font-semibold transition-colors hover:bg-coral-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:text-base"
        >
          {primary.action.label}
        </Link>
      </div>

      <div className="relative flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:absolute lg:inset-y-0 lg:left-[67.15%] lg:right-0 lg:p-0">
        <h2 className="font-display text-[clamp(1.6rem,2.3vw,2.25rem)] font-medium">{secondary.title}</h2>
        <p className="mt-3 max-w-[18rem] text-[clamp(1rem,1.3vw,1.25rem)] font-light leading-snug text-cream/90">{secondary.description}</p>
        <Link
          href={secondary.action.href}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md border border-cream px-10 text-sm font-semibold transition-colors hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:text-base"
        >
          {secondary.action.label}
        </Link>
      </div>
    </section>
  );
}
