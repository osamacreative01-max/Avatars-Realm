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
import TournamentCard from "@/components/TournamentCard";
import { EVENTS, TOURNAMENTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "The Avatars Realm event programme — monthly academy showcases, weekly community play and the Open Esports Championship 2026, all from the Northcliff arena.",
};

const PROGRAMME = [
  {
    title: "Competitive events",
    body: "Tournaments across console, PC and mobile titles, led by the Open Esports Championship 2026 and the in-house league.",
  },
  {
    title: "Academy showcases",
    body: "A monthly ticketed night on the main arena stage where members present their progress in front of a crowd.",
  },
  {
    title: "Community sessions",
    body: "Weekly open play, casual ladders and meet-ups that keep the local scene connected between events.",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title={
          <>
            A programme that
            <br />
            runs all year.
          </>
        }
        lede="Showcases, community nights and championship qualifying run from the Northcliff arena every month. Tickets and entry are handled at reception and by email."
        status={{ label: "Events running weekly", tone: "live" }}
        image={{
          src: "/images/event-crowd.jpg",
          alt: "Players competing at a live gaming event",
        }}
      />

      {/* -------------------------------------------------------- Programme */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Event Programme"
              title="Three strands, one direction."
              lede="The programme runs on three connected formats, all booked through the same team and all hosted on our own floor."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROGRAMME.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="card h-full card-pad">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-3 mt-5">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Notices */}
      <section className="border-y border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-px bg-white/[0.07] sm:grid-cols-3">
          {[
            { label: "Calendar", value: "Published monthly" },
            { label: "Venue", value: "9 Madge Ave, Northcliff" },
            { label: "Registration", value: "Open at reception & by email" },
          ].map((item) => (
            <div key={item.label} className="bg-navy-950 px-6 py-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                {item.label}
              </p>
              <p className="mt-2 text-[0.9375rem] font-medium text-azure-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- Event list */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Upcoming & Recurring"
                title="What is on."
              />
              <div className="md:pb-2">
                <StatusBadge tone="live">Booking now</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((event, index) => (
              <Reveal key={event.title} delay={index * 70}>
                <EventCard
                  title={event.title}
                  description={event.description}
                  status={event.status}
                  href={event.href}
                  image={event.image}
                  alt={event.alt}
                  ctaLabel={event.href === "/contact/" ? "Get tickets" : "View Event"}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-10 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-200">
              <StatusBadge tone="neutral">Please note</StatusBadge>
              Entry is booked at reception, by email or by phone — places are
              limited by station capacity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Championship */}
      <section className="relative isolate overflow-hidden border-y border-white/[0.07]">
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
        <GridBackdrop className="opacity-50" />
        <RedArc className="pointer-events-none absolute -bottom-28 -left-24 h-[26rem] w-[26rem] -rotate-90 opacity-70" />
        <SectionDragon side="right" />

        <div className="container-page relative py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Flagship event</p>
            <h2 className="display-2 mt-4">Open Esports Championship 2026</h2>
            <p className="lede mt-5">
              The centrepiece of the calendar: five titles across console, PC and
              mobile, hosted on the main arena stage on 21–22 November 2026.
              Entries are open now, with qualifying ladders running on the floor.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOURNAMENTS.map((tournament, index) => (
              <Reveal key={tournament.title} delay={index * 60}>
                <TournamentCard
                  title={tournament.title}
                  format={tournament.format}
                  note={tournament.note}
                  index={index}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
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
        title="Hosting, competing or covering an event?"
        body="Tell us what you have in mind — tickets, team entries, venue hire or coverage — and the events team will confirm what is possible."
        primary={{ label: "Get in touch", href: "/contact/" }}
        secondary={{ label: "Team bookings", href: "/pricing/" }}
      />
    </>
  );
}
