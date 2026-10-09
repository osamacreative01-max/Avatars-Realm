"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  position?: string;
};

const SLIDES: Slide[] = [
  {
    src: "/images/player-focus.jpg",
    alt: "Player competing at a PC in a dimly lit esports arena",
    position: "object-[62%_center]",
  },
  {
    src: "/images/pc-stations.jpg",
    alt: "A row of gaming PCs set up at the academy stations",
  },
  {
    src: "/images/duo-competition.jpg",
    alt: "Two players competing side by side during a match",
  },
  {
    src: "/images/gaming-gear.jpg",
    alt: "Keyboard, headset and peripherals on a gaming desk",
  },
];

const INTERVAL = 4500;

/**
 * Auto-advancing crossfade slider for the hero panel. The active slide fades
 * in over the others; small square markers top-right double as navigation.
 * Autoplay is skipped entirely under prefers-reduced-motion.
 */
export default function HeroSlider({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={className}>
      {SLIDES.map((slide, i) => {
        const active = i === index;

        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={active ? slide.alt : ""}
            aria-hidden={active ? undefined : true}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 32rem, 22rem"
            className={`object-cover brightness-125 contrast-[1.04] saturate-[1.08] transition-opacity duration-700 ease-out ${slide.position ?? ""} ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}

      <div className="absolute top-4 right-4 z-10 flex gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-5 transition-colors ${
              i === index
                ? "bg-[#FF2B55]"
                : "bg-white/35 hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2B55]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
