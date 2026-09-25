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
    <section className="flex min-h-[420px] items-center bg-cream px-[clamp(24px,8.5vw,136px)] py-[clamp(40px,4.4vw,70px)] md:h-[441px]">
      <div className="mx-auto grid h-full w-full max-w-[1320px] grid-cols-1 gap-3 sm:grid-cols-[862.609fr_445.391fr]">
        {cards.map((card, index) => (
          <article
            key={card.id}
            className={`relative isolate flex flex-col justify-center px-[clamp(28px,4vw,64px)] text-cream ${index === 0 ? "h-full" : "h-[93.355%] self-center"}`}
          >
            {index === 0 ? (
              <svg aria-hidden viewBox="0 0 863 301" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
                <path d="M862.547 64.1709V218.993C862.547 223.556 860.691 227.931 857.388 231.078L818.352 268.374C815.427 271.175 811.558 272.811 807.5 273L69.3588 300.986C64.8292 301.174 60.3941 299.506 57.1228 296.391L5.15861 246.758C1.85581 243.61 0 239.236 0 234.672V65.4423C0 60.9102 1.85588 56.5669 5.12722 53.4196L55.6757 4.66802C58.9156 1.5522 63.2566 -0.147329 67.7547 0.0100358L813.728 16.3006C817.849 16.4265 821.812 18.0631 824.8 20.9271L857.451 52.1483C860.754 55.2956 862.609 59.6703 862.609 64.2338L862.547 64.1709Z" fill="#2E4437" />
              </svg>
            ) : (
              <svg
                aria-hidden
                viewBox="0 0 445 281"
                fill="none"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
                style={{ transform: "scaleX(-1)", transformOrigin: "center" }}
              >
                <path d="M0.0627441 54.1707V208.993C0.0627441 213.556 1.91852 217.931 5.22131 221.078L44.2574 258.374C47.1827 261.175 51.0516 262.811 55.1094 263L375.141 280.986C379.671 281.174 384.106 279.506 387.377 276.391L439.341 226.758C442.644 223.61 444.5 219.236 444.5 214.672V65.4423C444.5 60.9102 442.644 56.5669 439.373 53.4196L388.824 4.66801C385.584 1.5522 381.243 -0.147329 376.745 0.0100358L48.8814 6.30042C44.7608 6.42631 40.7973 8.0629 37.809 10.9269L5.15839 42.1481C1.85559 45.2954 0 49.6701 0 54.2337L0.0627441 54.1707Z" fill="#547255" />
              </svg>
            )}
            <h3 className="font-accent text-[clamp(22px,2vw,32px)] font-semibold">{card.title}</h3>
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
