import Image from "next/image";
import Link from "next/link";

export interface ContactCTACardData {
  id: string;
  title: string;
  description: string;
  action: { label: string; href: string };
  buttonShape: string;
}

export interface ContactCTASectionProps {
  cards: ContactCTACardData[];
}

export function ContactCTASection({ cards }: ContactCTASectionProps) {
  return (
    <section className="flex min-h-[420px] items-center bg-cream px-[clamp(24px,8.5vw,136px)] py-[clamp(40px,4.6vw,74px)] md:h-[441px]">
      <div className="mx-auto grid h-full w-full max-w-[1320px] grid-cols-1 gap-3 sm:grid-cols-[1.9fr_1fr]">
        {cards.map((card, index) => (
          <article
            key={card.id}
            className={`flex h-full flex-col justify-center px-[clamp(28px,4vw,64px)] text-cream ${index === 0 ? "bg-forest" : "bg-sage-dark"}`}
            style={{
              clipPath:
                index === 0
                  ? "polygon(7% 0,94% 3%,100% 17%,99% 85%,94% 97%,7% 100%,0 83%,0 17%)"
                  : "polygon(8% 4%,89% 0,100% 18%,100% 83%,87% 100%,9% 96%,0 82%,0 17%)",
            }}
          >
            <h3 className="font-display text-[clamp(22px,2vw,32px)] font-semibold">{card.title}</h3>
            <p className="mt-3 max-w-[520px] text-[clamp(12px,1vw,16px)] font-light leading-[1.35] text-cream/90">{card.description}</p>
            <Link
              href={card.action.href}
              className="relative mt-5 inline-flex h-[54px] w-[188px] items-center justify-center text-sm font-bold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              <Image src={card.buttonShape} alt="" fill unoptimized priority className="pointer-events-none -z-10" />
              {card.action.label}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
