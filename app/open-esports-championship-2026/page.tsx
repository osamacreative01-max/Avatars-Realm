import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import TournamentTimeline from "@/components/TournamentTimeline";
import { CHAMPIONSHIP, QUARTERLY_COPY, QUARTERLY_NOTE } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/open-esports-championship-2026/",
  /* The tab was renamed "League - Tournaments - Events" — the route is
     unchanged so no link breaks. The hero keeps the old name until the
     client supplies new wording (TODO(client-confirm)). */
  title: "League - Tournaments - Events",
  description:
    "The Arena's flagship multi-title championship at Avatars Realm — EA Sports FC 26, Call of Duty BO6, Valorant, PUBG Mobile and League of Legends. Dates and registration to be announced.",
  image: "/images/arena-stage.png",
});

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
              {/* TODO(client-confirm): keep the current hero wording until the
                  client supplies new copy for the renamed page. The "View the
                  titles" button pointed at the removed Titles section and is
                  gone with it. */}
              <div className="mt-9 flex flex-wrap gap-3">
                <ContactForm
                  label="Register your interest"
                  size="lg"
                  defaultSubject="League, tournaments & events"
                />
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

      {/* Hero details (Titles / Format / Divisions / Registration), the
          five-title section and the tournament journey were removed from this
          page and moved into the downloadable brochure (content/
          brochure-content.md), per the handoff. */}

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
              <ContactForm
                label="Follow quarterly announcements"
                size="lg"
                defaultSubject="League, tournaments & events"
              />
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

          {/* The "Dates, entries and prize pool" note left this page for the
              downloadable brochure (content/brochure-content.md). */}
        </div>
      </section>

      {/* Moved here from Arena & Events per the handoff — this page now
          carries the quarterly tournaments and the event enquiries; the
          Community League sits on Academy Programmes. */}
      <CtaBand
        eyebrow="Event enquiries"
        title="Compete, spectate or host."
        body="Register your interest in league play, a quarterly tournament, watch parties or hosting an event at the arena — the team confirms formats and dates as the programme is announced."
        primary={{
          label: "Send an event enquiry",
          contact: true,
          subject: "League, tournaments & events",
        }}
        secondary={{ label: "View memberships", href: "/memberships/" }}
      />
    </>
  );
}
