"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryProject, ProjectCategoryId } from "@/lib/content";
import { PhotoLightbox } from "./PhotoLightbox";

type Tone = "gold" | "coral" | "sage";

export interface ProjectGalleryProps {
  projects: GalleryProject[];
  categories: readonly { id: ProjectCategoryId; label: string; tone: Tone }[];
}

type Filter = ProjectCategoryId | "all";

/** Figma "Category Pill" colourways (41px tall, radius 8, count badge on the right). */
const pillTone: Record<Tone | "all", { pill: string; badge: string }> = {
  all: { pill: "bg-forest text-cream", badge: "bg-cream text-forest" },
  gold: { pill: "border border-cream bg-gold text-sage-dark", badge: "bg-sage-dark text-cream" },
  coral: { pill: "border border-cream bg-coral text-cream", badge: "bg-cream text-coral" },
  sage: { pill: "border border-cream bg-sage-dark text-cream", badge: "bg-cream text-sage-dark" },
};

/** Card frame colour + location ribbon (Figma 320 x 64 vectors, cream 5px outline baked in). */
const cardTone: Record<Tone, { frame: string; label: string; text: string }> = {
  gold: { frame: "border-gold", label: "/images/projects-gallery/label-gold.svg", text: "text-sage-dark" },
  coral: { frame: "border-coral", label: "/images/projects-gallery/label-coral.svg", text: "text-cream" },
  sage: { frame: "border-sage-dark", label: "/images/projects-gallery/label-sage.svg", text: "text-cream" },
};

/**
 * Projects gallery (Figma "Projects" frame, 1592 wide): category pills 46px
 * under the hero over a divider, then a 2-column grid of 637 x 407 photo cards
 * (139px / 134px side margins, 45px column gap), each framed in its category
 * colour with a "STATE, USA" ribbon hanging off its bottom-left corner.
 * Clicking a card opens the photo viewer over the filtered set.
 */
export function ProjectGallery({ projects, categories }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const toneOf = (id: ProjectCategoryId) => categories.find((category) => category.id === id)?.tone ?? "sage";
  const labelOf = (id: ProjectCategoryId) => categories.find((category) => category.id === id)?.label ?? id;
  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  const pills: { id: Filter; label: string; tone: Tone | "all"; count: number }[] = [
    { id: "all", label: "All", tone: "all", count: projects.length },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      tone: category.tone,
      count: projects.filter((project) => project.category === category.id).length,
    })),
  ];

  return (
    <>
      <div className="border-b border-sage/40 px-6 py-8 sm:px-10 lg:pb-[calc(var(--u)*40)] lg:pl-[8.73%] lg:pr-[8.42%] lg:pt-[calc(var(--u)*46)]">
        <ul aria-label="Filter projects by store type" className="flex flex-wrap gap-2.5 lg:gap-[calc(var(--u)*12)]">
          {pills.map((pill) => {
            const active = pill.id === filter;
            const tone = pillTone[pill.tone];
            return (
              <li key={pill.id}>
                <button
                  type="button"
                  onClick={() => setFilter(pill.id)}
                  aria-pressed={active}
                  className={`inline-flex h-10 items-center gap-2.5 rounded-[8px] px-4 font-display text-[13px] font-semibold transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral lg:h-[max(36px,calc(var(--u)*41))] lg:px-[max(14px,calc(var(--u)*20))] lg:text-[max(13px,calc(var(--u)*14))] ${
                    pill.id === "all" ? "uppercase" : ""
                  } ${tone.pill} ${active ? "ring-2 ring-forest ring-offset-2 ring-offset-cream" : "hover:opacity-90"}`}
                >
                  {pill.label}
                  <span className={`grid h-4 min-w-[19px] place-items-center rounded-full px-1.5 text-[10px] font-bold leading-none ${tone.badge}`}>
                    {pill.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-6 pb-20 pt-10 sm:px-10 lg:pb-[calc(var(--u)*120)] lg:pl-[8.73%] lg:pr-[8.42%] lg:pt-[calc(var(--u)*40)]">
        <p className="sr-only" aria-live="polite">
          {`Showing ${visible.length} ${filter === "all" ? "" : `${labelOf(filter)} `}projects`}
        </p>
        <ul className="mx-auto grid max-w-[560px] gap-x-6 gap-y-14 sm:max-w-none sm:grid-cols-2 lg:gap-x-[calc(var(--u)*45)] lg:gap-y-[calc(var(--u)*90)]">
          {visible.map((project, index) => {
            const tone = cardTone[toneOf(project.category)];
            return (
              <li key={project.id} className="@container">
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-haspopup="dialog"
                  aria-label={`${project.alt}, ${project.location}: view photo`}
                  className="group relative block w-full text-left outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
                >
                  <span className={`relative block aspect-[637/407] overflow-hidden rounded-[16px] border-2 ${tone.frame}`}>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  {/* Ribbon: 320 x 64 at -22px left, straddling the card's bottom edge. */}
                  <span className="absolute -bottom-[5.3cqw] -left-[3.5cqw] isolate flex aspect-[320/64] w-[50.2cqw] items-center pb-[0.6cqw] pl-[6.2cqw]">
                    <Image src={tone.label} alt="" fill unoptimized className="-z-10" />
                    <span className={`font-display text-[clamp(11px,2.83cqw,18px)] font-bold uppercase tracking-[0.06em] ${tone.text}`}>
                      {project.location}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <PhotoLightbox
        photos={visible.map((project) => ({ id: project.id, image: project.image, alt: `${project.alt} (${project.location})` }))}
        index={open}
        onChange={setOpen}
      />
    </>
  );
}
