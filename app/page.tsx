import Image from "next/image";
import Link from "next/link";

import AreaCard from "@/components/AreaCard";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import EventCard from "@/components/EventCard";
import Hero from "@/components/Hero";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  ACADEMY_AREAS,
  EVENTS,
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
        items={["In Development", "Planned", "Subject to Confirmation"]}
        speed={14}
      />

      {/* ------------------------------------------------------------- About */}
      <section className="section relative overflow-hidden">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/esports-setup.jpg"
                alt="Competitive gaming stations with RGB lighting"
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
              title="An organisation in formation, not a finished product."
              lede="We are building Avatars Realm deliberately: a credible esports and gaming organisation with a training direction and an events direction, described honestly at every stage."
            />

            <ul className="mt-8 max-w-2xl space-y-4">
              {[
                {
                  title: "Who we are",
                  body: "An emerging esports and gaming organisation establishing its identity, its people and its programme.",
                },
                {
                  title: "What we are developing",
                  body: "A proposed esports academy concept and a planned competitive event programme.",
                },
                {
                  title: "How we communicate",
                  body: "Confirmed information is published as confirmed. Everything else is labelled planned, proposed or subject to confirmation.",
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
        <DragonWatermark className="pointer-events-none absolute -top-20 -right-16 h-[24rem] w-[24rem] text-white/[0.04]" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Esports Academy"
                title="A proposed Starter Edition, still in development."
                lede="Ten to twenty PC stations, an academy space, a small arena, a gaming lounge and a streaming zone — presented as a concept while it is being developed."
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

      {/* ------------------------------------------------------------- Events */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Events"
                title="A planned programme of competitive and community events."
                lede="Event information is presented as planned or proposed. Dates, venues and registration are published only once confirmed."
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
          src="/images/event-crowd.jpg"
          alt="Players competing at a live gaming event"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950"
        />
        <RedArc className="pointer-events-none absolute -right-28 -bottom-32 h-[30rem] w-[30rem] -scale-100 opacity-70" />

        <div className="container-page relative py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Open Esports Championship 2026</p>
            <h2 className="display-2 mt-4">Five titles. One open championship.</h2>
            <p className="lede mt-5">
              Our flagship planned tournament brings together console, PC and
              mobile competition. Dates, venue, rules and registration are all
              subject to confirmation.
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
        title="Get in touch with Avatars Realm."
        body="Whether you are a player, a family, a school or a potential partner — if you want to follow the academy and the event programme as they develop, start here."
        primary={{ label: "Contact Avatars Realm", href: "/contact/" }}
        secondary={{ label: "About the organisation", href: "/about/" }}
      />
    </>
  );
}
