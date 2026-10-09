import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { LEADERSHIP, VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Avatars Realm",
  description:
    "Who Avatars Realm is, the direction of its esports and gaming work, its current establishment status, leadership and future vision.",
};

const DIRECTION = [
  {
    title: "Academy development",
    body: "A proposed Starter Edition for structured learning, practice and competitive development — currently being shaped rather than delivered.",
    status: { label: "In Development", tone: "dev" as const },
  },
  {
    title: "Event programme",
    body: "A planned calendar of competitive and community events, led by the Open Esports Championship 2026.",
    status: { label: "Planned", tone: "planned" as const },
  },
  {
    title: "Community building",
    body: "A long-term effort to grow a local gaming community that players, families and partners can trust.",
    status: { label: "Proposed", tone: "neutral" as const },
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            An emerging organisation, <br className="hidden sm:block" />
            described honestly.
          </>
        }
        lede="Avatars Realm (Pty) Ltd is being established as an esports and gaming organisation. This page explains who we are, what we are working on, and what is still to be confirmed."
        status={{ label: "Establishment in Progress", tone: "dev" }}
        image={{
          src: "/images/esports-setup.jpg",
          alt: "Competitive gaming stations lit with RGB lighting",
        }}
      />

      {/* --------------------------------------------------------- Who we are */}
      <section className="section relative overflow-hidden">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Who We Are"
              title="We are building Avatars Realm in the open."
              lede="Our aim is straightforward: to establish a credible online presence that explains our direction, and gives people a clear way to make contact while the organisation takes shape."
            />

            <div className="measure mt-8 space-y-5 text-[1rem] leading-relaxed text-paper-300">
              <p>
                Avatars Realm operates at the intersection of competitive
                gaming, structured development and community events. The
                organisation and its initiatives are still being established, so
                we describe them as building, developing, planned, proposed or
                in development — because that is exactly where they are.
              </p>
              <p>
                We would rather publish an accurate picture of an organisation
                under construction than an impressive picture of one that does
                not exist yet. Where information is not confirmed, it is
                labelled as such across the entire site.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="dev">Building</StatusBadge>
              <StatusBadge tone="dev">Developing</StatusBadge>
              <StatusBadge tone="planned">Planned</StatusBadge>
              <StatusBadge tone="neutral">Proposed</StatusBadge>
            </div>
          </Reveal>

          <Reveal delay={90} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/team-play.jpg"
                alt="Esports team playing together at their stations"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent"
              />
              <div className="absolute right-5 bottom-5 left-5">
                <StatusBadge tone="neutral">Currently in development</StatusBadge>
              </div>
            </div>
            <DragonWatermark className="pointer-events-none absolute -top-14 -left-14 h-56 w-56 text-white/[0.05]" />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Direction */}
      <section className="section-tight border-y border-white/[0.07] bg-navy-950">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Our Direction"
              title="Esports and gaming, with a development bias."
              lede="Three connected directions guide the organisation. Each one carries its own honest status."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {DIRECTION.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="card h-full card-pad">
                  <StatusBadge tone={item.status.tone}>
                    {item.status.label}
                  </StatusBadge>
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

      {/* ----------------------------------------------------------- Status */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Current Status"
              title="What stage we are actually at."
              tone="blue"
              lede="Everything is in development — nothing on this site claims a facility, academy or event is already operating."
            />

            <div className="mt-8 card card-pad">
              <h3 className="text-[0.95rem] font-semibold text-paper-50">
                Established as
              </h3>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                A company building its brand, its people and its programme. No
                facility opening date, confirmed venue, event date or
                registration window is published, because none has been
                confirmed.
              </p>
            </div>

            <div className="mt-4 card card-pad">
              <h3 className="text-[0.95rem] font-semibold text-paper-50">
                Not yet claimed
              </h3>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                Partnerships, sponsors, prize pools, awards, student numbers,
                player counts and tournament results are not stated anywhere on
                this website.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <SectionHeading
              eyebrow="Leadership"
              title="The people behind it."
              lede="Two roles carry the organisation forward while it is being established."
            />

            <div className="mt-8 space-y-4">
              {LEADERSHIP.map((person) => (
                <div key={person.role} className="card card-pad">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded border border-flame-600/40 bg-flame-600/10 text-[0.8rem] font-semibold text-flame-400"
                    >
                      {(person.name ?? person.role)
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <h3 className="text-[1rem] font-semibold text-paper-50">
                        {person.name ?? person.role}
                      </h3>
                      {person.name ? (
                        <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-flame-400">
                          {person.role}
                        </p>
                      ) : null}
                      <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                        {person.focus}
                      </p>
                      <p className="mt-3 text-[0.8125rem] text-paper-400 italic">
                        {person.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- Values */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Values"
              title="What we hold to while we build."
            />
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 60}>
                <div className="h-full bg-navy-950 p-7 transition-colors duration-200 hover:bg-navy-900">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-paper-50">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Vision */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/audience.jpg"
                alt="Audience gathered at an indoor community event"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/75 to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Future Vision"
              title="A place where players can develop and compete."
              lede="Our long-term direction is an organisation that supports structured development and meaningful competition — an academy environment, a sustainable events programme, and a community that stays engaged between the two."
            />
            <p className="measure mt-6 text-[1rem] leading-relaxed text-paper-300">
              The vision is deliberately ambitious and deliberately unproven.
              Each part of it moves forward only when it can be described
              accurately, and every milestone we reach will be published as
              confirmed rather than anticipated.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/esports-academy/">Explore the Academy</Button>
              <Button href="/events/" variant="outline">
                See the events programme
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Contact"
        title="Want to follow the build?"
        body="Ask a question, raise a proposal or register your interest in the academy and event programme. We will respond with what is confirmed."
        primary={{ label: "Get in touch", href: "/contact/" }}
        secondary={{ label: "Championship 2026", href: "/open-esports-championship-2026/" }}
      />
    </>
  );
}
