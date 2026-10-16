import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { PARTNER_LABEL, PROGRAMMES, PROGRESSION } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Academy Programmes",
  description:
    "Beginner, Intermediate and Pro esports programmes at Avatars Realm — structured coaching with published durations, outcomes and proposed pilot pricing.",
};

const FACTS = [
  { label: "Beginner", value: "4 weeks — R3,500" },
  { label: "Intermediate", value: "8 weeks — R7,500" },
  { label: "Pro", value: "6 months — R15,000" },
  { label: "Pricing", value: "Proposed pilot rates" },
];

const PRINCIPLES = [
  {
    title: "Everyone starts somewhere",
    body: "You do not need competitive experience to enter the ecosystem. The Beginner programme assumes nothing except that you want to improve.",
  },
  {
    title: "Coaching, not just screen time",
    body: "Sessions are structured with a purpose — fundamentals, review, role development and match preparation — rather than open-ended play.",
  },
  {
    title: "Progress you can point at",
    body: "Every block ends with a review, so improvement is visible and the next step is obvious.",
  },
  {
    title: "A route into competition",
    body: "Programmes feed directly into league play and the quarterly tournament windows when those launch with the opening programme.",
  },
];

export default function AcademyProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Academy Programmes"
        title={
          <>
            A clear path from
            <br />
            beginner to pro.
          </>
        }
        lede="Structured esports programmes for Beginner, Intermediate and Pro participants — with published durations, outcomes and what is included at every stage."
        status={{ label: SITE.statusLine, tone: "soon" }}
        image={{
          src: "/images/pc-stations.jpg",
          alt: "Row of illuminated gaming PCs at competitive stations",
        }}
      >
        <Button href="/memberships/" size="lg">
          View Memberships
        </Button>
        <Button href="/contact/" variant="outline" size="lg">
          Register your interest
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

      {/* --------------------------------------------------------- Programmes */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="The Programmes"
                title="Three stages, one progression."
                lede="Each programme has a defined duration, a core outcome and a published pilot price. Visitors do not need to be elite to enter the ecosystem — they need a starting point."
              />
              <div className="md:pb-2">
                <StatusBadge tone="soon">Enrolment opening soon</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 space-y-6">
            {PROGRAMMES.map((programme, index) => (
              <Reveal key={programme.id} delay={index * 60}>
                <div className="card overflow-hidden">
                  <div className="grid gap-8 p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-9">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <StatusBadge tone="neutral">
                          {programme.duration}
                        </StatusBadge>
                      </div>
                      <h3 className="display-2 mt-4">
                        {programme.name} Programme
                      </h3>
                      <p className="mt-3 text-[1rem] font-semibold text-azure-400">
                        {programme.headline}
                      </p>
                      <div className="mt-6 flex items-end gap-2">
                        <span className="text-[1rem] font-semibold text-flame-400">
                          R
                        </span>
                        <span className="text-[2.75rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                          {programme.price}
                        </span>
                        <span className="pb-1 text-[0.875rem] text-paper-400">
                          pilot price
                        </span>
                      </div>
                      <p className="mt-5 text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase">
                        Best for
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                        {programme.bestFor}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-[1rem] leading-relaxed text-paper-200">
                        {programme.copy}
                      </p>
                      <p className="mt-6 text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase">
                        What&apos;s included
                      </p>
                      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                        {programme.includes.map((line) => (
                          <li key={line} className="flex gap-3">
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
                      <div className="mt-auto pt-7">
                        <Button href="/contact/" variant="outline">
                          Register interest in {programme.name}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-300">
              <StatusBadge tone="neutral">Proposed pilot pricing</StatusBadge>
              Coach costs, facility hours, equipment, curriculum, staffing and
              payment terms are confirmed before enrolment opens. {SITE.pilotNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Progression */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem]" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Progression"
              title="How players move through the ecosystem."
              lede="A player can begin with casual play, move into a Beginner programme, progress to Intermediate and Pro, and then enter leagues or tournaments."
              tone="blue"
            />
          </Reveal>

          <div className="mt-10">
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {PROGRESSION.map((step) => (
                <li
                  key={step.step}
                  className="grid gap-2 bg-ink-900/60 px-6 py-5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-6"
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
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Principles */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/player-setup.jpg"
                alt="Player at a dual-monitor gaming setup wearing a headset"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="How Sessions Are Run"
              title="Programmes built around development."
              lede="Four principles shape every block, from the first fundamentals session through to league readiness."
            />
            <ul className="mt-8 max-w-2xl space-y-5">
              {PRINCIPLES.map((item) => (
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

      {/* ------------------------------------------------------------ Groups */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <SectionDragon side="right" />
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Schools & Groups"
              title="Institutional programmes, aligned to curriculum."
              tone="blue"
              lede="Schools and institutions can book curriculum-aligned academy activity for up to 20 learners per term, with scheduled sessions, reporting and a term-end showcase."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/memberships/#institutions">Institution offer</Button>
              <Button href="/contact/" variant="outline">
                Email the team
              </Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="card card-pad">
              <p className="eyebrow eyebrow-blue">Planned capabilities</p>
              <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-paper-300">
                Data analytics, AI player feedback and manufacturer-led benefits
                are reserved as future or partner-enabled features. They are
                marked as planned until they have been contracted and
                implemented.
              </p>
              <p className="measure mt-4 text-[0.875rem] leading-relaxed text-paper-400">
                {PARTNER_LABEL}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Academy enrolment"
        title="Register your interest in a programme."
        body="Tell us which programme fits — Beginner, Intermediate or Pro — and the team will confirm your place, the schedule and final pricing when the opening programme is announced."
        primary={{ label: "Email the team", href: "/contact/" }}
        secondary={{ label: "See memberships", href: "/memberships/" }}
      />
    </>
  );
}
