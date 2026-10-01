import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { footer } from "@/lib/content";

export const metadata: Metadata = { title: "Page not found — StoreMaker" };

/**
 * 404 page (Figma "Error Page", node 616:7041, 1592 wide). Under the shared top
 * bar: the store-interior photo, a cream sign hanging on two green cords with
 * "ERROR 404" / "PAGE NOT FOUND" and the coral "Back to Homepage" button, and the
 * T Lines mascot scratching his head beside the stacked boxes. The sign is one
 * unit sized from the Figma 551 x 608 artwork; its text and button are placed in
 * container-query units so the whole sign scales together. The shared footer
 * sits below (the hero is the frame's 1013px tall and grows to fill taller windows).
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative flex flex-1 flex-col bg-cream">
        <ReferenceTopBar />

        <section aria-labelledby="not-found-heading" className="relative isolate min-h-[680px] flex-1 overflow-hidden bg-forest-dark lg:min-h-[calc(var(--u)*1013)]">
          <Image src="/images/404/bg.webp" alt="" fill priority sizes="(min-width: 1592px) 1592px, 100vw" className="-z-10 object-cover" />

          {/* Sign: cords + board (551.23 x 607.9 at x=530, y=-35 in the frame). */}
          <div className="absolute left-1/2 top-0 aspect-[551.23/607.9] w-[clamp(320px,calc(var(--u)*551.23),551.23px)] -translate-x-1/2 [container-type:inline-size] lg:top-[calc(var(--u)*-35)]">
            <Image src="/images/404/sign.svg" alt="" fill unoptimized className="pointer-events-none" />

            <h1
              id="not-found-heading"
              className="absolute left-[48.3%] top-[71.9%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-[11.61cqw] font-bold uppercase leading-none tracking-[-0.03em] text-[#2e4539]"
            >
              Error 404
            </h1>
            <p className="absolute left-[48.3%] top-[80.5%] -translate-x-1/2 -translate-y-1/2 -rotate-[0.55deg] whitespace-nowrap text-center font-display text-[4.35cqw] font-medium uppercase leading-none tracking-[-0.03em] text-[#2e4539]">
              Page not found
            </p>

            <Link
              href="/"
              className="absolute left-[24.2%] top-[85.4%] isolate block aspect-[265.2/49.9] w-[48.1%] text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              <Image src="/images/404/button.svg" alt="" fill unoptimized className="-z-10 -scale-x-100" />
              <Image src="/images/404/arrow.svg" alt="" width={31} height={31} unoptimized className="absolute left-[9.4%] top-[19.6%] h-auto w-[11.7%]" />
              <span className="absolute left-[57.1%] top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[max(11px,2.72cqw)] font-bold uppercase leading-none">
                Back to Homepage
              </span>
            </Link>
          </div>

          {/* Mascot 382 x 471 at x=277, ending 57px above the hero's bottom; soft floor shadow underneath. */}
          <div className="absolute bottom-[5.6%] left-[max(17.4%,4%)] aspect-[382.24/470.85] w-[max(24%,200px)]">
            <Image src="/images/404/shadow.svg" alt="" width={342} height={42} unoptimized className="pointer-events-none absolute left-[1.6%] top-[92.1%] h-auto w-[89.5%]" />
            <Image src="/images/404/beaver.webp" alt="T Lines mascot in a hard hat scratching his head" fill sizes="(min-width: 1592px) 382px, 24vw" className="object-cover object-top" />
          </div>
        </section>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
