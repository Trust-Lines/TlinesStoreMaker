import Image from "next/image";
import Link from "next/link";

export interface PromoCard {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  leafShape: string;
  buttonShape: string;
  textTone: "dark" | "light";
}

export interface PromoCardsSectionProps {
  cards: PromoCard[];
}

function Card({ card }: { card: PromoCard }) {
  const isDark = card.textTone === "dark";
  const isTruckStops = card.id === "truck-stops";
  const isGrocery = card.id === "grocery";
  const usesAngledCard = card.id === "c-store" || card.id === "truck-stops" || card.id === "grocery";
  const angledCardFill =
    card.id === "c-store" ? "#F7C56B" : card.id === "grocery" ? "#547255" : "#DB7358";

  return (
    <Link
      href={card.href}
      className="group relative block outline-offset-4 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
    >
      <div className="relative aspect-[480/820.393] w-full">
        {usesAngledCard ? (
          <svg
            aria-hidden
            viewBox={isTruckStops ? "0 0 480 821" : "0 0 480 859"}
            fill="none"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {isTruckStops ? (
              <path
                d="M10.7828 3.56537C12.6829 1.30503 15.4848 0 18.4376 0H461.562C464.515 0 467.317 1.30503 469.217 3.56537L477.655 13.6029C479.17 15.4049 480 17.6835 480 20.0376V800.355C480 802.709 479.17 804.988 477.655 806.79L469.217 816.827C467.317 819.088 464.515 820.393 461.562 820.393H18.4376C15.4848 820.393 12.6829 819.088 10.7828 816.827L2.34523 806.79C0.830478 804.988 0 802.709 0 800.355L0 20.0376C0 17.6835 0.830479 15.4049 2.34523 13.6029L10.7828 3.56537Z"
                fill="#DB7358"
              />
            ) : isGrocery ? (
              <path
                d="M0.0255432 31.8866V818.689C0.0255432 820.553 0.781128 822.341 2.12582 823.627L18.0186 838.867C19.2097 840.012 20.7849 840.681 22.4369 840.758L451.762 858.789C453.606 858.866 455.412 858.185 456.743 856.911L477.9 836.63C479.244 835.344 480 833.556 480 831.691V26.7422C480 24.8902 479.244 23.1154 477.913 21.8293L457.333 1.90753C456.013 0.634286 454.246 -0.0602041 452.415 0.00410102L19.9013 12.325C18.2236 12.3764 16.61 13.0452 15.3934 14.2155L2.10019 26.9737C0.755493 28.2598 0 30.0475 0 31.9123L0.0255432 31.8866Z"
                fill={angledCardFill}
              />
            ) : (
              <path
                d="M479.974 31.8866V818.689C479.974 820.553 479.219 822.341 477.874 823.627L461.981 838.867C460.79 840.012 459.215 840.681 457.563 840.758L28.2383 858.789C26.3942 858.866 24.5885 858.185 23.2566 856.911L2.10024 836.63C0.755563 835.344 0 833.556 0 831.691V26.7422C0 24.8902 0.755589 23.1154 2.08746 21.8293L22.6675 1.90753C23.9865 0.634286 25.7539 -0.0602041 27.5852 0.00410102L460.099 12.325C461.776 12.3764 463.39 13.0452 464.607 14.2155L477.9 26.9737C479.245 28.2598 480 30.0475 480 31.9123L479.974 31.8866Z"
                fill={angledCardFill}
              />
            )}
          </svg>
        ) : (
          <Image src={card.leafShape} alt="" fill unoptimized className="pointer-events-none" />
        )}
        <div className="absolute inset-x-[2.6%] top-[1.2%] aspect-[455/376] overflow-hidden rounded-[22px]">
          <Image src={card.image} alt="" fill sizes="(min-width: 640px) 31vw, 90vw" className="object-cover" />
        </div>
        <div className={`absolute inset-x-0 flex flex-col items-start gap-4 px-[7%] text-left ${isTruckStops ? "top-[49.5%]" : "top-[47.5%]"}`}>
          <h3
            className={`font-accent text-3xl font-extrabold uppercase md:text-[clamp(1.7rem,2.35vw,2.8rem)] ${
              isDark ? "text-sage-dark" : "text-cream"
            }`}
          >
            {card.title}
          </h3>
          <p className={`max-w-[330px] text-[clamp(.75rem,1.05vw,1.1rem)] leading-[1.2] ${isDark ? "text-sage-dark/90" : "text-cream/90"}`}>
            {card.description}
          </p>
        </div>

        {isTruckStops ? (
          <span className="absolute left-1/2 top-[92%] inline-flex aspect-[314/68.7871] w-[65.4167%] -translate-x-1/2 -translate-y-1/2 items-center justify-center text-sm font-bold text-coral md:text-base">
            <svg aria-hidden viewBox="0 0 314 69" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              <path d="M7.73957 3.56995C9.63961 1.30688 12.4433 0 15.3982 0H298.602C301.557 0 304.36 1.30688 306.26 3.56995L311.659 9.99956C313.171 11.8009 314 14.0776 314 16.4296V52.3574C314 54.7094 313.171 56.9862 311.659 58.7875L306.26 65.2171C304.36 67.4802 301.557 68.7871 298.602 68.7871H15.3982C12.4432 68.7871 9.63961 67.4802 7.73957 65.2171L2.34137 58.7875C0.829027 56.9862 0 54.7094 0 52.3574V16.4296C0 14.0776 0.829031 11.8009 2.34138 9.99956L7.73957 3.56995Z" fill="#FFF4E0" />
            </svg>
            <span className="relative z-10">See More</span>
          </span>
        ) : (
          <span className="absolute left-1/2 top-[92%] inline-flex aspect-[281/82] w-[58.5417%] -translate-x-1/2 -translate-y-1/2 items-center justify-center font-display text-[clamp(.75rem,1.51vw,24px)] font-bold leading-[1] text-cream">
            {card.id === "c-store" ? (
              <svg aria-hidden viewBox="0 0 281 82" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full scale-y-[-1]">
                <path d="M280.985 63.3056V21.1961C280.985 20.1027 280.543 19.0547 279.756 18.3007L270.452 9.36559C269.754 8.69453 268.832 8.30244 267.865 8.25719L16.5312 0.00346375C15.4516 -0.0417786 14.3945 0.357849 13.6148 1.10432L1.22952 12.9951C0.442319 13.7491 0 14.7972 0 15.8905V66.3217C0 67.4075 0.442334 68.448 1.22204 69.202L13.2699 80.8817C14.0421 81.6281 15.0767 82.0353 16.1488 81.9976L269.349 74.7742C270.332 74.744 271.276 74.3519 271.988 73.6658L279.771 66.186C280.558 65.4319 281 64.3839 281 63.2906L280.985 63.3056Z" fill="#DB7358" />
              </svg>
            ) : isGrocery ? (
              <svg
                aria-hidden
                width="281"
                height="82"
                viewBox="0 0 281 82"
                fill="none"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path d="M0.0149231 63.3056V21.1961C0.0149231 20.1027 0.457275 19.0547 1.24448 18.3007L10.5484 9.36559C11.2456 8.69453 12.1678 8.30244 13.1349 8.25719L264.469 0.00346375C265.548 -0.0417786 266.606 0.357849 267.385 1.10432L279.77 12.9951C280.558 13.7491 281 14.7972 281 15.8905V66.3217C281 67.4075 280.558 68.448 279.778 69.202L267.73 80.8817C266.958 81.6281 265.923 82.0353 264.851 81.9976L11.6505 74.7742C10.6684 74.744 9.72375 74.3519 9.01154 73.6658L1.22946 66.186C0.442261 65.4319 0 64.3839 0 63.2906L0.0149231 63.3056Z" fill="#939878" />
              </svg>
            ) : (
              <svg aria-hidden viewBox="0 0 281 82" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full rotate-180">
                <path d="M0.0149231 63.3056V21.1961C0.0149231 20.1027 0.457275 19.0547 1.24448 18.3007L10.5484 9.36559C11.2456 8.69453 12.1678 8.30244 13.1349 8.25719L264.469 0.00346375C265.548 -0.0417786 266.606 0.357849 267.385 1.10432L279.77 12.9951C280.558 13.7491 281 14.7972 281 15.8905V66.3217C281 67.4075 280.558 68.448 279.778 69.202L267.73 80.8817C266.958 81.6281 265.923 82.0353 264.851 81.9976L11.6505 74.7742C10.6684 74.744 9.72375 74.3519 9.01154 73.6658L1.22946 66.186C0.442261 65.4319 0 64.3839 0 63.2906L0.0149231 63.3056Z" fill="#939878" />
              </svg>
            )}
            <span className="relative z-10 flex h-[35.37%] w-[62.28%] items-center justify-center text-center">See More</span>
          </span>
        )}
      </div>
    </Link>
  );
}

export function PromoCardsSection({ cards }: PromoCardsSectionProps) {
  return (
    <section className="bg-cream px-4 py-14 md:h-[988px] md:px-10 md:pb-[96px] md:pt-[72px]">
      <div className="mx-auto grid w-full max-w-[1490px] grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-[25px]">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
