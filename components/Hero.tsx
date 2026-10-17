import Button from "@/components/Button";
import HeroSlider from "@/components/HeroSlider";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import {
  ARENA_ZONES,
  PROGRAMMES,
  QUARTERLY_TOURNAMENTS,
  TOURNAMENTS,
} from "@/lib/content";

type StatusRow = {
  label: string;
  value: string;
  fill: "solid" | "half";
};

type Props = {
  eyebrow?: string;
  headlineTop?: string;
  headlineBottom?: string;
  body?: string;
  note?: string;
  primary?: { label: string; href: string; note?: string };
  secondary?: { label: string; href: string; note?: string };
  statusRows?: StatusRow[];
  className?: string;
};

/** Authority figures anchoring the base of the hero. */
const HERO_STATS = [
  { value: PROGRAMMES.length, label: "Academy programmes" },
  { value: ARENA_ZONES.length, label: "Arena zones" },
  { value: TOURNAMENTS.length, label: "Championship titles" },
  { value: QUARTERLY_TOURNAMENTS.length, label: "Quarterly tournaments" },
] as const;

function Marker({ fill }: { fill: StatusRow["fill"] }) {
  if (fill === "solid") {
    return <span aria-hidden="true" className="h-2.5 w-2.5 flex-none bg-[#FF2B55]" />;
  }
  return (
    <span
      aria-hidden="true"
      className="relative h-2.5 w-2.5 flex-none border border-[#FF2B55]"
    >
      <span className="absolute inset-y-0 left-0 w-1/2 bg-[#FF2B55]" />
    </span>
  );
}

