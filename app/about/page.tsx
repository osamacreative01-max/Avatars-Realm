import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { LEADERSHIP, VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Avatars Realm",
  description:
    "Avatars Realm (Pty) Ltd is an established esports academy and gaming arena in Northcliff, Randburg — its people, its programme and how it operates.",
};

const DIRECTION = [
  {
    title: "Esports academy",
    body: "Three coached membership tracks running six days a week, with assessments, VOD review and an in-house league.",
    status: { label: "Open", tone: "live" as const },
  },
  {
    title: "Gaming arena",
    body: "Twenty PC stations, console bays, a lounge and streaming booths open to the public at published rates.",
    status: { label: "Open", tone: "live" as const },
  },
  {
    title: "Event programme",
    body: "Monthly showcases, weekly community play and the flagship Open Esports Championship 2026.",
    status: { label: "Running", tone: "neutral" as const },
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            An established academy <br className="hidden sm:block" />
            and arena.
          </>
        }
        lede="Avatars Realm (Pty) Ltd has been running a coached esports academy and a public gaming arena from Northcliff since 2023. This page explains who we are, what we operate and how to join."
        status={{ label: "Operating since 2023", tone: "live" }}
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
              title="A training floor and a competition floor, run as one business."
              lede="Our aim is straightforward: give local players a place to improve, a place to play, and a calendar worth showing up for — with prices and capacity published openly."
            />

            <div className="measure mt-8 space-y-5 text-[1rem] leading-relaxed text-paper-300">
              <p>
                Avatars Realm operates at the intersection of competitive
                gaming, structured coaching and community events. The academy
                delivers the coaching; the arena keeps the doors open to
                everyone else; the event programme ties the two together.
              </p>
              <p>
                We publish what we run: session timetables, membership
                entitlements, drop-in rates and event dates. If something appears
                on this site, it is available to book today.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="live">Open 7 days</StatusBadge>
              <StatusBadge tone="live">Accepting members</StatusBadge>
              <StatusBadge tone="neutral">Published pricing</StatusBadge>
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
                <StatusBadge tone="live">9 Madge Ave, Northcliff</StatusBadge>
              </div>
            </div>
            <DragonWatermark className="pointer-events-none absolute -top-14 -left-14 h-56 w-56" />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Direction */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <SectionDragon side="right" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="What We Operate"
              title="Three connected programmes, one venue."
              lede="Everything below is running now, on the floor at Northcliff."
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
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="How We Operate"
              title="What you can expect from us."
              tone="blue"
              lede="An established venue should be easy to deal with. These are the commitments we hold to on the floor and on this site."
            />

            <div className="mt-8 card card-pad">
              <h3 className="text-[0.95rem] font-semibold text-paper-50">
                Published, not negotiated
              </h3>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                Membership entitlements, drop-in rates, junior programmes and
                booking fees are all listed on the pricing page. The price you
                see is the price you pay.
              </p>
            </div>

            <div className="mt-4 card card-pad">
              <h3 className="text-[0.95rem] font-semibold text-paper-50">
                Capacity you can rely on
              </h3>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                Twenty PC stations, a 120-seat arena and six streaming booths.
                Members book sessions ahead; the arena floor takes walk-ins while
                stations are free.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <SectionHeading
              eyebrow="Leadership"
              title="The people behind it."
              lede="Two roles run the organisation day to day."
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
        <SectionDragon side="right" />
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Values"
              title="What we hold to on the floor."
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
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/young-professional-esports-players-playing-games-i-2021-12-09-13-29-30-utc.jpg"
                alt="Two esports players in team jerseys competing at their PCs"
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
              eyebrow="What's Next"
              title="Growing the scene around the venue."
              lede="The next phase is competitive: bigger in-house leagues, more showcase nights and a full qualifying ladder feeding into the Open Esports Championship 2026."
            />
            <p className="measure mt-6 text-[1rem] leading-relaxed text-paper-300">
              We add what the floor can support properly — more coaching staff,
              more titles and more event days — rather than promising what we
              cannot staff.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/esports-academy/">Explore the Academy</Button>
              <Button href="/pricing/" variant="outline">
                See pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Contact"
        title="Come and see the floor."
        body="Ask a question, book a free coached intake session or arrange a venue tour. We respond within one business day."
        primary={{ label: "Get in touch", href: "/contact/" }}
        secondary={{ label: "Championship 2026", href: "/open-esports-championship-2026/" }}
      />
    </>
  );
}
