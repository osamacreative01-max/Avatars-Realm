import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import GenGLockup from "@/components/GenGLockup";
import Hero from "@/components/Hero";
import InterestForm from "@/components/InterestForm";
import JourneyStrip from "@/components/JourneyStrip";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import {
  CHAMPIONSHIP,
  PATHWAYS,
  PROGRAMMES,
  TOURNAMENTS,
} from "@/lib/content";

/**
 * Home is a summary, not a duplicate of the inner pages: hero → the four-step
 * strip → Academy / Lounge / Arena cards → programme teaser → championship
 * teaser → contact. Detail lives on /academy-programmes, /memberships and
 * /arena-events.
 */

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <Hero />

      {/* ------------------------------------------------------- Gen.G partner */}
      {/* Slim partner band directly below the hero, before the pathways. */}
      <section
        aria-label="Powered by Gen.G"
        className="border-b border-white/[0.07] bg-navy-950"
      >
        <div className="container-page flex justify-center py-6 sm:justify-start sm:py-7">
          <GenGLockup />
        </div>
      </section>

      {/* ---------------------------------------------------- Journey strip */}
      <JourneyStrip />

      {/* -------------------------------------------------------- Pathways */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              title="One destination, three ways in."
              lede="Avatars Realm is an esports academy and gaming experience centre. Whether you want to learn, play casually or compete, there is a clear way in — and a reason to come back."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
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
                  <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-paper-300">
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
                lede="Whether you're starting out or ready to compete, find the programme that matches your level."
              />
              <div className="md:pb-2">
                <Button href="/academy-programmes/" variant="primary">
                  Find The Programme Fit for You!
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PROGRAMMES.map((programme, index) => (
              <Reveal key={programme.id} delay={index * 70}>
                <div className="card flex h-full flex-col card-pad">
                  <h3 className="display-3">{programme.name}</h3>
                  <p className="mt-4 text-[1rem] font-semibold text-azure-400">
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
                  {/* Duration is secondary to the fee; pilot pricing is a tag. */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="text-[0.875rem] font-medium text-paper-300">
                      {programme.duration}
                    </span>
                    <StatusBadge tone="proposed">
                      Proposed pilot pricing
                    </StatusBadge>
                  </div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-paper-400">
                    {programme.commitment} commitment
                  </p>
                  <p className="mt-4 flex-1 text-[1rem] leading-relaxed text-paper-300">
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

      {/* ------------------------------------------------------ Championship */}
      <section className="relative isolate overflow-hidden border-y border-white/[0.07]">
        <Image
          src="/images/event-crowd.jpg"
          alt="Players competing on a tournament stage in front of a live audience"
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
            <h2 className="display-2 mt-4">Ready to Compete? Game on!</h2>
            <p className="lede mt-5">
              There are multiple titles to compete for — Enter the Realm
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

          <Reveal delay={180}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[1rem] text-paper-200">
              <StatusBadge tone="coming">Registration to be announced</StatusBadge>
              {CHAMPIONSHIP.prizePool}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/open-esports-championship-2026/" size="lg">
                Championship details
              </Button>
              {/* Opens the game-selection interest form. */}
              <InterestForm
                label="I'm Interested, Game On!"
                variant="outline"
              />
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
