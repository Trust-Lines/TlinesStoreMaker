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

export function GetStartedSection({ primary, secondary }: GetStartedSectionProps) {
  return (
    <section aria-label="Contact" className="grid bg-sage-dark text-cream md:grid-cols-[minmax(0,1.95fr)_minmax(0,1fr)]">
      <div className="bg-forest px-6 py-12 sm:px-10 md:py-[clamp(3rem,6vw,5.5rem)] md:pl-[21%] md:pr-12 md:[clip-path:polygon(0_0,92%_0,100%_12%,100%_82%,93%_100%,0_100%)]">
        <h2 className="font-display text-[clamp(1.6rem,2.3vw,2.25rem)] font-medium">{primary.title}</h2>
        <p className="mt-3 max-w-[30rem] text-[clamp(1rem,1.3vw,1.25rem)] font-light leading-snug text-cream/90">{primary.description}</p>
        <Link
          href={primary.action.href}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-coral px-8 text-sm font-semibold transition-colors hover:bg-coral-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:text-base"
        >
          {primary.action.label}
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10 md:py-[clamp(3rem,6vw,5.5rem)]">
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
