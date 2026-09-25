import Link from "next/link";

/** Gold category ribbon (Figma vector 169 x 33) used on blog and project cards. */
export function TagRibbon({ label }: { label: string }) {
  return (
    <span className="relative isolate inline-flex aspect-[169/33] w-[132px] items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.04em] text-forest lg:w-[max(132px,calc(var(--u)*150))] lg:text-[max(10px,calc(var(--u)*11))]">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-gold [mask-repeat:no-repeat] [mask-size:100%_100%]"
        style={{ maskImage: "url(/images/blog/tag-ribbon.svg)", WebkitMaskImage: "url(/images/blog/tag-ribbon.svg)" }}
      />
      {label}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

/**
 * Author (initials avatar + name; Montserrat 14 semibold, 0.5px tracking, cream)
 * on the left, coral "Read more ›" (Montserrat 13 bold) on the right.
 */
export function PostByline({ author, href, linkLabel }: { author: string; href: string; linkLabel: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 font-display text-[13px] font-semibold tracking-[0.5px] text-cream lg:text-[max(13px,calc(var(--u)*14))]">
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center rounded-full bg-cream text-[10px] font-bold text-forest lg:h-[calc(var(--u)*30)] lg:w-[calc(var(--u)*30)] lg:text-[max(10px,calc(var(--u)*11))]"
        >
          {initials(author)}
        </span>
        {author}
      </span>
      <Link
        href={href}
        aria-label={linkLabel}
        className="font-display text-[12px] font-bold uppercase text-coral hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold lg:text-[max(12px,calc(var(--u)*13))]"
      >
        Read more <span aria-hidden>›</span>
      </Link>
    </div>
  );
}
