import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import EventCard from "@/components/EventCard";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import {
  ARENA_EVENTS,
  ARENA_ZONES,
  CHAMPIONSHIP,
  LEAGUE,
  QUARTERLY_COPY,
  QUARTERLY_NOTE,
  QUARTERLY_TOURNAMENTS,
  TOURNAMENTS,
} from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Arena & Events",
  description:
    "The Avatars Realm arena — PC zone, academy rooms, stage, social lounge and content corner, with community league play, quarterly tournaments and the Open Esports Championship 2026.",
};

export default function ArenaEventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Arena & Events"
        title={
          <>
            A destination for play,
            <br />
            spectating and competition.
          </>
        }
        lede="A complete gaming experience centre — PC zone, academy rooms, a competition stage, a social lounge, a content corner and food and beverage — with a recurring league and tournament programme."
        status={{ label: SITE.statusLine, tone: "soon" }}
        image={{
          src: "/images/event-crowd.jpg",
          alt: "Players competing at a live gaming event",
        }}
      >
        <Button href="#quarterly" size="lg">
          Tournament windows
        </Button>
        <Button href="/contact/" variant="outline" size="lg">
          Register your interest
        </Button>
      </PageHero>

      {/* ------------------------------------------------------------ Zones */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Arena Experience"
              title="A gaming experience centre, not a room with PCs."
              lede="Every zone has a job: some open with the launch programme, others are future-ready spaces that complete the destination."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARENA_ZONES.map((zone, index) => (
              <Reveal key={zone.title} delay={(index % 3) * 70}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="card-media relative aspect-[4/3]">
                    <Image
                      src={zone.image}
                      alt={zone.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="display-3">{zone.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
                      {zone.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Eighth tile balances the grid and converts the section. */}
            <Reveal delay={140} className="lg:col-span-2">
              <div className="card flex h-full flex-col justify-between card-pad">
                <div>
                  <StatusBadge tone="soon">
                    Opening programme to be announced
                  </StatusBadge>
                  <h3 className="display-3 mt-5">Come and see it.</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
                    Some zones open with the launch programme, others are
                    future-ready. Register your interest and be first to know
                    what opens, and when.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/contact/" variant="primary" size="sm">
                    Register interest
                  </Button>
                  <Button href="/memberships/" variant="outline" size="sm">
                    Lounge rates
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ League */}
      <section
        id="league"
        className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950"
      >
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Community League"
              title="A reason to come back, month after month."
              lede={LEAGUE.copy}
              tone="blue"
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="soon">Windows announced at launch</StatusBadge>
              <StatusBadge tone="neutral">Realm Points earned</StatusBadge>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/" size="lg">
                Join the league
              </Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {LEAGUE.structure.map((line) => (
                <li key={line} className="flex gap-4 bg-ink-900/60 px-6 py-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-flame-600"
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-paper-300">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Quarterly */}
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
                  <span className="text-[0.9375rem] leading-relaxed text-paper-300">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={120}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-300">
              <StatusBadge tone="neutral">
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

      {/* ----------------------------------------------------- Event list */}
      <section className="section relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="right" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Programme"
              title="What the calendar looks like."
              lede="League windows, quarterly tournaments, the flagship championship and community sessions — one recurring rhythm instead of one-off events."
              tone="blue"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ARENA_EVENTS.map((event, index) => (
              <Reveal key={event.title} delay={index * 70}>
                <EventCard
                  title={event.title}
                  description={event.description}
                  status={event.status}
                  href={event.href}
                  image={event.image}
                  alt={event.alt}
                  ctaLabel={event.ctaLabel}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Championship */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
        <Image
          src="/images/audience.jpg"
          alt="Audience gathered at an indoor event"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/88 to-ink-950"
        />
        <RedArc className="pointer-events-none absolute -bottom-28 -left-24 h-[26rem] w-[26rem] -rotate-90 opacity-70" />

        <div className="container-page relative py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Flagship event</p>
            <h2 className="display-2 mt-4">Open Esports Championship 2026</h2>
            <p className="lede mt-5">
              The named championship sits inside the recurring event rhythm
              rather than carrying the whole calendar — {CHAMPIONSHIP.copy}
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
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

          <Reveal delay={160}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-200">
              <StatusBadge tone="soon">Registration to be announced</StatusBadge>
              {CHAMPIONSHIP.prizePool}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10">
              <Button href="/open-esports-championship-2026/" size="lg">
                Championship details
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

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
