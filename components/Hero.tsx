import Button from "@/components/Button";
import HeroSlider from "@/components/HeroSlider";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Reveal from "@/components/Reveal";

type StatusRow = {
  label: string;
  value: string;
  fill: "solid" | "half";
};

type Props = {
  headlineTop?: string;
  headlineBottom?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  statusRows?: StatusRow[];
  className?: string;
};

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

/**
 * Two-column hero: headline + copy + CTAs on the left, a framed gamer panel
 * with a live status card on the right. Decorative layers are aria-hidden;
 * motion is handled by Reveal and fully disabled under prefers-reduced-motion.
 */
export default function Hero({
  headlineTop = "Serious esports.",
  headlineBottom = "Open every day.",
  body = "Avatars Realm is an established esports academy and gaming arena in Northcliff — coached subscriptions for players who want to improve, an open arena floor for everyone, junior programmes, team bootcamps and a full competitive calendar.",
  primary = { label: "See pricing & join", href: "/pricing/" },
  secondary = { label: "Book a free trial", href: "/contact/" },
  statusRows = [
    { label: "Esports Academy", value: "Accepting members", fill: "solid" },
    { label: "Arena floor", value: "Walk-ins welcome", fill: "solid" },
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
        className="pointer-events-none absolute top-1/2 right-[-12%] hidden h-[52rem] w-[52rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,43,85,0.17),transparent_65%)] blur-3xl lg:block"
      />

      <div className="container-page relative flex flex-1 items-center py-16 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14 xl:gap-16">
          {/* ------------------------------------------------------ Copy */}
          <div className="max-w-none">
            <Reveal>
              <h1 className="text-[clamp(58px,7.6vw,116px)] leading-[1] font-bold tracking-[-0.03em] text-paper-50">
                {headlineTop}
                <br />
                <span className="text-[#FF2B55] [text-shadow:0_0_38px_rgba(255,43,85,0.45)]">
                  {headlineBottom}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-14 max-w-[32em] text-[20px] leading-[1.7] text-[#C4CAD8]">
                {body}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-14 flex flex-wrap gap-3">
                <Button href={primary.href} size="lg" className="btn-glow">
                  {primary.label}
                </Button>
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------------ Panel */}
          <Reveal delay={120} className="relative">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[30rem] overflow-hidden rounded-xl border border-white/14 bg-gradient-to-br from-navy-800 via-ink-900 to-ink-950 shadow-lift sm:max-w-2xl lg:max-w-none">
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
              <RedArc className="pointer-events-none absolute -bottom-32 -left-28 h-[36rem] w-[36rem] -rotate-90 opacity-90" />

              {/* Translucent status card. */}
              <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/12 bg-ink-950/55 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
                <ul className="space-y-3">
                  {statusRows.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="flex items-center gap-3">
                        <Marker fill={row.fill} />
                        <span className="text-[0.95rem] font-medium text-paper-100">
                          {row.label}
                        </span>
                      </span>
                      <span className="text-[0.75rem] font-semibold tracking-[0.08em] text-paper-300 uppercase">
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

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.65rem] font-medium tracking-[0.28em] text-paper-400 uppercase">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-[#FF2B55] to-transparent motion-reduce:animate-none" />
      </div>
    </section>
  );
}
