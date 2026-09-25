import { HomeServiceCard, type HomeServiceCardData } from "./HomeServiceCard";

export interface ServiceCardsSectionProps {
  cards: HomeServiceCardData[];
}

export function ServiceCardsSection({ cards }: ServiceCardsSectionProps) {
  return (
    <section id="services" aria-label="Store types we build" className="bg-cream px-8 py-12 md:py-16 lg:pb-[12.56%] lg:pl-[9.51%] lg:pr-[8.147%] lg:pt-[13.1%]">
      {/* lg+: Figma spacing on the 1592 frame — cards start 151.45px in (aligned
          with the hero heading), 381.593 x 643.424 (exact Figma vectors), 82.43px
          apart so Grocery starts at 1080.3. Expressed as % so it scales with the page width.
          Cards are 381.593 x 743.425; each ribbon overhangs its card's right edge by ~41px. */}
      {/* 1 column on phones, 2 on small tablets (odd card centered), 3 from md. */}
      <ul className="mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-[clamp(1.5rem,4.5vw,4.5rem)] lg:max-w-none lg:gap-x-[6.288%]">
        {cards.map((card) => (
          <li
            key={card.id}
            id={card.id}
            className="@container mx-auto w-full max-w-[380px] sm:max-w-none sm:last:col-span-2 sm:last:mx-auto sm:last:w-[calc(50%-1.25rem)] md:last:col-span-1 md:last:mx-0 md:last:w-auto"
          >
            {/* Sizes live in HomeServiceCard (cqw of the card width). */}
            <HomeServiceCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
