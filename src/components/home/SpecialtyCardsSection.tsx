import { ServiceCard, type ServiceCardData } from "./ServiceCard";

export interface SpecialtyCardsSectionProps {
  cards: ServiceCardData[];
}

export function SpecialtyCardsSection({ cards }: SpecialtyCardsSectionProps) {
  return (
    <section aria-label="Branding and management services" className="bg-sage px-5 py-12 sm:px-8 md:py-16 lg:px-[5.8%] lg:py-[64px]">
      <ul className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-[clamp(1.5rem,4.5vw,4.5rem)]">
        {cards.map((card) => (
          <li key={card.id} id={card.id} className="scroll-mt-6">
            <ServiceCard card={card} imageAspect="652 / 400" ribbonAlign="right" sizes="(min-width: 768px) 45vw, 100vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
