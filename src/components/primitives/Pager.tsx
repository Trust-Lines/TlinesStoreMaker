import Image from "next/image";

export interface PagerProps {
  /** Accessible name of the nav, e.g. "Blog pages". */
  label: string;
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
}

/**
 * Figma pager (Blog / Projects frames): 72 x 41 arrow shapes (Group 455 / 456,
 * previous greyed at 40% when unavailable), the current page as a 38 x 41 coral
 * tile and the others as 41 x 41 forest outlines, 12px apart. Spacing around it
 * (60px above, 32px top padding) is set by the caller via `className`.
 */
export function Pager({ label, page, pageCount, onChange, className = "" }: PagerProps) {
  return (
    <nav aria-label={label} className={`flex items-center justify-center gap-2.5 lg:gap-[calc(var(--u)*12)] ${className}`}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:opacity-40"
      >
        <Image src="/images/blog/page-prev.svg" alt="" width={72} height={41} unoptimized className="h-[34px] w-auto lg:h-[max(34px,calc(var(--u)*41))]" />
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => {
        const current = number === page;
        return (
          <button
            key={number}
            type="button"
            onClick={() => onChange(number)}
            aria-current={current ? "page" : undefined}
            aria-label={`Page ${number}`}
            className={`grid h-[34px] place-items-center rounded-[7px] font-display text-[13px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral lg:h-[max(34px,calc(var(--u)*41))] lg:rounded-[calc(var(--u)*8)] lg:text-[max(12px,calc(var(--u)*14))] ${
              current
                ? "w-[32px] bg-coral text-cream lg:w-[max(32px,calc(var(--u)*38))]"
                : "w-[34px] border border-forest text-forest hover:bg-forest hover:text-cream lg:w-[max(34px,calc(var(--u)*41))]"
            }`}
          >
            {number}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className="transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:opacity-40"
      >
        <Image src="/images/blog/page-next.svg" alt="" width={72} height={41} unoptimized className="h-[34px] w-auto lg:h-[max(34px,calc(var(--u)*41))]" />
      </button>
    </nav>
  );
}
