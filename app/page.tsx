import Image from "next/image";
import Link from "next/link";

import AreaCard from "@/components/AreaCard";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import EventCard from "@/components/EventCard";
import Hero from "@/components/Hero";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import {
  ACADEMY_AREAS,
  EVENTS,
  SUBSCRIPTIONS,
  TOURNAMENTS,
} from "@/lib/content";

export default function HomePage() {
  const academyPreview = [ACADEMY_AREAS[0], ACADEMY_AREAS[2], ACADEMY_AREAS[4]];
  const eventPreview = [EVENTS[0], EVENTS[2]];

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <Hero />

      {/* ----------------------------------------------------------- Marquee */}
      <Marquee
        items={[
          "Open 7 Days",
          "Coached Subscriptions",
          "Walk-ins Welcome",
          "Free Intake Session",
          "Junior Programmes",
          "Team Bootcamps",
        ]}
        speed={22}
      />

      {/* ------------------------------------------------------------- About */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/20220302-Telkom-VR-Gaming2-980x613.jpg"
                alt="Players competing at a row of gaming stations"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent"
              />
            </div>
            <RedArc className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 -rotate-90" />
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading
              eyebrow="About Avatars Realm"
              title="An academy that trains, an arena that runs."
              lede="Avatars Realm is an established esports and gaming organisation in Northcliff: a coached academy, a public arena floor and a competitive event programme, all operating under one roof."
            />

            <ul className="mt-8 max-w-2xl space-y-4">
              {[
                {
                  title: "Who we are",
                  body: "A full-time academy and arena run by coaches, event staff and a founder-director since 2023.",
                },
                {
                  title: "What we run",
                  body: "Three subscription tracks, open arena play, junior holiday programmes, team bootcamps and a monthly showcase calendar.",
                },
                {
                  title: "How we price",
                  body: "Every rate is published up front — month-to-month memberships, no joining fee and a free coached intake session.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-flame-600"
                  />
                  <div>
                    <h3 className="text-[0.95rem] font-semibold text-paper-50">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-paper-300">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button href="/about/" variant="primary">
                More about Avatars Realm
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- Academy */}
      <section className="section relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="left" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Esports Academy"
                title="A working academy, built around a weekly rhythm."
                lede="Twenty competitive PC stations, an academy studio, the main arena, a gaming lounge and a streaming zone — open daily and running a full coaching timetable."
              />
              <div className="md:pb-2">
                <Button href="/esports-academy/" variant="primary">
                  View the Academy
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {academyPreview.map((area, index) => (
              <Reveal key={area.title} delay={index * 70}>
                <AreaCard
                  title={area.title}
                  description={area.description}
                  image={area.image}
                  alt={area.alt}
                  index={index}
                />
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------- Pricing */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Membership Pricing"
                title="Coached memberships from R450 per month."
                lede="Three subscription tracks covering training blocks, coaching reviews and unlimited arena access — billed monthly, cancellable with a week's notice."
              />
              <div className="md:pb-2">
                <Button href="/pricing/" variant="primary">
                  All pricing
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {SUBSCRIPTIONS.map((tier, index) => (
              <Reveal key={tier.id} delay={index * 70}>
                <div
                  className={`card flex h-full flex-col card-pad ${
                    tier.featured ? "border-flame-600/55" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
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
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-paper-300">
                    {tier.summary}
                  </p>
                  <div className="mt-6">
                    <Link href="/pricing/" className="arrow-link">
                      See what&apos;s included <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-300">
              <StatusBadge tone="neutral">No membership required</StatusBadge>
              The arena floor is also open to drop-ins from R45 per hour, with
              junior programmes and team bookings published on the pricing page.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- Events */}
      <section className="section relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="left" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Events"
                title="A running programme of competitive and community events."
                lede="Monthly showcases on the arena stage, weekly community play, and the flagship Open Esports Championship returning in 2026."
              />
              <div className="md:pb-2">
                <Button href="/events/" variant="primary">
                  All events
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {eventPreview.map((event, index) => (
              <Reveal key={event.title} delay={index * 70}>
                <EventCard
                  title={event.title}
                  description={event.description}
                  status={event.status}
                  href={event.href}
                  image={event.image}
                  alt={event.alt}
                />
              </Reveal>
            ))}
          </div>
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
        <SectionDragon side="left" />

        <div className="container-page relative py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Open Esports Championship 2026</p>
            <h2 className="display-2 mt-4">Five titles. One open championship.</h2>
            <p className="lede mt-5">
              Our flagship tournament brings together console, PC and mobile
              competition on the main arena stage — 21–22 November 2026. Entries
              are open now, with qualifying ladders running on the floor.
            </p>
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

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/open-esports-championship-2026/" size="lg">
                Championship details
              </Button>
              <Link href="/contact/" className="arrow-link">
                Speak to the team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Come and train with Avatars Realm."
        body="Book a free coached intake session, try the arena floor, or ask about memberships for juniors, teams and squads. We will get you on a station the same week."
        primary={{ label: "Book a free session", href: "/contact/" }}
        secondary={{ label: "See all pricing", href: "/pricing/" }}
      />
    </>
  );
}
