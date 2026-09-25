import { SpecialtyCard, type SpecialtyCardData } from "./SpecialtyCard";

export interface SpecialtyCardsSectionProps {
  cards: SpecialtyCardData[];
}

export function SpecialtyCardsSection({ cards }: SpecialtyCardsSectionProps) {
  return (
    <section aria-label="Branding and management services" className="bg-cream px-8 py-12 md:py-16 lg:px-[8.766%] lg:py-[9.42%]">
      {/* lg+: Figma spacing — 139.55px side margins, two 628.455 x 782.425 cards
          (exact Figma vectors) 57.45px apart, 150px below the NACS banner and
          150px above the Projects frame. Each ribbon overhangs its card's right
          edge by ~40px. */}
      <ul className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-[clamp(2.5rem,4.5vw,4.5rem)] lg:max-w-none lg:gap-x-[4.376%]">
        {cards.map((card) => (
          <li key={card.id} id={card.id} className="@container mx-auto w-full max-w-[560px] md:max-w-none">
            <SpecialtyCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
