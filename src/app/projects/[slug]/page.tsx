import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectHeroCarousel } from "@/components/projects/ProjectHeroCarousel";
import { cardTone, toneOfCategory } from "@/components/projects/projectTone";
import {
  footer,
  getStarted,
  projectCategories,
  projectDetailType,
} from "@/lib/content";
import { getGalleryProjects, getProject } from "@/lib/projects";

// Project detail page (Figma "Projects" frame, node 261:7803). Projects added
// from the ERP (Supabase) render their own title, meta and body sections; the
// static gallery photos in src/lib/content.ts keep the placeholder template.
export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getGalleryProjects();
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project ? { title: `${project.title} — StoreMaker` } : {};
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [project, galleryProjects] = await Promise.all([getProject(slug), getGalleryProjects()]);
  if (!project) notFound();

  const tone = toneOfCategory(project.category, projectCategories);
  const topBarTone = tone === "gold" ? undefined : tone;
  const frame = cardTone[tone];

  const heroPhotos = project.photos;

  const alsoCheckOut = galleryProjects.filter((item) => item.id !== project.id).slice(0, 2);

  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar tone={topBarTone} />

        <div className="px-6 pt-[104px] sm:px-10 lg:px-[8.73%] lg:pt-[calc(var(--u)*104)]">
          <ProjectHeroCarousel photos={heroPhotos} />

          {(
            <>
              <h1 className="mt-8 font-display text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-[0.97] tracking-[-0.01em] text-forest lg:mt-[calc(var(--u)*52)]">
                {project.title}
              </h1>

              {/* Meta bar (Figma node 274:8160): location / type / date, each with an
                  icon above a 16px label and a 22px value, separated by hairlines. */}
              <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-forest/10 bg-white/40 p-5 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-forest/15 lg:mt-[calc(var(--u)*36)] lg:rounded-[calc(var(--u)*16)] lg:p-[calc(var(--u)*20)]">
                {[
                  { icon: "/images/figma/project-meta-location.svg", label: "Location:", value: project.location },
                  { icon: "/images/figma/project-meta-type.svg", label: "Type:", value: project.projectType || projectDetailType[project.category] },
                  { icon: "/images/figma/project-meta-date.svg", label: "Date:", value: project.year ? String(project.year) : "" },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                  <div key={item.label} className="flex items-center gap-3 sm:flex-1 sm:justify-center sm:px-4">
                    <Image src={item.icon} alt="" width={50} height={50} unoptimized className="size-9 shrink-0 lg:size-[calc(var(--u)*50)]" />
                    <div>
                      <p className="text-sm text-forest/70">{item.label}</p>
                      <p className="font-display text-lg font-semibold text-forest lg:text-[calc(var(--u)*22)]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Body sections from the ERP: a section with a photo is text + photo
                  (side alternates), one without is a full-width text block. */}
              {project.sections.map((section, index) => {
                const imageIndex = project.sections.slice(0, index).filter((item) => item.image).length;
                const text = (
                  <div className={`flex flex-col gap-4 text-forest lg:gap-[calc(var(--u)*18)] ${section.image ? "lg:w-[52%]" : ""}`}>
                    {section.heading && <h2 className="font-display text-2xl font-bold tracking-[-0.01em] lg:text-[calc(var(--u)*32)]">{section.heading}</h2>}
                    <p className="whitespace-pre-line text-justify leading-relaxed lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*35)]">{section.body}</p>
                  </div>
                );
                if (!section.image) return <div key={index} className="mt-14 lg:mt-[calc(var(--u)*80)]">{text}</div>;
                return (
                  <div
                    key={index}
                    className={`mt-14 flex flex-col items-center gap-8 lg:mt-[calc(var(--u)*80)] lg:gap-[calc(var(--u)*60)] ${imageIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {text}
                    <div className={`relative aspect-[504/538] w-full overflow-hidden rounded-2xl border-2 lg:w-[38%] lg:rounded-[16px] ${frame.frame}`}>
                      <Image src={section.image} alt={section.imageAlt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* "Also check out" (Figma node 337:6394): two other gallery cards in
                  their own category colour. */}
          <div className="mt-16 pb-16 lg:mt-[calc(var(--u)*110)] lg:pb-[calc(var(--u)*70)]">
            <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-forest lg:text-[calc(var(--u)*40)]">Also check out:</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-[calc(var(--u)*44)] lg:gap-[calc(var(--u)*40)]">
              {alsoCheckOut.map((other) => {
                const otherTone = cardTone[toneOfCategory(other.category, projectCategories)];
                return (
                  <li key={other.id} className="@container">
                    <Link
                      href={`/projects/${other.id}`}
                      aria-label={`${other.alt}, ${other.location}: view project`}
                      className="group relative block w-full text-left outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
                    >
                      <span className={`relative block aspect-[637/407] overflow-hidden rounded-[8px] border-4 ${otherTone.frame}`}>
                        <Image
                          src={other.image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 45vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </span>
                      <span className="absolute -bottom-[5.3cqw] -left-[3.5cqw] isolate flex aspect-[320/64] w-[50.2cqw] items-center pb-[0.6cqw] pl-[6.2cqw]">
                        <Image src={otherTone.label} alt="" fill unoptimized className="-z-10" />
                        <span className={`font-display text-[clamp(11px,2.83cqw,18px)] font-bold uppercase tracking-[0.06em] ${otherTone.text}`}>
                          {other.location}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
