"use client";

import { useState } from "react";
import type { BlogCategoryId, BlogPost } from "@/lib/content";
import { Pager } from "@/components/primitives/Pager";
import { BlogCard } from "./BlogCard";

export interface BlogIndexProps {
  posts: BlogPost[];
  categories: readonly { id: BlogCategoryId; label: string }[];
  pageSize: number;
}

type Filter = BlogCategoryId | "all";

/**
 * Category filter bar, 3-column card grid and pager of the Blog frame
 * (1592 wide: pills 42 tall at y+66, cards 403 wide from x=139 with 51/36px
 * gaps; pager 60px under the grid with 32px top padding, 80px above the footer).
 */
export function BlogIndex({ posts, categories, pageSize }: BlogIndexProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const filtered = filter === "all" ? posts : posts.filter((post) => post.category === filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const labelOf = (id: BlogCategoryId) => categories.find((category) => category.id === id)?.label ?? id;

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: posts.length },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      count: posts.filter((post) => post.category === category.id).length,
    })),
  ];

  function choose(next: Filter) {
    setFilter(next);
    setPage(1);
  }

  return (
    <>
      <div className="border-b border-sage/40 px-6 py-8 sm:px-10 lg:px-[8.73%] lg:pb-[calc(var(--u)*40)] lg:pt-[calc(var(--u)*45)]">
        <ul aria-label="Filter posts by category" className="flex flex-wrap gap-2.5 lg:gap-[calc(var(--u)*18)]">
          {filters.map((item) => {
            const active = item.id === filter;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => choose(item.id)}
                  aria-pressed={active}
                  className={`inline-flex h-9 items-center gap-2 rounded-[6px] px-3.5 font-display text-[12px] font-semibold uppercase tracking-[0.5px] text-cream transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral lg:h-[calc(var(--u)*42)] lg:gap-[calc(var(--u)*10)] lg:rounded-[calc(var(--u)*8)] lg:px-[calc(var(--u)*20)] lg:text-[max(12px,calc(var(--u)*14))] ${
                    active ? "bg-coral" : "bg-forest hover:bg-sage-dark"
                  }`}
                >
                  {item.label}
                  <span className="grid min-w-[1.6em] place-items-center rounded-full bg-cream/25 px-1.5 text-[0.85em] leading-[1.6]">
                    {item.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-6 pt-10 sm:px-10 lg:px-[8.73%] lg:pt-[calc(var(--u)*66)]">
        <p className="sr-only" aria-live="polite">
          {`Showing ${visible.length} of ${filtered.length} posts`}
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[calc(var(--u)*51)] lg:gap-y-[calc(var(--u)*36)]">
          {visible.map((post, index) => (
            <li key={post.slug}>
              <BlogCard post={post} categoryLabel={labelOf(post.category)} tone={index % 2 === 0 ? "forest" : "sage"} />
            </li>
          ))}
        </ul>

        <Pager
          label="Blog pages"
          page={page}
          pageCount={pageCount}
          onChange={setPage}
          className="mt-12 lg:mt-[calc(var(--u)*60)] lg:pt-[calc(var(--u)*32)]"
        />
      </div>
    </>
  );
}
