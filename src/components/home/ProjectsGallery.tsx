import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProjectsGrid, type ProjectPhoto } from "./ProjectsGrid";

export interface ProjectsGalleryProps {
  title: string;
  photos: ProjectPhoto[];
  tours: {
    heading: string;
    tours: { id: string; title: string; image: string; href: string }[];
  };
}

export function ProjectsGallery({ title, photos, tours }: ProjectsGalleryProps) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-cream py-12 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-[1592px] px-4 sm:px-6 lg:px-0">
        <h2
          id="projects-heading"
          className="shape-chamfered relative z-10 mx-auto -mb-6 w-fit bg-forest px-10 py-3 font-accent text-[clamp(1.75rem,3.2vw,3.1rem)] font-bold tracking-[0.2em] text-cream sm:-mb-8 sm:px-16 sm:py-4"
          style={{ "--chamfer": "14px" } as CSSProperties}
        >
          {title}
        </h2>

        <ProjectsGrid photos={photos} />
      </div>

      <p className="mt-8 bg-sage px-6 py-4 text-center font-display text-[clamp(1.15rem,2vw,1.9rem)] font-bold text-forest md:mt-10 md:py-5">
        {tours.heading}
      </p>

      {/* Tours: swipeable row on small screens, even five-up row on desktop. */}
      <ul className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {tours.tours.map((tour) => (
          <li key={tour.id} className="w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
            <Link
              href={tour.href}
              className="group block outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
            >
              <span
                className="shape-chamfered relative block aspect-[317/200] overflow-hidden"
                style={{ "--chamfer": "18px" } as CSSProperties}
              >
                <Image src={tour.image} alt="" fill sizes="(min-width: 1024px) 20vw, 72vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <Image
                  src="/images/figma/project-badge-icon-b.svg"
                  alt=""
                  width={72}
                  height={72}
                  unoptimized
                  className="absolute left-1/2 top-1/2 w-[22%] -translate-x-1/2 -translate-y-1/2"
                />
              </span>
              <span className="sr-only">{tour.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
