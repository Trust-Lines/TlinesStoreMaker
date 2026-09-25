import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { HeadquartersSection } from "@/components/contact/HeadquartersSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { contactPage, footer, headquarters } from "@/lib/content";

export const metadata: Metadata = { title: "Contact us — StoreMaker" };

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream">
        <ReferenceTopBar />
        <ContactHero
          heading={contactPage.heading}
          image={contactPage.heroImage}
          mascot={contactPage.mascot}
          intro={contactPage.intro}
          email={contactPage.email}
        />
        <HeadquartersSection heading={contactPage.visitHeading} offices={headquarters} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
