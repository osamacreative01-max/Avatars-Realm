"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  /** CSS object-position, so the subject stays visible behind the copy. */
  position?: string;
};

type Props = {
  slides: readonly Slide[];
  /** Time each slide is held before the next cross-fade. */
  interval?: number;
  /** Passed to next/image — the rendered width of the media region. */
  sizes?: string;
};

/**
 * Background cross-fade for the homepage hero. Images dissolve one into the
 * next rather than sliding, so the headline and CTAs never move. Only the
 * first frame is eagerly fetched (Next.js `priority`); the rest lazy-load.
 *
 * The cycle is skipped entirely when the visitor has asked the OS for reduced
 * motion, and the timer pauses while the tab is hidden so a backgrounded tab
 * does not burn through the sequence.
 */
export default function HeroSlider({
  slides,
  interval = 5200,
  sizes = "100vw",
}: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setActive((i) => (i + 1) % slides.length);
      }, interval);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    // Start paused if the tab is already in the background.
    if (!document.hidden) start();

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slides.length, interval]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes={sizes}
          className={`hero-slide object-cover transition-opacity duration-[1200ms] ease-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: slide.position ?? "50% 50%" }}
        />
      ))}
    </div>
  );
}
