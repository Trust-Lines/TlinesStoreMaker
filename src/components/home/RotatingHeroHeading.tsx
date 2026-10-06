"use client";

import { useEffect, useState, type CSSProperties } from "react";

export interface HeroPhrase {
  /** Video time (seconds) at which this phrase takes over. The first one should be 0. */
  at: number;
  /** "\n" forces a line break (Figma "Bring it / all together."). */
  text: string;
  /** Figma text-box width in design px (lg+), which sets where the line wraps. */
  width?: number;
}

export interface RotatingHeroHeadingProps {
  phrases: HeroPhrase[];
  /** id of the background <video> whose playback time drives the phrases. */
  videoId: string;
}

/**
 * Hero headline that changes with the scenes of the background video. The
 * active phrase follows `video.currentTime`, so it stays in step when the
 * video loops. All phrases share one grid cell, so the box is as tall as the
 * longest one and the button below never jumps. Outgoing text lifts and blurs
 * away, incoming text rises into place (no motion when the visitor prefers
 * reduced motion).
 */
export function RotatingHeroHeading({ phrases, videoId }: RotatingHeroHeadingProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const video = document.getElementById(videoId) as HTMLVideoElement | null;
    if (!video) return;

    let frame = 0;
    const indexAt = (time: number) => {
      let index = 0;
      phrases.forEach((phrase, i) => {
        if (time >= phrase.at) index = i;
      });
      return index;
    };
    const tick = () => {
      setActive(indexAt(video.currentTime));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phrases, videoId]);

  return (
    <span className="grid">
      {phrases.map((phrase, index) => {
        const state =
          index === active
            ? "translate-y-0 opacity-100 blur-0"
            : index < active
              ? "-translate-y-4 opacity-0 blur-[6px]"
              : "translate-y-4 opacity-0 blur-[6px]";
        return (
          <span
            key={phrase.text}
            aria-hidden={index !== active}
            className={`col-start-1 row-start-1 whitespace-pre-line transition-[opacity,transform,filter] duration-500 ease-out motion-reduce:transition-none lg:w-[var(--pw)] ${state}`}
            style={phrase.width ? ({ "--pw": `calc(var(--u) * ${phrase.width})` } as CSSProperties) : undefined}
          >
            {phrase.text}
          </span>
        );
      })}
    </span>
  );
}