/** Pulsing red status dot; `className` sets both ring and core size. */
function PulseDot({ className = "h-2 w-2" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative flex flex-none ${className}`}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF2B55] opacity-70 motion-reduce:animate-none" />
      <span className={`relative inline-flex ${className} rounded-full bg-[#FF2B55]`} />
    </span>
  );
}

/**
 * Homepage hero: stacked headline (white action line, oversized red payoff),
 * copy, paired CTAs with helper notes, a live pre-launch status pill, and a
 * framed image panel with a status board. A four-figure facts strip grounds
 * the base of the section. Decorative layers are aria-hidden; motion is
 * handled by Reveal and fully disabled under prefers-reduced-motion.
 */
export default function Hero({
  eyebrow = "Avatars Realm Esports Academy & Gaming Arena",
  headlineTop = "Train. Play. Compete.",
  headlineBottom = "Belong.",
  body = "Avatars Realm is an esports academy and gaming arena built around structured programmes, accessible gaming, community leagues and live competition.",
  note = "Opening programme and membership enrolment to be announced.",
  primary = {
    label: "Explore Programmes",
    href: "/academy-programmes/",
  },
  secondary = {
    label: "View Memberships",
    href: "/memberships/",
  },
  statusRows = [
    { label: "Academy programmes", value: "Enrolment opening", fill: "half" },
    { label: "Gaming lounge & memberships", value: "Pilot pricing", fill: "solid" },
    { label: "Open Esports Championship 2026", value: "Upcoming", fill: "half" },
  ],
  className = "",
}: Props) {
  return (
    <section
      className={`relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden ${className}`.trim()}
    >
      {/* Tactical grid, faded toward the edges with a radial mask. */}
      <SectionDragon side="right" size="h-[34rem] w-[34rem]" />
      <GridBackdrop className="opacity-90 [-webkit-mask-image:radial-gradient(ellipse_75%_70%_at_50%_38%,black_25%,transparent_80%)] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_38%,black_25%,transparent_80%)]" />

      {/* Soft red glow sitting behind the right-hand panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-12%] hidden h-[44rem] w-[44rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,43,85,0.17),transparent_65%)] blur-3xl lg:block"
      />

      <div className="container-page relative flex flex-1 items-center pt-14 pb-10 lg:pt-16 lg:pb-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:gap-16">
          {/* ------------------------------------------------------ Copy */}
          <div className="max-w-none">
            <Reveal>
              {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
              <h1>
                <span className="block text-[clamp(38px,4.6vw,64px)] leading-[1.06] font-bold tracking-[-0.03em] text-paper-50">
                  {headlineTop}
                </span>
                <span className="mt-1.5 block text-[clamp(56px,6.8vw,100px)] leading-[1.02] font-bold tracking-[-0.03em] text-[#FF2B55] [text-shadow:0_0_38px_rgba(255,43,85,0.45)]">
                  {headlineBottom}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-8 max-w-[30em] text-[19px] leading-[1.7] text-[#C4CAD8]">
                {body}
              </p>
            </Reveal>

            {/* Paired CTAs, each with its helper note directly beneath. */}
            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap gap-x-10 gap-y-6">
                <div>
                  <Button href={primary.href} size="lg" className="btn-glow">
                    {primary.label}
                  </Button>
                  {primary.note ? (
                    <p className="mt-3 max-w-[17rem] text-[0.8125rem] leading-relaxed text-paper-400">
                      {primary.note}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Button href={secondary.href} variant="secondary" size="lg">
                    {secondary.label}
                  </Button>
                  {secondary.note ? (
                    <p className="mt-3 max-w-[17rem] text-[0.8125rem] leading-relaxed text-paper-400">
                      {secondary.note}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>

            {note ? (
              <Reveal delay={240}>
                <p className="mt-7 flex w-fit max-w-full items-center gap-3 rounded-lg border border-white/12 bg-white/[0.05] px-4 py-2.5 text-[0.875rem] leading-snug text-paper-100">
                  <PulseDot />
                  <span>{note}</span>
                </p>
              </Reveal>
            ) : null}
          </div>

          {/* ------------------------------------------------------ Panel */}
          <Reveal delay={120} className="relative">
            <div className="relative mx-auto w-full max-w-[26rem] sm:max-w-xl lg:max-w-none">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/14 bg-gradient-to-br from-navy-800 via-ink-900 to-ink-950 shadow-lift lg:aspect-[4/3]">
                <HeroSlider className="absolute inset-0" />
                {/* Lighter top-down wash so the subject stays readable. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent"
                />
                {/* Red radial glow behind the subject. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_64%_38%,rgba(255,43,85,0.24),transparent_58%)] mix-blend-screen"
                />
                {/* Single red curved accent across the panel. */}
                <RedArc className="pointer-events-none absolute -bottom-28 -left-24 h-[30rem] w-[30rem] -rotate-90 opacity-90" />

                {/* Floating feed chip, top-left. */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1.5 backdrop-blur-md sm:top-4 sm:left-4">
                  <PulseDot className="h-1.5 w-1.5" />
                  <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-paper-100 uppercase">
                    Inside the arena
                  </span>
                </div>
              </div>

              {/* Status board — floats inside the panel from sm up, and sits
                  as a card beneath it on mobile so the image stays visible. */}
              <div className="mt-4 rounded-lg border border-white/12 bg-ink-950/70 p-4 backdrop-blur-md sm:absolute sm:inset-x-5 sm:bottom-5 sm:mt-0 sm:bg-ink-950/60 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
                  <span className="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.2em] text-paper-200 uppercase">
                    <PulseDot className="h-1.5 w-1.5" />
                    Launch status
                  </span>
                  <span className="text-[0.62rem] tracking-[0.16em] text-paper-400 uppercase">
                    Pre-launch · to be announced
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {statusRows.map((row) => (
                    <li
                      key={row.label}
                      className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="flex items-center gap-3">
                        <Marker fill={row.fill} />
                        <span className="text-sm font-medium text-paper-100">
                          {row.label}
                        </span>
                      </span>
                      <span className="text-[0.7rem] font-semibold tracking-[0.08em] text-paper-300 uppercase">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* --------------------------------------------------- Facts strip */}
      <div className="relative border-t border-white/[0.08] bg-ink-950/50 backdrop-blur-sm">
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
