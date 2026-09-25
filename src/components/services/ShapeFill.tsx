export interface ShapeFillProps {
  /** Figma vector used as an alpha mask (exported with preserveAspectRatio="none" so it stretches). */
  src: string;
  /** Supplies the fill colour via a bg-* class. */
  className: string;
}

/** Background layer painted in any palette colour and cut to a Figma shape. */
export function ShapeFill({ src, className }: ShapeFillProps) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 [mask-repeat:no-repeat] [mask-size:100%_100%] ${className}`}
      style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
    />
  );
}
