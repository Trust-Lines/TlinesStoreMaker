"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface RotatingPhotoImage {
  src: string;
  /** CSS object-position for this shot's crop. Defaults to the card's own `imagePosition`. */
  position?: string;
}

/** Cycles through `images` every 3s with a crossfade. Used where a specialty card's photo rotates through several shots instead of showing just one. */
export function RotatingPhoto({
  images,
  imagePosition,
  sizes,
}: {
  images: RotatingPhotoImage[];
  imagePosition?: string;
  sizes: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setIndex((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(tick);
  }, [images.length]);

  return (
    <>
      {images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt=""
          fill
          sizes={sizes}
          priority={i === 0}
          className={`object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${i === index ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: image.position ?? imagePosition ?? "center" }}
        />
      ))}
    </>
  );
}
