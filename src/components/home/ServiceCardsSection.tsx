import { ServiceCard, type ServiceCardData } from "./ServiceCard";

export interface ServiceCardsSectionProps {
  cards: ServiceCardData[];
}

export function ServiceCardsSection({ cards }: ServiceCardsSectionProps) {
  return (
    <section id="services" aria-label="Store types we build" className="bg-cream px-5 py-12 sm:px-8 md:py-16 lg:pb-[12.56%] lg:pl-[9.51%] lg:pr-[8.4%] lg:pt-[13.6%]">
      {/* lg+: Figma spacing on the 1592 frame — cards start 151.45px in (aligned
          with the hero heading), ~378px wide, ~86px apart, 216px below the
          logo strip. Expressed as % so it scales with the page width. */}
      {/* 1 column on phones, 2 on small tablets (odd card centered), 3 from md. */}
      <ul className="mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-[clamp(1.5rem,4.5vw,4.5rem)] lg:max-w-none lg:gap-x-[6.61%]">
        {cards.map((card) => (
          <li
            key={card.id}
            id={card.id}
            className="lg:aspect-[378/588] sm:last:col-span-2 sm:last:mx-auto sm:last:w-[calc(50%-1.25rem)] md:last:col-span-1 md:last:mx-0 md:last:w-auto"
          >
            <ServiceCard card={card} imageAspect="359 / 346" />
          </li>
        ))}
      </ul>
    </section>
  );
}
