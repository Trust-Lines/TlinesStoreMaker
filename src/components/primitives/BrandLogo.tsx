import Image from "next/image";
import Link from "next/link";

const sizeClass = {
  sm: "h-8 w-auto",
  md: "h-10 w-auto",
  lg: "h-14 w-auto",
} as const;

export interface BrandLogoProps {
  src: string;
  alt: string;
  href?: string;
  size?: keyof typeof sizeClass;
}

export function BrandLogo({ src, alt, href, size = "md" }: BrandLogoProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={240}
      height={60}
      unoptimized
      className={`${sizeClass[size]} object-contain`}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="inline-flex rounded-sm outline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
    >
      {image}
    </Link>
  );
}
