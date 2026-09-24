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
        </div>

        <div className="absolute left-1/2 top-1/2 z-20 flex aspect-[449.62/114.825] w-[32.51%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <svg aria-hidden viewBox="0 0 450 115" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
            <path d="M449.596 29.7672V77.3838C449.596 79.1247 448.888 80.7936 447.629 81.9942L432.742 96.2215C431.626 97.2901 430.15 97.9144 428.603 97.9865L26.451 114.819C24.7236 114.891 23.0322 114.255 21.7846 113.066L1.96732 94.1325C0.707741 92.9319 0 91.263 0 89.5221V24.9647C0 23.2358 0.707766 21.579 1.95534 20.3784L21.2328 1.78074C22.4684 0.592127 24.1238 -0.0562026 25.8393 0.00382844L430.978 11.5058C432.55 11.5538 434.061 12.1781 435.201 13.2707L447.653 25.1808C448.912 26.3815 449.62 28.0503 449.62 29.7912L449.596 29.7672Z" fill="#FFF4E0" />
          </svg>
          <h2 className="relative z-10 font-accent text-[clamp(18px,3.15vw,50px)] font-bold tracking-[0.18em] text-forest">{title}</h2>
        </div>
      </div>

      <div className="absolute left-1/2 top-[65.8%] z-20 flex aspect-[494/83] w-[31.03%] -translate-x-1/2 items-center justify-center text-center text-forest">
        <svg aria-hidden viewBox="0 0 494 83" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full -scale-x-100">
          <path d="M0.0173035 21.517V59.9362C0.0173035 61.1946 0.529053 62.4009 1.43973 63.2688L12.2031 73.5529C13.0097 74.3253 14.0765 74.7766 15.1954 74.8287L474.876 82.996C476.125 83.0481 477.347 82.5881 478.249 81.7289L492.578 68.0428C493.488 67.175 494 65.9687 494 64.7103V18.0455C494 16.7958 493.488 15.5982 492.586 14.7303L478.648 1.28719C477.755 0.428014 476.558 -0.0406255 475.318 0.00276736L13.4781 8.31685C12.3419 8.35156 11.2491 8.80285 10.4251 9.5926L1.42236 18.2017C0.511688 19.0696 0 20.2759 0 21.5343L0.0173035 21.517Z" fill="#FFF4E0" />
        </svg>
        <p className="relative z-10 font-display text-[clamp(13px,1.5vw,24px)] font-bold">{tourHeading}</p>
      </div>

      <div className="absolute inset-x-0 bottom-[5.52%] h-[22.15%]">
        <svg aria-hidden viewBox="0 0 1592 305" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M1685.94 79.0684V205.549C1685.94 210.173 1684.06 214.606 1680.71 217.795L1641.19 255.586C1638.23 258.424 1634.31 260.083 1630.21 260.274L-20.7791 304.985C-25.3649 305.177 -29.8552 303.487 -33.1672 300.329L-85.7773 250.037C-89.1211 246.848 -91 242.415 -91 237.791V66.3119C-91 61.7196 -89.1211 57.3186 -85.809 54.1295L-34.6322 4.73005C-31.352 1.57282 -26.9572 -0.149287 -22.4031 0.0101692L1636.51 30.5619C1640.68 30.6895 1644.7 32.3478 1647.72 35.2499L1680.78 66.886C1684.12 70.0751 1686 74.5079 1686 79.1321L1685.94 79.0684Z" fill="#547255" />
        </svg>
        <div className="relative z-10 mx-auto flex h-full w-[84%] items-center justify-center gap-[1.2%] pt-[2.5%]">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="relative aspect-[317/198] w-1/4 overflow-hidden rounded-[2%]" style={{ clipPath: index % 2 ? "polygon(3% 2%,97% 0,100% 8%,98% 95%,93% 100%,2% 97%,0 8%)" : "polygon(5% 0,96% 3%,100% 12%,97% 96%,5% 100%,0 91%,1% 8%)" }}>
              <Image src={tourImage} alt={index === 0 ? "Interactive 360 degree project tour preview" : ""} fill priority sizes="21vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-forest/10" />
              <Image
                src="/images/figma/project-badge-icon-b.svg"
                alt=""
                aria-hidden
                width={72}
                height={72}
                unoptimized
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-square w-[22.65%] -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
