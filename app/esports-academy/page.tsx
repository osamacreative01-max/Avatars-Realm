import type { Metadata } from "next";
import Image from "next/image";

import AreaCard from "@/components/AreaCard";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { ACADEMY_AREAS, WEEKLY_RHYTHM } from "@/lib/content";

export const metadata: Metadata = {
  title: "Esports Academy",
  description:
    "The Avatars Realm Esports Academy — 20 competitive PC stations, coaching studio, main arena, gaming lounge and streaming zone. Memberships open, from R450 per month.",
};

const FACTS = [
  { label: "PC stations", value: "20 competitive-spec" },
  { label: "Coaching", value: "6 days a week" },
  { label: "First session", value: "Free intake" },
  { label: "Membership", value: "From R450 / month" },
];

const TRAINING = [
  {
    title: "Structured practice",
    body: "Training blocks with a clear purpose — warm-up, focus work, review — instead of open-ended play.",
  },
  {
    title: "Coaching conversations",
    body: "Feedback delivered directly and constructively, so improvement is visible between sessions.",
  },
  {
    title: "Review and reflection",
    body: "VOD sessions on your own matches every fortnight, with written notes you keep.",
  },
  {
    title: "Competitive exposure",
    body: "A clear path from practice to in-house league, monthly showcases and open championship qualifying.",
  },
];

export default function EsportsAcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="Esports Academy"
        title={
          <>
            The academy,
            <br />
            open and running.
          </>
        }
        lede="A full-time training environment for players who want to improve — coached blocks six days a week, a public arena floor, and a competitive programme that runs all year."
        status={{ label: "Accepting members", tone: "live" }}
        image={{
          src: "/images/pc-stations.jpg",
          alt: "Row of illuminated gaming PCs at competitive stations",
        }}
      >
        <Button href="/pricing/" size="lg">
          See membership pricing
        </Button>
        <Button href="/contact/" variant="outline" size="lg">
          Book a free intake session
        </Button>
      </PageHero>

      {/* -------------------------------------------------------- Facts strip */}
      <section className="border-b border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((item) => (
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

      {/* -------------------------------------------------------------- Floor */}
      <section id="floor" className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="The Floor"
              title="Five spaces, one connected environment."
              lede="Training, competition and community sit side by side: everything a member needs is on one floor, from the coaching studio to the arena stage."
            />
          </Reveal>

          <div className="mt-6">
            <StatusBadge tone="live">Open to members and walk-ins</StatusBadge>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACADEMY_AREAS.map((area, index) => (
              <Reveal key={area.title} delay={(index % 3) * 70}>
                <AreaCard
                  title={area.title}
                  description={area.description}
                  image={area.image}
                  alt={area.alt}
                  index={index}
                />
              </Reveal>
            ))}

            {/* Sixth tile: access information, keeping the grid balanced. */}
            <Reveal delay={140}>
              <div className="card flex h-full flex-col justify-between card-pad">
                <div>
                  <StatusBadge tone="live">Open 7 days</StatusBadge>
                  <h3 className="display-3 mt-5">Come and see it.</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
                    Members train on a timetable; the arena floor stays open to
                    everyone else at published drop-in rates. Walk in, or book a
                    free coached intake session before you commit.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/pricing/" variant="primary" size="sm">
                    See pricing
                  </Button>
                  <Button href="/contact/" variant="outline" size="sm">
                    Book a session
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Weekly rhythm */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem]" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Weekly Rhythm"
                title="What a week in the academy looks like."
                lede="The coaching timetable runs in eight-week blocks. Members book into any session on their track; showcases open to the public."
              />
              <div className="md:pb-2">
                <StatusBadge tone="live">Running now</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-10">
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {WEEKLY_RHYTHM.map((row) => (
                <li
                  key={row.day}
                  className="grid gap-2 bg-ink-900/60 px-6 py-5 sm:grid-cols-[8rem_1fr_1.4fr] sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
                    {row.day}
                  </span>
                  <span className="text-[0.95rem] font-semibold text-paper-50">
                    {row.session}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-paper-300">
                    {row.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/pricing/" size="lg">
                Join the academy
              </Button>
              <a href="#floor" className="arrow-link">
                Tour the floor <span aria-hidden="true">↑</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- Training env */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Learning & Training"
              title="How sessions are run."
              lede="Four principles shape every block on the timetable, from the mechanics lab through to in-house league night."
              tone="blue"
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {TRAINING.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full bg-ink-900 p-7 transition-colors duration-200 hover:bg-ink-800">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-azure-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-paper-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                    {item.body}
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
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/2-male-gamers-high-fiving.jpg"
                alt="Two gamers celebrating with a high five"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Community & Esports Development"
              title="A scene, not just a schedule."
              lede="Members move from casual play to structured practice to competition without a gap in support — and the wider community stays engaged between events."
            />

            <ul className="mt-8 max-w-2xl space-y-5">
              {[
                {
                  title: "Start where you are",
                  body: "Free intake session first, so you are placed on the right track rather than the nearest one.",
                },
                {
                  title: "Progression you can see",
                  body: "Assessments, ladder positions and showcase appearances mark each step from participation to competition.",
                },
                {
                  title: "Room to grow",
                  body: "Additional titles, larger formats and squad-level coaching open up as members move through the tracks.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-azure-500"
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
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Academy enrolment"
        title="Ready to start training?"
        body="Book a free coached intake session, pick your track and be on the floor this week. Memberships are month to month — join Starter, Competitor or Elite Squad from the pricing page."
        primary={{ label: "See membership pricing", href: "/pricing/" }}
        secondary={{ label: "Book a free session", href: "/contact/" }}
      />
    </>
  );
}
