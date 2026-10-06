import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { HeadquartersSection } from "@/components/contact/HeadquartersSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { contactPage, footer, headquarters } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Contact us — StoreMaker",
  description: "Start your c-store, truck stop or grocery project with T Lines Store Maker. Reach our Atlanta, Phoenix and Milford offices.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream">
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact us", path: "/contact" }])} />
        <ReferenceTopBar />
        <ContactHero
          heading={contactPage.heading}
          image={contactPage.heroImage}
          mascot={contactPage.mascot}
          intro={contactPage.intro}
        />
        <HeadquartersSection heading={contactPage.visitHeading} offices={headquarters} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
