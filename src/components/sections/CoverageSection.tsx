import { SectionShell } from "@/components/primitives/SectionShell";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CoverageCarousel, type CoverageSlide } from "./CoverageCarousel";

export interface CoverageSectionProps {
  slides: CoverageSlide[];
  initialIndex?: number;
}

export function CoverageSection({ slides, initialIndex }: CoverageSectionProps) {
  return (
    <SectionShell tone="forest" spacing="lg" edgeTop edgeBottom>
      <SectionHeading title="What we cover" tone="light" />
      <div className="mt-12">
        <CoverageCarousel slides={slides} initialIndex={initialIndex} />
      </div>
    </SectionShell>
  );
}
