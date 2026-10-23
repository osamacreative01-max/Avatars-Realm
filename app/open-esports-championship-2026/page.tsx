import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import TournamentTimeline from "@/components/TournamentTimeline";
import { CHAMPIONSHIP, QUARTERLY_COPY, QUARTERLY_NOTE, TOURNAMENT_JOURNEY, TOURNAMENTS } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/open-esports-championship-2026/",
  title: "Open Esports Championship 2026",
  description:
    "The Arena's flagship multi-title championship at Avatars Realm — EA Sports FC 26, Call of Duty BO6, Valorant, PUBG Mobile and League of Legends. Dates and registration to be announced.",
  image: "/images/arena-stage.png",
});

const DETAILS = [
  { label: "Titles", value: "Five titles, three platforms" },
  { label: "Format", value: "Planned two-day event" },
  { label: "Divisions", value: "Planned open & member divisions" },
  { label: "Registration", value: "To be announced" },
];

export default function ChampionshipPage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
        {/* Same pre-graded banner treatment as PageHero: the artwork is dark
            down the left already, so it runs at full strength behind a light
            scrim instead of being crushed. */}
        <Image
          src="/images/page-banners/open-championship-2026.jpg"
          alt="A packed esports arena with a lit stage and a live crowd"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/55 to-ink-950/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/40"
        />
        <GridBackdrop className="opacity-40" />

        <RedArc className="pointer-events-none absolute -top-28 -left-24 h-[32rem] w-[32rem] opacity-45" />
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
                {/* Championship detail within the supplied brochure. */}
                <Button
                  href="/downloads/avatars-realm-brochure.pdf"
                  variant="outline"
                  size="lg"
                >
                  Download the brochure
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

      {/* ------------------------------------------------------ Quarterly */}
      {/* Moved here from Arena & Events per the handoff; replaces the older
          "Wider Rhythm" block so the timeline is not duplicated. */}
      <section id="quarterly" className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Quarterly Tournaments"
                title="Four headline moments a year."
                lede={QUARTERLY_COPY}
              />
              <div className="md:pb-2">
                <StatusBadge tone="soon">Title rotation planned</StatusBadge>
              </div>
            </div>
          </Reveal>

          <TournamentTimeline />

          <Reveal delay={120}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[1rem] text-paper-300">
              <StatusBadge tone="soon">
                Member &amp; open divisions planned
              </StatusBadge>
              Tournaments combine open divisions, member divisions, academy
              showcases, spectator experiences and future brand activations.
              {` ${QUARTERLY_NOTE}`}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/" size="lg">
                Follow quarterly announcements
              </Button>
            </div>
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
              title="Feel the Action."
              lede="Get a front-row seat to the competition. Experience the energy, cheer on your favourites and watch champions rise. Find an event and book your ticket."
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
                src: "/images/team-play.jpg",
                alt: "Players at a live event on orange arena seating behind a Game Time lit desk",
              },
              {
                src: "/images/duo-competition.jpg",
                alt: "Two players focused side by side during a competitive match",
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

      {/* Moved here from Arena & Events per the handoff — this page now
          carries the league, the quarterly tournaments and event enquiries. */}
      <CtaBand
        eyebrow="Event enquiries"
        title="Compete, spectate or host."
        body="Register your interest in league play, a quarterly tournament, watch parties or hosting an event at the arena — the team confirms formats and dates as the programme is announced."
        primary={{ label: "Email the team", href: "/contact/" }}
        secondary={{ label: "View memberships", href: "/memberships/" }}
      />
    </>
  );
}
