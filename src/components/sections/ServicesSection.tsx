import Link from "next/link";
import type { CSSProperties } from "react";
import { SectionShell } from "@/components/primitives/SectionShell";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShapedMedia } from "@/components/primitives/ShapedMedia";
import { VirtualToursSection, type VirtualToursSectionProps } from "./VirtualToursSection";

export interface ServiceStep {
  number: number;
  title: string;
  image: string;
  href?: string;
}

export interface ServicesSectionProps {
  title: string;
  steps: ServiceStep[];
  virtualTours: VirtualToursSectionProps;
}

function formatStepNumber(n: number) {
  return String(n).padStart(2, "0");
}

export function ServicesSection({ title, steps, virtualTours }: ServicesSectionProps) {
  return (
    <SectionShell tone="cream" spacing="lg">
      <SectionHeading title={title} />

      <ol className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {steps.map((step, index) => {
          const labelTop = index < 4;
          const label = (
            <span className="flex items-baseline gap-2 px-2 py-2 text-cream">
              <span className="font-display text-lg font-bold">{formatStepNumber(step.number)}</span>
              <span className="text-sm font-medium">{step.title}</span>
            </span>
          );
          const photo = (
            <ShapedMedia
              src={step.image}
              alt=""
              aspectRatio="1 / 1"
              shape="chamfered"
              chamfer={10}
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          );
          const frame = (
            <div
              className="shape-chamfered flex flex-col bg-forest p-2 transition-transform hover:-translate-y-1"
              style={{ "--chamfer": "15px" } as CSSProperties}
            >
              {labelTop ? label : photo}
              {labelTop ? photo : label}
            </div>
          );
          return (
            <li key={step.number}>
              {step.href ? (
                <Link
                  href={step.href}
                  className="block rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
                >
                  {frame}
                </Link>
              ) : (
                frame
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-12 md:mt-16">
        <VirtualToursSection {...virtualTours} />
      </div>
    </SectionShell>
  );
}
