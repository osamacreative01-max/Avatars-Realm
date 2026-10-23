import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { PRICING_FAQ, REALM_POINTS } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/faq/",
  title: "FAQ",
  description:
    "Answers to what players ask before joining Avatars Realm — how Realm Points work, what the lounge experience includes and the pricing questions, all in one place.",
  image: "/images/2-male-gamers-high-fiving.jpg",
});

/** Secondary spend that makes the lounge work as a destination — moved here
    from the memberships page per the handoff. */
const LOUNGE_BENEFITS = [
  {
    title: "Food, drink & consumables",
    body: "Affordable snacks, drinks and consumables on the floor, with member pricing on selected items — the goal is dwell time, not the price of a single visit.",
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
    body: "Once the lounge opens, members book pods ahead of time and walk-ins are served subject to station capacity. Final booking rules are published with the opening programme.",
  },
];

/**
 * The FAQ — the rewards system, the lounge experience and the pricing
 * questions, gathered here from the memberships page so the top-ribbon FAQ
 * entry has a single home.
 */
export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Questions,
            <br />
            answered.
          </>
        }
        lede="Everything players ask before joining — how Realm Points work, what the lounge experience includes and how the pricing holds together. If your question is not here, the team responds within one business day."
        status={{ label: SITE.statusLine, tone: "coming" }}
        image={{
          src: "/images/page-banners/memberships-and-lounge.jpg",
          alt: "A long row of gaming stations in the lounge",
        }}
      >
        <Button href="#realm-points" size="lg">
          How Realm Points work
        </Button>
        <Button href="/contact/" variant="outline" size="lg">
          Ask a question
        </Button>
      </PageHero>

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
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StatusBadge tone="proposed">Proposed rewards system</StatusBadge>
              <span className="text-[0.875rem] leading-relaxed text-paper-400">
                {REALM_POINTS.status}
              </span>
            </div>
            <ul className="mt-8 max-w-2xl space-y-4">
              {REALM_POINTS.rules.map((line) => (
                <li key={line} className="flex gap-4">
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
              <Button href="/memberships/" size="lg">
                See lounge rates
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
                  <p className="mt-2 text-[1rem] leading-relaxed text-paper-300">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Questions */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
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
                  <p className="mt-2 text-[1rem] leading-relaxed text-paper-300">
                    {row.answer}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Get in Touch"
        title="Still have a question?"
        body="Email the team about programmes, memberships, lounge rates, league entry or events — we respond within one business day and confirm details as the opening programme is announced."
        primary={{ label: "Email the team", href: "/contact/" }}
        secondary={{ label: "See memberships", href: "/memberships/" }}
      />
    </>
  );
}
