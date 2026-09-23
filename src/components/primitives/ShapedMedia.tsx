import Image from "next/image";
import type { CSSProperties } from "react";
import { shapeClass, type MediaShape } from "@/lib/shapes";

export interface ShapedMediaProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  objectPosition?: string;
  shape?: MediaShape;
  overlay?: boolean;
  borderColor?: string;
  priority?: boolean;
  sizes?: string;
  /** Corner cut size in px, only meaningful for shape="chamfered". */
  chamfer?: number;
}

export function ShapedMedia({
  src,
  alt,
  aspectRatio = "4 / 3",
  objectPosition = "center",
  shape,
  overlay = false,
  borderColor,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  chamfer,
}: ShapedMediaProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${shape ? shapeClass[shape] : ""}`}
      style={{
        aspectRatio,
        outline: borderColor ? `6px solid ${borderColor}` : undefined,
        outlineOffset: borderColor ? "-6px" : undefined,
        ...(chamfer !== undefined ? ({ "--chamfer": `${chamfer}px` } as CSSProperties) : {}),
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={src.endsWith(".svg")}
        priority={priority}
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition }}
      />
      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/10 to-transparent"
        />
      ) : null}
    </div>
  );
}
