import Button from "@/components/Button";
import HeroSlider from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";
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
 * Backdrop photography. Ordered so the first frame — a row of players at
 * their stations under arena light — is the one that lands with the headline;
 * the rest carry the same room from other angles. Only the first frame is
 * fetched eagerly.
 */
const HERO_SLIDES = [
  {
    src: "/images/arena-chairs.jpg",
    alt: "Players competing side by side at arena stations",
    position: "52% 46%",
  },
  {
    src: "/images/young-professional-esports-players-playing-games-i-2021-12-09-13-29-30-utc.jpg",
    alt: "Two players at a row of competitive gaming PCs",
    position: "58% 50%",
  },
  {
    src: "/images/esports-setup.jpg",
    alt: "Row of competition stations lit for an event",
    position: "50% 50%",
  },
  {
    src: "/images/pc-stations.jpg",
    alt: "Gaming PCs lined up in the arena",
    position: "50% 50%",
  },
] as const;

/** Shared display sizing — all three headline lines are set at one size, and
    the h1 carries it so its `em`-based max-width resolves against the
    display size rather than the inherited body size. */
const HEADLINE =
  "text-[clamp(2.4rem,1.5rem+3.2vw,5rem)] leading-[1.02] font-extrabold uppercase tracking-[-0.025em]";

/**
 * Homepage hero. One rounded card holds the copy on the left and a slow
 * cross-fade of owned arena photography on the right; the photograph is
 * chamfered away at the bottom-left so the status plate notches into it.
 * The paired CTAs and the four stat coupons sit on the page ground beneath
 * the card. Entrance motion comes from Reveal, disabled under
 * prefers-reduced-motion.
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
    <section className={`relative ${className}`.trim()}>
      <div className="container-page pt-6 sm:pt-8 lg:pt-10">
        {/* ------------------------------------------------------------ Card */}
        <div className="hero-card relative isolate overflow-hidden">
          <div className="hero-media">
            {/* The media panel is 64% of the card on desktop and full bleed
                below that, so the LCP image is not fetched at full-viewport
                width where it is never shown that wide. */}
            <HeroSlider
              slides={HERO_SLIDES}
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>
          <div aria-hidden="true" className="hero-wash absolute inset-0" />

          {/* The copy stops short of the status plate so the two never
              collide: the plate is absolutely placed in the card's bottom
              left, and this padding reserves the band it occupies. */}
          <div className="relative z-10 flex min-h-[26rem] flex-col justify-center px-6 py-12 sm:px-10 lg:min-h-[38rem] lg:px-16 lg:pt-14 lg:pb-[clamp(9rem,13vw,15.5rem)]">
            <Reveal>
              {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
              {/* One size across every line, and 8.5em is wide enough for
                  "Train. Play." on one line but not for "Compete." to join
                  it, so "Belong." always lands on its own red line. */}
              <h1 className={`mt-5 max-w-[8.5em] ${HEADLINE}`}>
                <span className="block text-paper-50">{headlineTop}</span>
                <span className="mt-1 block text-[#d9323b]">
                  {headlineBottom}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.6] text-paper-100 sm:text-[1.25rem]">
                {body}
              </p>
            </Reveal>
          </div>

          {/* ----------------------------------------- Status plate (notch) */}
          <Reveal delay={150} className="hero-status">
            <p className="text-[clamp(1.5rem,1.1rem+1.5vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.01em] text-paper-50">
              {badge}
            </p>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------- CTAs */}
        <Reveal delay={200}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              href={primary.href}
              variant="plate"
              className="w-full sm:w-auto"
            >
              {primary.label}
            </Button>
            <Button
              href={secondary.href}
              variant="plate-outline"
              className="w-full sm:w-auto"
            >
              {secondary.label}
            </Button>
          </div>
        </Reveal>

        {/* ----------------------------------------------------------- Stats */}
        <div className="mt-7 grid grid-cols-2 gap-4 pb-14 lg:mt-8 lg:grid-cols-4 lg:gap-5 lg:pb-20">
          {HERO_STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 60}>
              <div className="plate hero-stat h-full w-full">
                <p className="hero-stat__value">
                  {stat.value}
                  <span>.</span>
                </p>
                <p className="hero-stat__label">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
