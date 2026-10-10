import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { NAV, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Avatars Realm (Pty) Ltd — academy membership, arena bookings, team bootcamps, event entries and partnerships at 9 Madge Ave, Northcliff.",
};

const CARDS = [
  {
    label: "General enquiries",
    title: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    action: "Send an email",
    note: "Memberships, event entries, venue hire and partnerships.",
  },
  {
    label: "Telephone",
    title: "Phone",
    value: SITE.phone,
    href: SITE.phoneHref,
    action: "Call this number",
    note: "Answered during venue hours for bookings and enquiries.",
  },
  {
    label: "Location",
    title: "Based in",
    value: SITE.address,
    href: "",
    action: "",
    note: "Open seven days — walk-ins welcome at the arena front desk.",
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
        lede="Whether you are a player, a parent, a school, a team or a business — this is the fastest way to reach us. We reply within one business day."
        status={{ label: "Replies within one business day", tone: "live" }}
        image={{
          src: "/images/player-headset.jpg",
          alt: "Player wearing a headset during an online gaming session",
        }}
      />

      {/* -------------------------------------------------------- Contact cards */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
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
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem]" />

        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Before you write"
              title="Where things stand right now."
              tone="blue"
              lede="The current state of the things people ask about most often."
            />
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {[
                {
                  ask: "Academy registration",
                  answer: "Open — free intake session available.",
                  tone: "live" as const,
                },
                {
                  ask: "Arena walk-ins",
                  answer: "Welcome during opening hours.",
                  tone: "live" as const,
                },
                {
                  ask: "Championship entries",
                  answer: "Open — closes 14 November.",
                  tone: "live" as const,
                },
                {
                  ask: "Team & school bookings",
                  answer: "Quotes within one business day.",
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

      {/* ------------------------------------------------------- Opening hours */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Opening Hours"
              title="The floor is open seven days."
              lede="Coached sessions run to the academy timetable; the arena floor stays open to everyone else during these hours."
            />
            <div className="mt-8 card card-pad">
              <ul className="divide-y divide-white/[0.08]">
                {SITE.hours.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="text-[0.9375rem] text-paper-200">
                      {row.label}
                    </span>
                    <span className="text-[0.9375rem] font-medium text-azure-400">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <StatusBadge tone="live">Walk-ins welcome</StatusBadge>
              <StatusBadge tone="live">Free intake session</StatusBadge>
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
