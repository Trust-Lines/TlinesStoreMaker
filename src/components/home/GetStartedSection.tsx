import Image from "next/image";
import Link from "next/link";

export interface GetStartedSectionProps {
  title: string;
  description: string;
  action: { label: string; href: string };
}

/**
 * "Let's Get Started" band (Figma 298:5425, 1592 x 301, #547255): centred
 * heading and copy, a 288 x 48 coral button (radius 8) whose top sits 199.63px
 * down and 53.37px above the bottom, and the sage "Subtract" outlines
 * (150 x 269 / 146 x 271) against the left and right edges. Below lg the band
 * takes its content height.
 */
export function GetStartedSection({ title, description, action }: GetStartedSectionProps) {
  return (
    <section id="contact" aria-labelledby="get-started-heading" className="relative isolate overflow-hidden bg-sage-dark text-cream lg:aspect-[1592/301]">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 -z-10 flex items-center">
        <Image
          src="/images/figma/get-started-outline-left.svg"
          alt=""
          width={150}
          height={269}
          unoptimized
          className="h-[62%] w-auto opacity-50 sm:h-[80%] lg:h-[calc(var(--u)*269)] lg:opacity-100"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 flex items-center">
        <Image
          src="/images/figma/get-started-outline-right.svg"
          alt=""
          width={146}
          height={271}
          unoptimized
          className="h-[62%] w-auto opacity-50 sm:h-[80%] lg:h-[calc(var(--u)*271)] lg:opacity-100"
        />
      </div>

      <div className="flex flex-col items-center px-16 py-12 text-center sm:px-24 lg:h-full lg:px-0 lg:pb-0 lg:pt-[calc(var(--u)*59)]">
        <h2
          id="get-started-heading"
          className="font-accent text-[clamp(1.6rem,2.26vw,36px)] font-semibold leading-tight"
        >
          {title}
        </h2>
        <p className="mt-3 max-w-[34ch] text-[clamp(1rem,1.2vw,19px)] font-light leading-snug text-cream/85 lg:mt-[calc(var(--u)*14)] lg:max-w-[calc(var(--u)*460)]">
          {description}
        </p>
        <Link
          href={action.href}
          className="mt-7 flex h-12 w-full max-w-[288px] items-center justify-center rounded-[8px] bg-coral p-3 font-display text-[15px] font-semibold text-cream transition-colors hover:bg-coral-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream lg:absolute lg:left-1/2 lg:top-[calc(var(--u)*199.63)] lg:mt-0 lg:h-[max(40px,calc(var(--u)*48))] lg:w-[max(220px,calc(var(--u)*288))] lg:max-w-none lg:-translate-x-1/2 lg:text-[max(12px,calc(var(--u)*16))]"
        >
          {action.label}
        </Link>
      </div>
    </section>
  );
}
