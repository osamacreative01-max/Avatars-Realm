import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { FULL_DAY, LEADERSHIP, PARTNER_LABEL, PROGRESSION, VALUES } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/about/",
  title: "About",
  description:
    "Avatars Realm (Pty) Ltd is building an esports academy and gaming arena in Northcliff, Randburg — its mission, progression pathway, leadership and community direction.",
  image: "/images/community-play.jpg",
});

const DIRECTION = [
  {
    title: "Academy programmes",
    body: "Beginner, Intermediate and Pro programmes with coaching, review and league readiness built into every stage.",
    status: { label: "Enrolment opening soon", tone: "soon" as const },
  },
  {
    title: "Gaming lounge & memberships",
    body: "Accessible hourly rates, prepaid gaming packs and monthly memberships with Realm Points rewards.",
    status: { label: "Pilot pricing published", tone: "neutral" as const },
  },
  {
    title: "Arena, league & events",
    body: "A competition stage, monthly community league windows and four quarterly tournaments, anchored by the Open Esports Championship 2026.",
    status: { label: "Monthly league", tone: "soon" as const },
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            An academy and arena
            <br />
            built around progression.
          </>
        }
        lede="Avatars Realm (Pty) Ltd is developing a structured esports academy and gaming experience centre in Northcliff — a place where players start as beginners, grow through guided programmes, earn rewards through participation and progress toward competitive play."
        status={{ label: SITE.statusLine, tone: "soon" }}
        image={{
          src: "/images/esports-setup.jpg",
          alt: "Competitive gaming stations lit with RGB lighting",
        }}
      >
        <Button href="/academy-programmes/" size="lg">
          Explore Programmes
        </Button>
        <Button href="/contact/" variant="outline" size="lg">
          Email the team
        </Button>
      </PageHero>

      {/* --------------------------------------------------------- Who we are */}
      <section className="section relative overflow-hidden">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Who We Are"
              title="A destination and a progression journey."
              lede="Avatars Realm sells belonging, progression and exposure to an industry — not just wins. The organisation exists to give local players somewhere to start, improve and compete."
            />

            <div className="mt-8 card card-pad">
              <p className="eyebrow eyebrow-blue">Our Mission</p>
              <p className="measure mt-4 text-[1.05rem] leading-relaxed text-paper-100">
                A place to start as a beginner, grow through guided programmes,
                earn rewards through participation and progress toward
                competitive play.
              </p>
              <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
                A structured esports academy and gaming experience centre where
                players develop, communities connect and competition comes
                alive.
              </p>
            </div>

            <div className="measure mt-6 space-y-5 text-[1rem] leading-relaxed text-paper-300">
              <p>
                The academy delivers structured programmes; the gaming lounge
                keeps the door open to everyone; the league and tournament
                programme give members recurring reasons to return; the arena
                supports spectating, broadcasts and community events.
              </p>
              <p>
                We publish what we are building — programme structures, pilot
                pricing and status — as it stands. If something appears on this
                site, it is part of the plan we are working to, and we say
                plainly what is still to be confirmed.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="soon">Opening programme to be announced</StatusBadge>
              <StatusBadge tone="neutral">Proposed pilot pricing</StatusBadge>
              <StatusBadge tone="soon">Championship 2026</StatusBadge>
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
                <StatusBadge tone="neutral">{SITE.address}</StatusBadge>
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
              eyebrow="What We Are Building"
              title="Three connected programmes, one venue."
              lede="The commercial model is visible before every operational detail is finalised — so visitors can see what they can buy, join, practise, watch or return to."
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

      {/* --------------------------------------------------------- Pathway */}
      <section id="pathway" className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Development Pathway"
              title="Start as a beginner. Grow toward competition."
              tone="blue"
              lede="Education and competition are treated as connected. A player can begin with casual play and move through programmes, leagues and tournaments at their own pace."
            />
            <div className="mt-8">
              <Button href="/academy-programmes/">View programmes</Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {PROGRESSION.map((step) => (
                <li
                  key={step.step}
                  className="grid gap-2 bg-ink-900/60 px-6 py-5 sm:grid-cols-[7rem_1fr] sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
                    {step.step}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-paper-300">
                    {step.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- People */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="The people behind it."
              lede="A small leadership team runs the organisation day to day, with coaching capacity confirmed before each programme intake."
            />

            <div className="mt-8 space-y-4">
              {LEADERSHIP.map((person) => (
                <div key={person.role} className="card card-pad">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded border border-white/15 bg-white/[0.04] text-[0.65rem] font-semibold tracking-[0.06em] text-paper-400"
                    >
                      {person.name
                        ? person.name
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")
                        : "TBA"}
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

          <Reveal delay={90}>
            <SectionHeading
              eyebrow="How We Operate"
              title="What you can expect from us."
              tone="blue"
              lede="Honesty about status is a value, not a disclaimer."
            />

            <div className="mt-8 card card-pad">
              <h3 className="text-[0.95rem] font-semibold text-paper-50">
                Published, not negotiated
              </h3>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                Programme structures, membership entitlements, lounge rates and
                reward rules are all published on this site as proposed pilot
                pricing, and confirmed before enrolment opens.
              </p>
            </div>

            <div className="mt-4 card card-pad">
              <h3 className="text-[0.95rem] font-semibold text-paper-50">
                Future features stay marked as planned
              </h3>
              <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                Analytics, AI player feedback, manufacturer benefits and formal
                accreditation remain marked as planned or partner-dependent
                until they are contracted and verified. {PARTNER_LABEL}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- Values */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
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
                <div className="h-full bg-ink-900 p-7 transition-colors duration-200 hover:bg-ink-800">
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

      {/* -------------------------------------------------------- Community */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
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
              eyebrow="Community & Career Direction"
              title="Growing the scene around the venue."
              lede="Beyond competition, Avatars Realm is building routes into coaching, content creation and industry exposure — with future career pathways developed alongside partners."
            />
            <p className="measure mt-6 text-[1rem] leading-relaxed text-paper-300">
              The next phase is recurring participation: league windows,
              quarterly tournaments, community sessions and creator content
              that keep players connected between programmes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/arena-events/">Arena & Events</Button>
              <Button href="/memberships/" variant="outline">
                Memberships & Lounge
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Full day */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="A Full Day at Avatars Realm"
              title="Picture the whole journey."
              lede="Book a low-cost session, stay for food and community play, attend a coaching block, earn Realm Points, follow a league table, return for a quarterly tournament — and progress from Beginner to Pro."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {FULL_DAY.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <div className="h-full bg-ink-900 p-7 transition-colors duration-200 hover:bg-ink-800">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 min-h-[2.4rem] text-[1.05rem] font-semibold text-paper-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Eighth tile keeps the four-column grid balanced and closes the
                sequence with a conversion point. */}
            <Reveal delay={FULL_DAY.length * 50}>
              <div className="flex h-full flex-col justify-between bg-ink-900 p-7 transition-colors duration-200 hover:bg-ink-800">
                <div>
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                    {String(FULL_DAY.length + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 min-h-[2.4rem] text-[1.05rem] font-semibold text-paper-50">
                    Then do it again.
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                    Every visit builds on the last — hours, points, standings
                    and progress.
                  </p>
                </div>
                <div className="mt-6">
                  <Button href="/contact/" variant="outline" size="sm">
                    Register your interest
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Contact"
        title="Talk to the team."
        body="Ask a question about programmes, memberships, school groups or partnerships — we respond within one business day and confirm details as the opening programme is announced."
        primary={{ label: "Get in touch", href: "/contact/" }}
        secondary={{ label: "Championship 2026", href: "/open-esports-championship-2026/" }}
      />
    </>
  );
}
