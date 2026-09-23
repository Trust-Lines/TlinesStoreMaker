import { SectionShell } from "@/components/primitives/SectionShell";

export interface StatItem {
  id: string;
  value: string;
  suffix?: string;
  label: string;
}

export interface StatsSectionProps {
  items: StatItem[];
}

export function StatsSection({ items }: StatsSectionProps) {
  return (
    <SectionShell tone="cream" spacing="sm">
      <dl className="flex flex-wrap justify-center gap-x-12 gap-y-8">
        {items.map((item) => (
          <div key={item.id} className="flex min-w-[9rem] flex-1 flex-col items-center text-center">
            <dd className="font-display text-4xl font-semibold text-forest md:text-5xl">
              {item.value}
              {item.suffix}
            </dd>
            <dt className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink/60">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}
