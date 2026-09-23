import Link from "next/link";
import { type ReactElement, type ReactNode } from "react";
import type { ShapedMediaProps } from "./ShapedMedia";

export interface ImageCardFrameProps {
  media: ReactElement<ShapedMediaProps>;
  labelPosition?: "top" | "bottom";
  href?: string;
  children: ReactNode;
}

export function ImageCardFrame({
  media,
  labelPosition = "bottom",
  href,
  children,
}: ImageCardFrameProps) {
  const content = (
    <div className="group relative">
      {media}
      <div
        className={`pointer-events-none absolute inset-x-0 flex px-5 ${
          labelPosition === "top" ? "top-5" : "bottom-5"
        }`}
      >
        {children}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="block rounded-sm outline-offset-4 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral hover:-translate-y-1"
    >
      {content}
    </Link>
  );
}
