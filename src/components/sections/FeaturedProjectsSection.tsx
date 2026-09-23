import Image from "next/image";

export interface FeaturedProjectPhoto {
  id: string;
  image: string;
  alt: string;
}

export interface FeaturedProjectsSectionProps {
  title: string;
  photos: FeaturedProjectPhoto[];
  tourHeading: string;
}

const placements = [
  "col-start-1 col-end-3 row-start-1",
  "col-start-3 col-end-5 row-start-1",
  "col-start-5 col-end-7 row-start-1",
  "col-start-7 col-end-9 row-start-1",
  "col-start-9 col-end-11 row-start-1",
  "col-start-1 col-end-3 row-start-2",
  "col-start-3 col-end-5 row-start-2",
  "col-start-8 col-end-11 row-start-2",
  "col-start-1 col-end-3 row-start-3",
  "col-start-3 col-end-5 row-start-3",
  "col-start-5 col-end-7 row-start-3",
  "col-start-7 col-end-9 row-start-3",
  "col-start-9 col-end-11 row-start-3",
];

export function FeaturedProjectsSection({ title, photos, tourHeading }: FeaturedProjectsSectionProps) {
  const mosaicPhotos = Array.from({ length: 13 }, (_, index) => photos[index % photos.length]);
  const tourImage = photos[6]?.image ?? photos[0]?.image;

  return (
    <section className="relative aspect-[1592/1377] min-h-[860px] overflow-hidden bg-forest text-cream">
      <div className="absolute left-1/2 top-[7.6%] aspect-[1383/706.5] w-[91.2%] -translate-x-1/2">
        <Image src="/images/figma/projects-scatter-bg.svg" alt="" fill unoptimized className="pointer-events-none" />
        <div className="absolute inset-x-[3.3%] bottom-[4.3%] top-[3.2%] grid grid-cols-10 grid-rows-3 gap-[clamp(5px,.7vw,11px)]">
          {mosaicPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className={`relative overflow-hidden rounded-[clamp(5px,.8vw,13px)] ${placements[index]}`}
              style={{ clipPath: index % 3 === 0 ? "polygon(8% 0,96% 4%,100% 15%,96% 95%,8% 100%,0 88%,2% 10%)" : index % 3 === 1 ? "polygon(5% 3%,95% 0,100% 10%,97% 93%,89% 100%,3% 96%,0 12%)" : "polygon(4% 0,94% 3%,100% 12%,98% 92%,92% 100%,5% 97%,0 90%,1% 9%)" }}
            >
              <Image src={photo.image} alt={photo.alt} fill priority={index < 5} sizes="18vw" className="object-cover" />
            </div>
          ))}

          <div className="relative z-10 col-start-5 col-end-8 row-start-2 self-center bg-cream px-[7%] py-[7%] text-center text-forest" style={{ clipPath: "polygon(7% 0,94% 3%,100% 18%,97% 86%,91% 100%,5% 96%,0 82%,1% 14%)" }}>
            <h2 className="font-accent text-[clamp(18px,3.15vw,50px)] font-bold tracking-[0.18em]">{title}</h2>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-[65.8%] z-20 w-fit -translate-x-1/2 bg-cream px-[clamp(24px,3vw,48px)] py-[clamp(8px,1vw,16px)] text-center text-forest shadow-sm" style={{ clipPath: "polygon(5% 0,95% 2%,100% 22%,98% 82%,92% 100%,4% 96%,0 76%,1% 18%)" }}>
        <p className="font-display text-[clamp(13px,1.5vw,24px)] font-bold">{tourHeading}</p>
      </div>

      <div className="absolute inset-x-0 bottom-[2.5%] h-[25.2%] bg-sage-dark" style={{ clipPath: "polygon(0 8%,33% 12%,67% 3%,100% 8%,100% 92%,63% 96%,31% 89%,0 92%)" }}>
        <div className="mx-auto flex h-full w-[84%] items-center justify-center gap-[1.2%] pt-[2.5%]">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="relative aspect-[317/198] w-1/4 overflow-hidden rounded-[2%]" style={{ clipPath: index % 2 ? "polygon(3% 2%,97% 0,100% 8%,98% 95%,93% 100%,2% 97%,0 8%)" : "polygon(5% 0,96% 3%,100% 12%,97% 96%,5% 100%,0 91%,1% 8%)" }}>
              <Image src={tourImage} alt={index === 0 ? "Interactive 360 degree project tour preview" : ""} fill priority sizes="21vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-forest/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
