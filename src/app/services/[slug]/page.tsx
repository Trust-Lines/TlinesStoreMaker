import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { footer, serviceCards } from "@/lib/content";

// Service detail pages for the three homepage store-type cards
// (/services/c-store, /services/truck-stops, /services/grocery).
// There's no Figma design for these yet, so the page reuses the card's own
// content and brand styling until a dedicated design lands.

export function generateStaticParams() {
  return serviceCards.map((card) => ({ slug: card.id }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const card = serviceCards.find((item) => item.id === slug);
  return card ? { title: `${card.title} — StoreMaker` } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const card = serviceCards.find((item) => item.id === slug);
  if (!card) notFound();

  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-16 pt-[var(--header-h)]">
        <ReferenceTopBar />

        <section aria-labelledby="service-heading" className="px-5 pt-10 sm:px-8 lg:px-[9.51%] lg:pt-16">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-forest hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
          >
            <span aria-hidden>←</span> All services
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="shape-chamfered relative aspect-[4/3] overflow-hidden" style={{ "--chamfer": "18px" } as CSSProperties}>
              <Image src={card.image} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>

            <div>
              <h1
                id="service-heading"
                className={`inline-block px-8 py-3 font-accent text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[1.2] ${card.ribbonClass} [mask-repeat:no-repeat] [mask-size:100%_100%]`}
                style={{ maskImage: `url(${card.ribbonShape})`, WebkitMaskImage: `url(${card.ribbonShape})` }}
              >
                {card.title}
              </h1>
              <ul className="mt-6 list-none space-y-1 font-display text-[clamp(1.05rem,1.5vw,1.4rem)] leading-snug text-forest">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="relative pl-5 before:absolute before:left-0 before:content-['•']">
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className="relative isolate mt-8 inline-flex aspect-[338/67] w-[clamp(220px,21vw,300px)] items-center justify-center text-sm font-bold text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral sm:text-base"
              >
                <Image src="/images/figma/ribbon-service.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />
                Start Your Project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
