import type { Metadata } from "next";

import Button from "@/components/Button";
import GenGLockup from "@/components/GenGLockup";
import InterestForm from "@/components/InterestForm";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import ProgrammeStepper from "@/components/ProgrammeStepper";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { LEAGUE, PROGRAMMES } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/academy-programmes/",
  title: "Academy Programmes",
  description:
    "Beginner, Intermediate and Pro esports programmes at Avatars Realm — monthly-fee pathways with published durations, outcomes and proposed pilot pricing.",
  image: "/images/player-focus.jpg",
});

/** Programme headline fees, derived so the strip can never drift from content. */
const FACTS = [
  ...PROGRAMMES.map((programme) => ({
    label: programme.name,
    value: `R${programme.price} ${programme.period} — ${programme.duration}`,
  })),
  { label: "Pricing", value: "Proposed pilot fees" },
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
        lede="3 ways to get into the game. Build your skills through guided programmes for different experience levels."
        status={{ label: SITE.statusLine, tone: "coming" }}
        image={{
          src: "/images/page-banners/academy-programmes.jpg",
          alt: "A player celebrating at a station while wearing a headset",
        }}
      >
        <Button href="/memberships/" size="lg">
          View Memberships
        </Button>
        <InterestForm label="I'm Interested, GAME ON!" variant="outline" size="lg" />
      </PageHero>

      {/* -------------------------------------------------------- Facts strip */}
      <section className="border-b border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((item) => (
            <div key={item.label} className="bg-navy-950 px-6 py-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                {item.label}
              </p>
              <p className="mt-2 text-[1rem] font-medium text-azure-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- Gen.G partner */}
      {/* Compact version of the homepage lockup, directly below the heading
          and intro and before the programme cards. No logo on the cards. */}
      <section
        aria-label="Powered by Gen.G"
        className="border-b border-white/[0.07] bg-navy-950"
      >
        <div className="container-page flex justify-center py-6 sm:justify-start sm:py-7">
          <GenGLockup variant="compact" />
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
                lede="Each programme is sold as a monthly fee across a longer commitment, with a defined outcome at every stage. Visitors do not need to be elite to enter the ecosystem — they need a starting point."
              />
              <div className="md:pb-2">
                <StatusBadge tone="coming">Enrolment opening soon</StatusBadge>
              </div>
            </div>
          </Reveal>

          <ProgrammeStepper />

          <div className="mt-12 space-y-6">
            {PROGRAMMES.map((programme, index) => (
              <Reveal key={programme.id} delay={index * 60}>
                <div className="card overflow-hidden">
                  <div className="grid gap-8 p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-9">
                    <div>
                      <span className="flex font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
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
                          {programme.period}
                        </span>
                      </div>
                      {/* Duration reads as a secondary label beneath the fee,
                          with pilot pricing as its own amber tag. */}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="text-[0.875rem] font-medium text-paper-300">
                          {programme.duration}
                        </span>
                        <StatusBadge tone="proposed">
                          Proposed pilot pricing
                        </StatusBadge>
                      </div>
                      {/* Beginner and Intermediate state their commitment and
                          running total; the Pro pathway's commitment, billing
                          and cancellation terms are still to be confirmed
                          (Brochure Download Link Developer Addendum). */}
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-paper-400">
                        {programme.id === "pro" ? (
                          "12-month pathway · commitment terms TBC"
                        ) : (
                          <>
                            {programme.commitment} commitment ·{" "}
                            {programme.total} over the full programme
                          </>
                        )}
                      </p>
                      {/* "Best for" and the full detail sit after the pricing —
                          for the Pro programme they live in the brochure instead
                          (keep everything up to Pro pricing). */}
                      {programme.id !== "pro" ? (
                        <>
                          <p className="mt-5 text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase">
                            Best for
                          </p>
                          <p className="mt-2 text-[1rem] leading-relaxed text-paper-300">
                            {programme.bestFor}
                          </p>
                        </>
                      ) : null}
                    </div>

                    <div className="flex flex-col">
                      {programme.id === "pro" ? (
                        /* Pro keeps everything up to its pricing; the detail
                           lives in the downloadable brochure. */
                        <>
                          <p className="text-[1rem] leading-relaxed text-paper-200">
                            The full Pro programme — schedule, curriculum and
                            what&apos;s included — is in the downloadable
                            brochure.
                          </p>
                          <p className="mt-6">
                            {/* A discreet text link, not a second competing
                                button — the single primary download sits after
                                the pricing cards (Brochure Download Link
                                Developer Addendum). */}
                            <a
                              href="/downloads/avatars-realm-brochure.pdf"
                              className="arrow-link"
                            >
                              Download the brochure
                              <span aria-hidden="true">→</span>
                            </a>
                          </p>
                        </>
                      ) : (
                        <>
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
                                <span className="text-[1rem] leading-relaxed text-paper-300">
                                  {line}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      <div className="mt-auto pt-7">
                        <InterestForm
                          label="I'm Interested, GAME ON!"
                          variant="outline"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* The single primary brochure download, directly after the pricing
              cards, per the Brochure Download Link Developer Addendum. */}
          <Reveal delay={140}>
            <div className="mt-10">
              <Button href="/downloads/avatars-realm-brochure.pdf" size="lg">
                Download the Avatars Realm Brochure
              </Button>
              <p className="mt-3 max-w-[42rem] text-[0.8125rem] leading-relaxed text-paper-400">
                Explore Academy pathways, monthly fees, gaming lounge options
                and planned competitions.{" "}
                <span className="text-paper-500">
                  PDF · 12 pages · approximately 383 KB
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[1rem] text-paper-300">
              <StatusBadge tone="proposed">Proposed pilot pricing</StatusBadge>
              Coach costs, facility hours, equipment, curriculum, staffing and
              payment terms are confirmed before enrolment opens. {SITE.pilotNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ League */}
      {/* Moved here from Arena & Events per the Kayleen handoff — the league
          now lives with the academy programmes it feeds. */}
      <section
        id="league"
        className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950"
      >
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Community League"
              title="A reason to come back, month after month."
              lede={LEAGUE.copy}
              tone="blue"
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="coming">Windows announced at launch</StatusBadge>
              <StatusBadge tone="soon">Realm Points planned</StatusBadge>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact/" size="lg">
                Join the league
              </Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {LEAGUE.structure.map((line) => (
                <li key={line} className="flex gap-4 bg-ink-900/60 px-6 py-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-flame-600"
                  />
                  <span className="text-[1rem] leading-relaxed text-paper-300">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Removed from this page per the handoff (update 02): Progression,
          How Sessions Are Run, Schools & Groups / Planned capabilities and
          the "Academy enrolment" closing block. Their text now lives in
          /content/brochure-content.md for the downloadable brochure.

          TODO(client-confirm): update 02 §Academy lists "enrolment sections"
          among the removals (that was this closing block, eyebrow "Academy
          enrolment"), while a later line asks to retitle its "Register your
          interest" to "I'm Interested, GAME ON!". We removed the block, since
          the two InterestForm triggers on this page already carry that label.
          Restore a closing CTA here if the client would rather keep one. */}
    </>
  );
}
