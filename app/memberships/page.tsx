import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { LOUNGE_RATES, MEMBERSHIPS, PRICING_FAQ, REALM_POINTS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Memberships & Gaming Lounge",
  description:
    "Gaming lounge hourly rates, prepaid packs and monthly memberships at Avatars Realm — Social, Competitive and Pro Pathway tiers with Realm Points rewards. Proposed pilot pricing.",
};

const PROMISES = [
  { label: "Lounge access", value: "From R40 per hour" },
  { label: "Memberships", value: "From R399 per month" },
  { label: "Rewards", value: "Realm Points on every hour" },
  { label: "Pricing", value: "Proposed pilot rates" },
];

/** Secondary spend that makes the lounge work as a destination. */
const LOUNGE_BENEFITS = [
  {
    title: "Longer visits",
    body: "Affordable hourly rates and prepaid packs make it easy to stay — the goal is dwell time, not the price of a single hour.",
  },
  {
    title: "Food & beverage",
    body: "Affordable refreshments on the floor, with member pricing on selected items.",
  },
  {
    title: "Coaching & upgrades",
    body: "Points can be redeemed against coaching credits and programme upgrades.",
  },
  {
    title: "Events & merchandise",
    body: "Tournament discounts, guest passes and future merchandise offers as the partner programme develops.",
  },
  {
    title: "Booking rules",
    body: "Members book pods ahead of time; walk-ins and packs are served subject to station capacity. Final booking rules are published with the launch programme.",
  },
  {
    title: "Food, drinks & consumables",
    body: "Snacks, drinks and consumables are available on the floor, with member pricing on selected items.",
  },
];

export default function MembershipsPage() {
  const publicTiers = MEMBERSHIPS.filter((tier) => tier.id !== "institution");
  const institution = MEMBERSHIPS.find((tier) => tier.id === "institution");

  return (
    <>
      <PageHero
        eyebrow="Memberships & Gaming Lounge"
        title={
          <>
            The easiest way
            <br />
            into Avatars Realm.
          </>
        }
        lede="A gaming lounge with accessible hourly rates, prepaid packs and monthly memberships — backed by Realm Points that make time here more valuable than casual play at home."
        status={{ label: SITE.statusLine, tone: "soon" }}
        image={{
          src: "/images/community-play.jpg",
          alt: "Group of players at a community gaming session",
        }}
      >
        <Button href="#memberships" size="lg">
          Compare memberships
        </Button>
        <Button href="#rates" variant="outline" size="lg">
          Lounge rates
        </Button>
      </PageHero>

      {/* -------------------------------------------------------- Promises */}
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

      {/* --------------------------------------------------------- Rates */}
      <section id="rates" className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Hourly & Prepaid Access"
                title="Play without a membership."
                lede="The lounge is the lowest-friction way in. The commercial logic is simple: make the first visit easy, increase dwell time and turn one session into a habit."
              />
              <div className="md:pb-2">
                <StatusBadge tone="neutral">Proposed pilot pricing</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {LOUNGE_RATES.map((rate, index) => (
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

            <Reveal delay={250}>
              <div className="h-full bg-navy-950 p-7">
                <p className="eyebrow eyebrow-blue">Good to know</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper-300">
                  Every paid hour earns Realm Points. Members bring their
                  multipliers to the same rates — so a membership is worth more
                  than the hours alone.
                </p>
                <div className="mt-5">
                  <a href="#realm-points" className="arrow-link">
                    How Realm Points work <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Memberships */}
      <section
        id="memberships"
        className="section relative overflow-hidden border-y border-white/[0.07] bg-navy-950"
      >
        <GridBackdrop className="opacity-40" />
        <SectionDragon side="left" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Monthly Memberships"
                title="Three tiers, one rewards system."
                lede="Memberships bundle gaming hours, coaching and booking priority, and multiply what you earn in Realm Points. All tiers are billed monthly."
                tone="blue"
              />
              <div className="md:pb-2">
                <StatusBadge tone="soon">Enrolment opening soon</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {publicTiers.map((tier, index) => (
              <Reveal key={tier.id} delay={index * 70}>
                <div
                  className={`card flex h-full flex-col card-pad ${
                    tier.featured
                      ? "border-flame-600/55 shadow-[0_0_0_1px_rgb(225_18_37/0.25),0_30px_60px_-30px_rgb(225_18_37/0.5)]"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 lg:min-h-[6rem]">
                    <div>
                      <h3 className="display-3">{tier.name}</h3>
                      <p className="mt-2 text-[0.875rem] text-paper-400">
                        {tier.included}
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

                  <div className="mt-6 rounded border border-white/[0.08] bg-white/[0.03] p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-azure-400">
                      Rewards
                    </p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-paper-300">
                      {tier.reward}
                    </p>
                  </div>

                  {tier.note ? (
                    <p className="mt-4 text-[0.8125rem] leading-relaxed text-paper-400 italic">
                      {tier.note}
                    </p>
                  ) : (
                    /* Reserved slot keeps the rewards boxes and buttons
                       aligned across all three tier cards. */
                    <div aria-hidden="true" className="mt-4 lg:min-h-[3.5rem]" />
                  )}

                  <div className="mt-6">
                    <Button
                      href="/contact/"
                      variant={tier.featured ? "primary" : "outline"}
                      className="w-full"
                    >
                      Register interest in {tier.name}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {institution ? (
            <Reveal delay={160}>
              <div
                id="institutions"
                className="mt-6 grid gap-8 rounded-lg border border-white/[0.08] bg-ink-900/60 p-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="display-3">{institution.name}</h3>
                    <StatusBadge tone="neutral">{institution.period}</StatusBadge>
                  </div>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-[1rem] font-semibold text-flame-400">
                      R
                    </span>
                    <span className="text-[2.25rem] leading-none font-bold tracking-[-0.03em] text-paper-50">
                      {institution.price}
                    </span>
                    <span className="pb-1 text-[0.875rem] text-paper-400">
                      {institution.period}
                    </span>
                  </div>
                </div>

                <div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {institution.includes.map((line) => (
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
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper-300">
                    {institution.reward}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/contact/" variant="outline" size="sm">
                      Enquire about a school group
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={200}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.9375rem] text-paper-300">
              <StatusBadge tone="neutral">Proposed pilot pricing</StatusBadge>
              {SITE.pilotNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- Realm Points */}
      <section id="realm-points" className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
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
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Realm Points / XP"
              title={REALM_POINTS.headline}
              lede={REALM_POINTS.copy}
            />
            <ul className="mt-8 max-w-2xl space-y-4">
              {REALM_POINTS.rules.map((line) => (
                <li key={line} className="flex gap-4">
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
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ Lounge experience */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem]" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Lounge Experience"
              title="Built for repeat visits, not single hours."
              lede="The lounge is the front door to everything else at Avatars Realm — coaching, leagues, tournaments and content."
              tone="blue"
            />
            <div className="mt-8">
              <Button href="/contact/" size="lg">
                Book lounge time
              </Button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2">
            {LOUNGE_BENEFITS.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full bg-navy-950 p-7 transition-colors duration-200 hover:bg-navy-900">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
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

      {/* ------------------------------------------------------------- FAQ */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
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
        eyebrow="Memberships"
        title="Choose a membership, or start with an hour."
        body="Tell the team whether you want lounge time, a monthly membership or a place in a programme — and we will confirm rates, capacity and start dates as the opening programme is announced."
        primary={{ label: "Email the team", href: "/contact/" }}
        secondary={{ label: "See programmes", href: "/academy-programmes/" }}
      />
    </>
  );
}
