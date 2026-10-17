import Image from "next/image";

import Button from "@/components/Button";
import HeroSlider from "@/components/HeroSlider";
import { GridBackdrop } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import {
  ARENA_ZONES,
  PROGRAMMES,
  QUARTERLY_TOURNAMENTS,
  TOURNAMENTS,
} from "@/lib/content";

type Props = {
  eyebrow?: string;
  headlineTop?: string;
  headlineBottom?: string;
  body?: string;
  badge?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
};

/** Authority figures anchoring the base of the hero. */
const HERO_STATS = [
  { value: PROGRAMMES.length, label: "Academy programmes" },
  { value: ARENA_ZONES.length, label: "Arena zones" },
  { value: TOURNAMENTS.length, label: "Championship titles" },
  { value: QUARTERLY_TOURNAMENTS.length, label: "Quarterly tournaments" },
] as const;

/**
 * Backdrop photography. The cross-fade cycles through owned arena imagery
 * behind the copy; only the first frame is fetched eagerly.
 */
const HERO_SLIDES = [
  {
    src: "/images/player-focus.jpg",
    alt: "Player focused at an esports station",
    position: "68% 50%",
  },
  {
    src: "/images/pc-stations.jpg",
    alt: "Row of gaming PCs in the arena",
    position: "50% 50%",
  },
  {
    src: "/images/arena-stage.png",
    alt: "Esports arena stage",
    position: "50% 45%",
  },
  {
    src: "/images/event-crowd.jpg",
    alt: "Crowd watching a live esports match",
    position: "50% 50%",
  },
] as const;

/**
 * Homepage hero. A slow cross-fade of owned arena photography sits behind the
 * copy, darkened left to right so the text always lands on near-black, with a
 * single status badge beneath the headline instead of a status board. Paired
 * CTAs are equal height and stack full width on mobile. Entrance motion comes
 * from Reveal, which is disabled entirely under prefers-reduced-motion.
 */
export default function Hero({
  eyebrow = "Avatars Realm Esports Academy & Gaming Arena",
  headlineTop = "Train. Play. Compete.",
  headlineBottom = "Belong.",
  body = "An esports academy, gaming lounge and arena in Northcliff, Randburg.",
  badge = "Opening programme to be announced",
  primary = {
    label: "Explore Programmes",
    href: "/academy-programmes/",
  },
  secondary = {
    label: "Open Championship 2026",
    href: "/open-esports-championship-2026/",
  },
  className = "",
}: Props) {
  return (
    <section
      className={`relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden ${className}`.trim()}
    >
      {/* ------------------------------------------------- Backdrop layers */}
      <HeroSlider slides={HERO_SLIDES} />
      <div aria-hidden="true" className="absolute inset-0">
        {/* Left-to-right darkening: copy sits on the opaque side. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/40" />
        {/* Extra wash on small screens, where copy spans the full width. */}
        <div className="absolute inset-0 bg-ink-950/55 lg:bg-transparent" />
        <GridBackdrop className="opacity-40" />
        <div className="absolute top-1/3 right-[-14%] hidden h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,43,85,0.2),transparent_65%)] blur-3xl lg:block" />
      </div>

      {/* ----------------------------------------------------------- Copy */}
      <div className="container-page relative flex flex-1 items-center py-16 lg:py-20">
        <div className="w-full">
          <Reveal>
            {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
            <h1 className="mx-auto max-w-[52rem] lg:mx-0">
              <span className="block text-[clamp(38px,4.6vw,64px)] leading-[1.06] font-bold tracking-[-0.03em] text-paper-50 [text-wrap:balance]">
                {headlineTop}
              </span>
              <span className="mt-1.5 block text-[clamp(56px,6.8vw,100px)] leading-[1.02] font-bold tracking-[-0.03em] text-[#FF2B55] [text-shadow:0_0_38px_rgba(255,43,85,0.45)]">
                {headlineBottom}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-7 max-w-[32em] text-[19px] leading-[1.7] text-[#C4CAD8]">
              {body}
            </p>
          </Reveal>

          {/* The single status badge — the hero's only status message. */}
          <Reveal delay={150}>
            <div className="mt-7">
              <StatusBadge tone="coming">{badge}</StatusBadge>
            </div>
          </Reveal>

          {/* Paired CTAs: equal height, stacked full width on mobile. */}
          <Reveal delay={210}>
            <div className="mt-8 flex flex-col gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-4">
              <Button href={primary.href} size="lg" className="btn-glow w-full sm:w-auto">
                {primary.label}
              </Button>
              <Button
                href={secondary.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondary.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* --------------------------------------------------- Facts strip */}
      <div className="relative border-t border-white/[0.08] bg-ink-950/75 backdrop-blur-sm">
        <div className="container-page grid grid-cols-2 gap-x-6 gap-y-7 py-7 sm:grid-cols-4 lg:py-8">
          {HERO_STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 60}
              className="md:border-l md:border-white/[0.08] md:pl-7 md:first:border-l-0 md:first:pl-0"
            >
              <p className="text-[2rem] leading-none font-bold tracking-[-0.02em] text-paper-50">
                {stat.value}
                <span className="text-[#FF2B55]">.</span>
              </p>
              <p className="mt-2.5 text-[0.7rem] font-medium tracking-[0.18em] text-paper-400 uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
