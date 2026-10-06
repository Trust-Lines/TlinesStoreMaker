import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/BlogHero";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { footer, getStarted, projectCategories, projectsPage } from "@/lib/content";
import { getGalleryProjects } from "@/lib/projects";
import { getSetting } from "@/lib/settings";

export const metadata: Metadata = pageMetadata({
  title: "Projects — StoreMaker",
  description: "Completed c-store, truck stop and grocery projects by T Lines Store Maker: store layouts, fixtures, branding and installation.",
  path: "/projects",
});

// Projects are managed from the ERP; refresh the list at most once a minute
// (the ERP can also hit /api/revalidate for an instant update).
export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, header] = await Promise.all([
    getGalleryProjects(),
    getSetting<{ eyebrow: string; heading: string; description: string; hero_image_url: string; hero_image_alt: string }>("projects_page"),
  ]);
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
        <ReferenceTopBar />
        <BlogHero
          eyebrow={header?.eyebrow || projectsPage.eyebrow}
          heading={header?.heading || projectsPage.heading}
          description={header?.description ?? projectsPage.description}
          image={header?.hero_image_url || projectsPage.heroImage}
          headingId="projects-heading"
        />
        <ProjectGallery projects={projects} categories={projectCategories} />
        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
