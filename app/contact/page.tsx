import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { NAV, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Avatars Realm (Pty) Ltd. General enquiries about the esports academy, the event programme and partnership opportunities.",
};

const CARDS = [
  {
    label: "General enquiries",
    title: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    action: "Send an email",
    note: "For academy, event and organisation questions.",
  },
  {
    label: "Telephone",
    title: "Phone",
    value: SITE.phone,
    href: SITE.phoneHref,
    action: "Call this number",
    note: "A direct line for enquiries while the organisation is being established.",
  },
  {
    label: "Location",
    title: "Based in",
    value: SITE.address,
    href: "",
    action: "",
    note: "Postal, venue and event addresses are published once confirmed.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start a conversation
            <br />
            with Avatars Realm.
          </>
        }
        lede="Whether you are a player, a parent, a school, a business or a potential partner — this is the simplest way to reach us while the organisation is being established."
        status={{ label: "General enquiries", tone: "neutral" }}
        image={{
          src: "/images/player-headset.jpg",
          alt: "Player wearing a headset during an online gaming session",
        }}
      />

      {/* -------------------------------------------------------- Contact cards */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Reach us directly."
              lede="There is no contact form on this site. Use the details below and your message will reach the right person."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CARDS.map((card, index) => {
              const inner = (
                <>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                    {card.label}
                  </p>
                  <h2 className="mt-4 text-[1.15rem] font-semibold text-paper-50">
                    {card.title}
                  </h2>
                  <p className="mt-2 break-words text-[1rem] font-medium text-flame-400">
                    {card.value}
                  </p>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-paper-400">
                    {card.note}
                  </p>
                </>
              );

              return (
                <Reveal key={card.title} delay={index * 70}>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="card card-hover flex h-full flex-col card-pad"
                    >
                      {inner}
                      <span className="arrow-link mt-6 pt-1">
                        {card.action} <span aria-hidden="true">→</span>
                      </span>
                    </a>
                  ) : (
                    <div className="card flex h-full flex-col card-pad">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={`mailto:${SITE.email}`} size="lg">
                Email {SITE.email}
              </Button>
              <Button href={SITE.phoneHref} variant="outline" size="lg">
                Call {SITE.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- What to ask */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem] text-white/[0.04]" />

        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Before you write"
              title="What we can and cannot confirm."
              tone="blue"
              lede="To keep replies useful, here is the current state of the information people ask for most often."
            />
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {[
                {
                  ask: "Academy registration",
                  answer: "Not open — the Starter Edition is in development.",
                  tone: "dev" as const,
                },
                {
                  ask: "Championship registration",
                  answer: "Not open — subject to confirmation.",
                  tone: "planned" as const,
                },
                {
                  ask: "Event dates and venues",
                  answer: "Published once confirmed.",
                  tone: "planned" as const,
                },
                {
                  ask: "Partnerships",
                  answer: "Under establishment.",
                  tone: "neutral" as const,
                },
              ].map((row) => (
                <li
                  key={row.ask}
                  className="flex flex-col gap-3 bg-ink-900/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-[0.9375rem] font-medium text-paper-100">
                    {row.ask}
                  </span>
                  <StatusBadge tone={row.tone}>{row.answer}</StatusBadge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Partnership */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Partnership Note"
              title="Partnership opportunities are under establishment."
              lede="We are not announcing partners, sponsors or collaborations at this stage. If a partnership conversation is relevant to you, get in touch and we will pick it up at the right time."
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="neutral">Under establishment</StatusBadge>
              <StatusBadge tone="dev">No partners announced</StatusBadge>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="card card-pad">
              <h2 className="text-[1.05rem] font-semibold text-paper-50">
                Quick navigation
              </h2>
              <ul className="mt-5 space-y-3">
                {NAV.filter((item) => item.href !== "/contact/").map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="arrow-link w-full justify-between"
                    >
                      {item.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
