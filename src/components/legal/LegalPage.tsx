import { JsonLd } from "@/components/seo/JsonLd";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { footer } from "@/lib/content";
import type { LegalDocument } from "@/lib/legal";
import { breadcrumbJsonLd } from "@/lib/site";

/** Shared layout for the Privacy Policy, Terms of Service and Cookie Policy pages. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  const path = `/${doc.slug}`;
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative flex-1 bg-cream">
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: doc.title, path }])} />
        <ReferenceTopBar />

        <article
          aria-labelledby="legal-heading"
          className="mx-auto w-full max-w-[860px] px-6 pb-20 pt-[128px] text-forest sm:px-10 sm:pt-[170px] lg:max-w-[calc(var(--u)*900)] lg:px-0 lg:pb-[calc(var(--u)*160)] lg:pt-[calc(var(--u)*220)]"
        >
          <h1
            id="legal-heading"
            className="font-display text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] lg:text-[max(2.25rem,calc(var(--u)*64))]"
          >
            {doc.title}
          </h1>
          <span aria-hidden className="mt-5 block h-1.5 w-24 rounded-full bg-coral lg:mt-[calc(var(--u)*28)] lg:h-[calc(var(--u)*8)] lg:w-[calc(var(--u)*120)]" />
          <p className="mt-6 text-[17px] leading-relaxed text-forest/90 lg:mt-[calc(var(--u)*36)] lg:text-[max(16px,calc(var(--u)*21))]">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.heading} className="mt-10 lg:mt-[calc(var(--u)*56)]">
              <h2 className="font-display text-[22px] font-bold leading-snug lg:text-[max(20px,calc(var(--u)*30))]">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-[16px] leading-relaxed text-forest/85 lg:mt-[calc(var(--u)*16)] lg:text-[max(15px,calc(var(--u)*19))]">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul className="list-disc space-y-2 pl-6 marker:text-coral">
                    {section.items.map((item) => (
                      <li key={item.text}>
                        {item.label && <strong className="font-semibold text-forest">{item.label} </strong>}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </article>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
