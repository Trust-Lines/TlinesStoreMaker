import { ServiceCard, type ServiceCardData } from "./ServiceCard";

export interface SpecialtyCardsSectionProps {
  cards: ServiceCardData[];
}

export function SpecialtyCardsSection({ cards }: SpecialtyCardsSectionProps) {
  return (
    <section aria-label="Branding and management services" className="bg-cream px-5 py-12 sm:px-8 md:py-16 lg:pb-[12.56%] lg:pl-[9.51%] lg:pr-[8.4%] lg:pt-[12.56%]">
      {/* lg+: Figma spacing — same 151.45px-to-1458px content box as the service
          cards, two 628 x 682 cards (exact Figma vectors) ~51px apart, 200px below the NACS banner and
          200px above the Projects frame. */}
      <ul className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 sm:gap-10 md:grid-cols-2 md:gap-[clamp(1.5rem,4.5vw,4.5rem)] lg:max-w-none lg:gap-x-[3.9%]">
        {cards.map((card) => (
          <li key={card.id} id={card.id} className="lg:aspect-[628/682]">
            <ServiceCard card={card} imageAspect="598 / 386" mobileImageAspect="8 / 3" ribbonAlign="right" sizes="(min-width: 768px) 45vw, 100vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
