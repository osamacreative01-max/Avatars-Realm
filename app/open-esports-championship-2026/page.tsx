import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { CHAMPIONSHIP, QUARTERLY_NOTE, QUARTERLY_TOURNAMENTS, TOURNAMENT_JOURNEY, TOURNAMENTS } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/open-esports-championship-2026/",
  title: "Open Esports Championship 2026",
  description:
    "The Arena's flagship multi-title championship at Avatars Realm — EA Sports FC 25, Call of Duty BO6, Valorant, PUBG Mobile and Free Fire MAX. Dates and registration to be announced.",
  image: "/images/arena-stage.png",
});

const DETAILS = [
  { label: "Titles", value: "Five titles, three platforms" },
  { label: "Format", value: "Planned two-day event" },
  { label: "Divisions", value: "Planned open & member divisions" },
  { label: "Registration", value: "To be announced" },
];

const EXPECT = [
  {
    title: "One part of a wider programme",
    body: "The championship is the flagship named event, but it sits inside a recurring rhythm of league windows and quarterly tournaments rather than carrying the whole proposition.",
  },
  {
    title: "Academy, lounge and community in one field",
    body: "The Open Esports Championship 2026 brings Academy, lounge and community players into one multi-title competition experience.",
  },
  {
    title: "Accessible by design",
    body: "Built to be open to a broad field of players — from casual-to-competitive progression through to high-commitment squads.",
  },
];

export default function ChampionshipPage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
        <Image
          src="/images/event-crowd.jpg"
          alt="Players competing on stage at a live gaming event"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/88 to-ink-950/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/75"
        />
        <GridBackdrop className="opacity-70" />

        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-flame-700/25 blur-[120px]"
        />
        <RedArc className="pointer-events-none absolute -top-28 -left-24 h-[32rem] w-[32rem] opacity-80" />
        <DragonWatermark className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem]" />

        <div className="container-page relative py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Flagship Tournament</p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="display-1 mt-6">
                Open Esports
                <br />
                <span className="text-gradient">Championship 2026</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="lede mt-6 max-w-2xl">
                {CHAMPIONSHIP.headline} {CHAMPIONSHIP.copy}
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <StatusBadge tone="coming">Upcoming — 2026 season</StatusBadge>
                <StatusBadge tone="coming">
                  Registration to be announced
                </StatusBadge>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact/" size="lg">
                  Register your interest
                </Button>
                <Button href="#titles" variant="outline" size="lg">
                  View the titles
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Key details */}
      <section className="border-b border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((item) => (
            <div key={item.label} className="bg-navy-950 px-6 py-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                {item.label}
              </p>
              <p className="mt-2.5 text-[1rem] font-medium text-azure-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- Titles */}
      <section id="titles" className="section relative overflow-hidden">
        <SectionDragon side="left" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Tournament Titles"
                title="Five titles, three platforms."
                lede="Console, PC and mobile competition inside a single championship programme — each title with its own angle, bracket and running order."
              />
              <div className="md:pb-2">
                <StatusBadge tone="soon">Final line-up planned at launch</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {TOURNAMENTS.map((tournament, index) => (
              <Reveal
                key={tournament.title}
                delay={index * 60}
                /* Three equal cards across the first row, two centred below. */
                className={
                  index < 3
                    ? "lg:col-span-2"
                    : index === 3
                      ? "lg:col-span-2 lg:col-start-2"
                      : "sm:col-span-2 lg:col-span-2"
                }
              >
                <article className="card card-hover group relative h-full overflow-hidden p-6">
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-flame-600/10 blur-2xl"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="font-mono text-[0.75rem] font-medium tracking-[0.2em] text-flame-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-paper-200 uppercase">
                      {tournament.format}
                    </span>
                  </div>
                  <h3 className="relative mt-6 text-[1.25rem] leading-tight font-semibold tracking-[-0.01em] text-paper-50">
                    {tournament.title}
                  </h3>
                  <p className="relative mt-2.5 text-[0.875rem] leading-relaxed text-paper-300">
                    {tournament.note}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Tournament journey */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="right" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="The Tournament Journey"
              title="From interest to the Arena stage."
              tone="blue"
              lede="Every entrant follows the same clear route — no invited shortlists, no hidden brackets."
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="coming">Dates to be announced</StatusBadge>
              <StatusBadge tone="soon">Open &amp; member divisions planned</StatusBadge>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {TOURNAMENT_JOURNEY.map((stage) => (
                <li
                  key={stage.step}
                  className="grid gap-2 bg-ink-900/60 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
                    {stage.step}
                  </span>
                  <span className="text-[1rem] leading-relaxed text-paper-300">
                    {stage.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Expect */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="How It Fits"
              title="Flagship, not the whole story."
              tone="blue"
              lede="The championship works because it sits inside a living ecosystem — academy progression, lounge play, Realm Points and monthly league windows feed the field across the season."
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="soon">Two-day format planned</StatusBadge>
              <StatusBadge tone="soon">
                Member &amp; open divisions planned
              </StatusBadge>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="max-w-2xl space-y-6">
              {EXPECT.map((item, index) => (
                <li key={item.title} className="flex gap-5">
                  <span className="mt-0.5 font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-paper-50">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[1rem] leading-relaxed text-paper-300">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ Quarterly rhythm */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Wider Rhythm"
              title="Four tournament windows across the season."
              lede="The championship is the fourth and final window — the season-closing moment the earlier three build toward."
            />
          </Reveal>

          <div className="mt-10">
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {QUARTERLY_TOURNAMENTS.map((item) => (
                <li
                  key={item.slot}
                  className="grid gap-2 bg-ink-900/60 px-6 py-5 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
                    {item.slot}
                  </span>
                  <span className="text-[0.95rem] font-semibold text-paper-50">
                    {item.direction}
                  </span>
                  <span className="text-[1rem] leading-relaxed text-paper-300">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={100}>
            <p className="mt-6 text-[0.875rem] leading-relaxed text-paper-400">
              {QUARTERLY_NOTE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Atmosphere */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem]" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Tournament Atmosphere"
              title="Competition people can feel."
              lede="Reference photography from competitive gaming environments of the kind the championship is built around — stage, setup and crowd format."
              tone="blue"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                src: "/images/arena-stage.png",
                alt: "Pro teams competing on a stadium stage",
              },
              {
                src: "/images/keyarena_seattle.jpg",
                alt: "Packed arena watching a final on the big screen",
              },
              {
                src: "/images/copper_box_arena.jpg",
                alt: "Arena crowd around a lit competition stage",
              },
              {
                src: "/images/2-male-gamers-high-fiving.jpg",
                alt: "Two gamers celebrating a win with a high five",
              },
            ].map((image, index) => (
              <Reveal key={image.src} delay={index * 60}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 card card-pad">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <h3 className="text-[1.05rem] font-semibold text-paper-50">
                    Dates, entries and prize pool
                  </h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-paper-300">
                    Dates, registration and final event details will be
                    announced as they are confirmed. {CHAMPIONSHIP.prizePool}{" "}
                    The prize pool and event budget are not published
                    commitments until the event is funded and approved.
                  </p>
                </div>
                <StatusBadge tone="neutral">{SITE.statusLine}</StatusBadge>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Championship 2026"
        title="Register your interest."
        body="Tell the team whether you want to play, volunteer, cover or partner on the championship — we will confirm formats, eligibility and registration as the details are announced."
        primary={{ label: "Email the team", href: "/contact/" }}
        secondary={{ label: "See arena & events", href: "/arena-events/" }}
      />
    </>
  );
}
