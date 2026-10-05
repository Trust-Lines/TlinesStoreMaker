import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import { AboutExhibitors, AboutHero, AboutMission, AboutPartners, AboutVision } from "@/components/about/AboutSections";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { aboutPage, footer, getStarted } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "About us — StoreMaker",
  description: "Meet T Lines Store Maker, the team that designs, builds and installs c-stores, truck stops and grocery stores across the United States.",
  path: "/about",
});

export default function AboutPage() {
  const { hero, exhibitors, mission, vision, partners } = aboutPage;
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About us", path: "/about" }])} />
        <ReferenceTopBar />
        <AboutHero {...hero} />
        {/* Hidden for now (kept for later): <AboutStory {...story} /> */}
        <AboutExhibitors {...exhibitors} />
        <AboutMission {...mission} />
        <AboutVision {...vision} />
        {/* Hidden for now (kept for later): <AboutTestimonials {...testimonials} /> */}
        <AboutPartners {...partners} />
        <div className="pt-[3.08%]">
          <GetStartedSection {...getStarted} />
        </div>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
