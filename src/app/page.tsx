import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { PromoCardsSection } from "@/components/sections/PromoCardsSection";
import { BrandingShowcaseSection } from "@/components/sections/BrandingShowcaseSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import {
  navItems,
  contactAction,
  startProjectAction,
  logo,
  hero,
  promoCards,
  brandingShowcase,
  featuredProjects,
  contactCTAs,
  footer,
} from "@/lib/content";

export default function StoreMakerPage() {
  return (
    <>
      {/* SiteHeader is an absolute overlay, so it needs this relative
          wrapper around itself and the hero to lay over the hero photo. */}
      <div className="relative">
        <SiteHeader
          navItems={navItems}
          logo={logo}
          contactAction={contactAction}
          primaryAction={startProjectAction}
          activePath="/"
        />

        <HeroSection
          eyebrow={hero.eyebrow}
          heading={hero.heading}
          backgroundImage={hero.backgroundImage}
          primaryAction={hero.primaryAction}
        />
      </div>

      <PromoCardsSection cards={promoCards} />

      <BrandingShowcaseSection
        heading={brandingShowcase.heading}
        verticalLabel={brandingShowcase.verticalLabel}
        slides={brandingShowcase.slides}
      />

      <FeaturedProjectsSection
        title={featuredProjects.title}
        photos={featuredProjects.photos}
        tourHeading={featuredProjects.tourHeading}
      />

      <ContactCTASection cards={contactCTAs} />

      <SiteFooter
        logo={footer.logo}
        goldMembersHeading={footer.goldMembersHeading}
        emailAction={footer.emailAction}
        followLabel={footer.followLabel}
        columns={footer.columns}
        callUsHeading={footer.callUsHeading}
        phoneNumbers={footer.phoneNumbers}
        copyright={footer.copyright}
      />
    </>
  );
}
