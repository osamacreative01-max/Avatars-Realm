import Image from "next/image";
import Link from "next/link";

import AreaCard from "@/components/AreaCard";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import Hero from "@/components/Hero";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import {
  ARENA_ZONES,
  CHAMPIONSHIP,
  LEAGUE,
  MEMBERSHIPS,
  PATHWAYS,
  PROGRAMMES,
  QUARTERLY_COPY,
  QUARTERLY_NOTE,
  QUARTERLY_TOURNAMENTS,
  TOURNAMENTS,
} from "@/lib/content";

/** Effective hourly value of each membership, shown up front. */
const MEMBERSHIP_VALUE = [
  { id: "social", value: "≈ R50 per gaming hour" },
  { id: "competitive", value: "≈ R37 per gaming hour" },
  { id: "pro-pathway", value: "≈ R40 per gaming hour" },
] as const;

const zonePreview = [ARENA_ZONES[0], ARENA_ZONES[2], ARENA_ZONES[3]];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <Hero />

      {/* ----------------------------------------------------------- Marquee */}
      <Marquee
        items={[
          "Train. Play. Compete. Belong.",
          "Esports Academy Programmes",
          "Gaming Lounge Memberships",
          "Realm Points Rewards",
          "Community League",
          "Quarterly Tournaments",
        ]}
        speed={24}
      />

      {/* -------------------------------------------------------- Pathways */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Avatars Realm Ecosystem"
              title="One destination, four ways in."
              lede="Avatars Realm is an esports academy and gaming experience centre. Whether you want to learn, play casually, compete or build toward a career, there is a clear way in — and a reason to come back."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {PATHWAYS.map((pathway, index) => (
              <Reveal key={pathway.title} delay={index * 60}>
                <div className="flex h-full flex-col bg-ink-900 p-7 transition-colors duration-200 hover:bg-ink-800">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-3 mt-4">{pathway.title}</h3>
                  <p className="mt-2 min-h-[2.7rem] text-[0.8125rem] font-semibold tracking-[0.04em] text-azure-400 uppercase">
                    {pathway.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-paper-300">
                    {pathway.description}
                  </p>
                  <Link href={pathway.href} className="arrow-link mt-6 pt-1">
                    {pathway.cta} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Programmes */}
      <section className="section relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="left" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Academy Programmes"
                title="A clear path from beginner to pro."
                lede="Three monthly-fee pathways for every stage — you do not need to be elite to start. Each carries a published commitment, outcome and proposed pilot fee."
              />
              <div className="md:pb-2">
                <Button href="/academy-programmes/" variant="primary">
                  Explore Programmes
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PROGRAMMES.map((programme, index) => (
              <Reveal key={programme.id} delay={index * 70}>
                <div className="card flex h-full flex-col card-pad">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="display-3">{programme.name}</h3>
                    <StatusBadge tone="neutral">{programme.duration}</StatusBadge>
                  </div>
                  <p className="mt-4 text-[0.9375rem] font-semibold text-azure-400">
                    {programme.headline}
                  </p>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-[1rem] font-semibold text-flame-400">
                      R
                    </span>
                    <span className="text-[2.5rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                      {programme.price}
                    </span>
                    <span className="pb-1 text-[0.875rem] text-paper-400">
                      {programme.period}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-paper-400">
                    {programme.commitment} commitment · proposed pilot fee
                  </p>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-paper-300">
                    {programme.copy}
                  </p>
                  <div className="mt-6">
                    <Link href="/academy-programmes/" className="arrow-link">
                      View programme <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------- Memberships */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" size="h-[30rem] w-[30rem]" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Memberships & Gaming Lounge"
                title="The easiest way into Avatars Realm."
                lede="Start with an hourly session, or choose a monthly membership that bundles gaming hours, coaching and Realm Points — the effective hourly value is shown clearly on each tier."
              />
              <div className="md:pb-2">
                <Button href="/memberships/" variant="primary">
                  View Memberships
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {MEMBERSHIPS.filter((tier) => tier.id !== "institution").map(
              (tier, index) => {
                const value = MEMBERSHIP_VALUE.find(
                  (item) => item.id === tier.id,
                );

                return (
                  <Reveal key={tier.id} delay={index * 70}>
                    <div
                      className={`card flex h-full flex-col card-pad ${
                        tier.featured ? "border-flame-600/55" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 lg:min-h-[4.75rem]">
                        <h3 className="display-3">{tier.name}</h3>
                        {tier.featured ? (
                          <StatusBadge tone="live">Most popular</StatusBadge>
                        ) : null}
                      </div>
                      <div className="mt-5 flex items-end gap-2">
                        <span className="text-[1rem] font-semibold text-flame-400">
                          R
                        </span>
                        <span className="text-[2.5rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                          {tier.price}
                        </span>
                        <span className="pb-1 text-[0.875rem] text-paper-400">
                          {tier.period}
                        </span>
                      </div>
                      {value ? (
                        <p className="mt-3 text-[0.8125rem] font-semibold tracking-[0.04em] text-azure-400 uppercase">
                          {value.value}
                        </p>
                      ) : null}
                      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-paper-300">
                        {tier.includes[0]} — plus booking priority and Realm
                        Points on everything you play.
                      </p>
                      <div className="mt-6">
                        <Link href="/memberships/" className="arrow-link">
                          See what&apos;s included <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                );
              },
            )}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------- Arena & Zones */}
      <section className="section relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="left" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Arena Experience"
                title="A gaming experience centre, not a room with PCs."
                lede="Seven working zones — PC gaming, academy rooms, the competition stage and more — connected by coaching, league play and events."
              />
              <div className="md:pb-2">
                <Button href="/arena-events/" variant="primary">
                  Tour the Arena
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {zonePreview.map((zone, index) => (
              <Reveal key={zone.title} delay={index * 70}>
                <AreaCard
                  title={zone.title}
                  description={zone.description}
                  image={zone.image}
                  alt={zone.alt}
                  index={index}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- League */}
      <section id="league" className="section relative overflow-hidden">
        <SectionDragon side="right" size="h-[20rem] w-[20rem]" />
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Community League"
              title="A reason to come back, month after month."
              lede={LEAGUE.copy}
            />
            <div className="mt-8">
              <Button href="/arena-events/#league" size="lg">
                How the league works
              </Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {LEAGUE.structure.slice(0, 5).map((line) => (
                <li key={line} className="flex gap-4 bg-ink-900/85 px-6 py-4">
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

      {/* ------------------------------------------------ Quarterly windows */}
      <section
        id="quarterly"
        className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950"
      >
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Quarterly Tournaments"
              title="Four headline moments to train toward."
              lede={QUARTERLY_COPY}
              tone="blue"
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
                  <span className="text-[0.9375rem] leading-relaxed text-paper-300">
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

      {/* ------------------------------------------------------ Championship */}
      <section className="relative isolate overflow-hidden border-y border-white/[0.07]">
        <Image
          src="/images/sse_arena_wembley.jpg"
          alt="A packed arena crowd under red and blue stage lights"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950"
        />
        <RedArc className="pointer-events-none absolute -right-28 -bottom-32 h-[30rem] w-[30rem] -scale-100 opacity-70" />
        <SectionDragon side="right" />

        <div className="container-page relative py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Open Esports Championship 2026</p>
            <h2 className="display-2 mt-4">{CHAMPIONSHIP.headline}</h2>
            <p className="lede mt-5">{CHAMPIONSHIP.copy}</p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {TOURNAMENTS.map((tournament, index) => (
              <Reveal key={tournament.title} delay={index * 50}>
                <span className="inline-flex items-center gap-2.5 rounded border border-white/12 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm">
                  <span className="text-[0.875rem] font-semibold text-paper-50">
                    {tournament.title}
                  </span>
                  <span className="text-[0.75rem] font-medium tracking-[0.08em] text-flame-400 uppercase">
                    {tournament.format}
                  </span>
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-200">
              <StatusBadge tone="soon">Registration to be announced</StatusBadge>
              {CHAMPIONSHIP.prizePool}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/open-esports-championship-2026/" size="lg">
                Championship details
              </Button>
              <Link href="/contact/" className="arrow-link">
                Register your interest <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Get in Touch"
        title="Where players start, improve, compete and find their people."
        body="Email the team about programmes, memberships, school groups, league entry or event hosting — we will point you to the right way in and confirm details as the opening programme is announced."
        primary={{ label: "Email the team", href: "/contact/" }}
        secondary={{ label: "View programmes", href: "/academy-programmes/" }}
      />
    </>
  );
}
