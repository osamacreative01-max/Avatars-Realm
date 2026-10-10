import type { Metadata } from "next";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import {
  ARENA_RATES,
  JUNIOR_PROGRAMMES,
  PRICING_FAQ,
  SUBSCRIPTIONS,
  TEAM_BOOKINGS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Published prices for Avatars Realm — academy course subscriptions from R450 per month, arena passes and hourly rates, junior holiday programmes and team bootcamp bookings.",
};

const PROMISES = [
  { label: "Joining fee", value: "None" },
  { label: "Subscriptions", value: "Month to month" },
  { label: "First session", value: "Free intake" },
  { label: "Arena access", value: "Walk-ins welcome" },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Memberships, passes
            <br />
            and programmes.
          </>
        }
        lede="Every price we charge is published on this page — course subscriptions, drop-in arena rates, junior programmes and team bookings. No joining fee, no hidden extras."
        status={{ label: "Prices in ZAR, valid until 31 December 2026", tone: "live" }}
        image={{
          src: "/images/player-focus.jpg",
          alt: "Focused player competing at a gaming station",
        }}
      >
        <Button href="/contact/" size="lg">
          Book a free intake session
        </Button>
        <Button href="#arena" variant="outline" size="lg">
          Arena drop-in rates
        </Button>
      </PageHero>

      {/* ---------------------------------------------------------- Promises */}
      <section className="border-b border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((item) => (
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

      {/* ----------------------------------------------------- Subscriptions */}
      <section id="subscriptions" className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Course Subscriptions"
                title="Coached memberships, billed monthly."
                lede="Three tracks, one curriculum. Every subscription includes coached training blocks, arena access and a place in the weekly competitive programme."
              />
              <div className="md:pb-2">
                <StatusBadge tone="live">Accepting members</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {SUBSCRIPTIONS.map((tier, index) => (
              <Reveal key={tier.id} delay={index * 70}>
                <div
                  className={`card flex h-full flex-col card-pad ${
                    tier.featured
                      ? "border-flame-600/55 shadow-[0_0_0_1px_rgb(225_18_37/0.25),0_30px_60px_-30px_rgb(225_18_37/0.5)]"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="display-3">{tier.name}</h3>
                      <p className="mt-2 text-[0.875rem] text-paper-400">
                        {tier.summary}
                      </p>
                    </div>
                    {tier.featured ? (
                      <span className="flex-none">
                        <StatusBadge tone="live">Most popular</StatusBadge>
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-7 flex items-end gap-2 border-t border-white/[0.08] pt-6">
                    <span className="text-[1.1rem] font-semibold text-flame-400">
                      R
                    </span>
                    <span className="text-[2.75rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                      {tier.price}
                    </span>
                    <span className="pb-1 text-[0.875rem] text-paper-400">
                      {tier.period}
                    </span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.includes.map((line) => (
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

                  <div className="mt-7">
                    <Button
                      href="/contact/"
                      variant={tier.featured ? "primary" : "outline"}
                      className="w-full"
                    >
                      Join {tier.name}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-300">
              <StatusBadge tone="neutral">Good to know</StatusBadge>
              All subscriptions include a free coached intake session. Cancel
              any time with seven days&apos; notice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- Arena */}
      <section
        id="arena"
        className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950"
      >
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="left" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Arena Passes & Rates"
                title="Play without a membership."
                lede="The arena floor, lounge and streaming booths are open to everyone at the published rates. Pay at reception by card, EFT or SnapScan."
                tone="blue"
              />
              <div className="md:pb-2">
                <StatusBadge tone="live">Walk-ins welcome</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {ARENA_RATES.map((rate, index) => (
              <Reveal key={rate.label} delay={index * 50}>
                <div className="h-full bg-navy-950 p-7 transition-colors duration-200 hover:bg-navy-900">
                  <div className="flex items-end gap-2">
                    <span className="text-[1rem] font-semibold text-flame-400">
                      R
                    </span>
                    <span className="text-[2rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                      {rate.price}
                    </span>
                    <span className="pb-0.5 text-[0.8125rem] text-paper-400">
                      {rate.unit}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-paper-50">
                    {rate.label}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                    {rate.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Juniors */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Kids & Holiday Programmes"
                title="Supervised programmes for younger players."
                lede="Structured, coach-led sessions for children and teenagers, capped at 20 players so every participant gets attention."
              />
              <div className="md:pb-2">
                <StatusBadge tone="soon">Next intake: December</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {JUNIOR_PROGRAMMES.map((programme, index) => (
              <Reveal key={programme.title} delay={index * 70}>
                <div className="card flex h-full flex-col card-pad">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-azure-400">
                    {programme.age}
                  </p>
                  <h3 className="display-3 mt-4">{programme.title}</h3>
                  <div className="mt-5 flex items-end gap-2">
                    {/^\d/.test(programme.price) ? (
                      <span className="text-[1rem] font-semibold text-flame-400">
                        R
                      </span>
                    ) : null}
                    <span className="text-[2rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                      {programme.price}
                    </span>
                    <span className="pb-0.5 text-[0.8125rem] text-paper-400">
                      {programme.unit}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-paper-300">
                    {programme.note}
                  </p>
                  <div className="mt-6">
                    <Button href="/contact/" variant="outline" size="sm">
                      Enquire about a place
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Teams */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <SectionDragon side="left" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem]" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Team & Bootcamp Bookings"
              title="Book the floor for your squad."
              lede="Teams, schools and companies book the arena by the block — scrim servers, coaching desk and review room included."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TEAM_BOOKINGS.map((booking, index) => (
              <Reveal key={booking.title} delay={index * 70}>
                <div className="card flex h-full flex-col card-pad">
                  <h3 className="display-3">{booking.title}</h3>
                  <div className="mt-5 flex items-end gap-2">
                    {booking.price.startsWith("From ") ? (
                      <span className="pb-1 text-[0.8125rem] text-paper-400">
                        From
                      </span>
                    ) : null}
                    <span className="text-[1rem] font-semibold text-flame-400">
                      R
                    </span>
                    <span className="text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                      {booking.price.replace("From ", "")}
                    </span>
                    <span className="pb-0.5 text-[0.8125rem] text-paper-400">
                      {booking.unit}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-paper-300">
                    {booking.note}
                  </p>
                  <div className="mt-6">
                    <Button href="/contact/" variant="outline" size="sm">
                      Request a quote
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- FAQ */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="What players ask before joining."
              tone="blue"
              lede="If your question is not answered here, the team will respond within one business day."
            />
            <div className="mt-8">
              <Button href="/contact/" size="lg">
                Ask a question
              </Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {PRICING_FAQ.map((row) => (
                <li key={row.question} className="bg-ink-900/60 px-6 py-5">
                  <h3 className="text-[0.95rem] font-semibold text-paper-50">
                    {row.question}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                    {row.answer}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Join Avatars Realm"
        title="Start with a free intake session."
        body="Tell us which track you are after — Starter, Competitor, Elite Squad or a junior programme — and we will book your first coached session at no cost."
        primary={{ label: "Book your free session", href: "/contact/" }}
        secondary={{ label: "See the academy", href: "/esports-academy/" }}
      />
    </>
  );
}
