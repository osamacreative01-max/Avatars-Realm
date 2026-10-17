import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import { DragonWatermark, GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { PARTNER_CATEGORIES, PARTNER_LABEL } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { NAV, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/contact/",
  title: "Contact",
  description:
    "Contact Avatars Realm (Pty) Ltd — programme, membership, lounge, league, event and partnership enquiries for the Avatars Realm Esports Academy & Gaming Arena in Northcliff.",
  image: "/images/esports-setup.jpg",
});

const CARDS = [
  {
    label: "General enquiries",
    title: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    action: "Send an email",
    note: "Programmes, memberships, league entry, school groups and partnerships.",
  },
  {
    label: "Telephone",
    title: "Phone",
    value: SITE.phone,
    href: SITE.phoneHref,
    action: "Call this number",
    note: "For direct questions while the opening programme is being finalised.",
  },
  {
    label: "Location",
    title: "Based in",
    value: SITE.address,
    href: "",
    action: "",
    note: SITE.statusLine,
  },
];

/** Enquiry prompts the brief asks the contact page to carry (§4). */
const ENQUIRIES = [
  {
    label: "Programme enquiries",
    title: "Academy programmes",
    body: "Beginner, Intermediate and Pro — monthly fees, commitment periods and start dates.",
    subject: "Programme enquiry",
  },
  {
    label: "Membership enquiries",
    title: "Memberships & gaming lounge",
    body: "Social, Competitive and Pro Pathway memberships, hourly rates and gaming packs.",
    subject: "Membership enquiry",
  },
  {
    label: "Venue & event enquiries",
    title: "League, tournaments & hosting",
    body: "League entry, quarterly tournaments, watch parties and event hosting at the arena.",
    subject: "Event enquiry",
  },
  {
    label: "Group enquiries",
    title: "Schools & institutions",
    body: "Curriculum-aligned academy activity for up to 20 learners per term.",
    subject: "School group enquiry",
  },
  {
    label: "Partnership enquiries",
    title: "Partner opportunities",
    body: "Technology, equipment, education, food and beverage, production and community collaborations.",
    subject: "Partnership enquiry",
  },
];

const STATUS_ROWS = [
  {
    ask: "Academy programmes",
    answer: "Enrolment opening soon",
    tone: "coming" as const,
  },
  {
    ask: "Gaming lounge & memberships",
    answer: "Pilot pricing published",
    tone: "neutral" as const,
  },
  {
    ask: "League & quarterly tournaments",
    answer: "Announced with the launch programme",
    tone: "coming" as const,
  },
  {
    ask: "Open Esports Championship 2026",
    answer: "Registration to be announced",
    tone: "coming" as const,
  },
  {
    ask: "Partnerships",
    answer: "Under establishment",
    tone: "neutral" as const,
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
      >
        <Button href={`mailto:${SITE.email}`} size="lg">
          Email the team
        </Button>
        <Button href={SITE.phoneHref} variant="outline" size="lg">
          Call {SITE.phone}
        </Button>
      </PageHero>

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

      {/* ------------------------------------------------------ Enquiries */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem]" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="What to ask about"
              title="Five ways we can help."
              lede="There is no form on this site — pick the closest subject below and email the team directly."
              tone="blue"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ENQUIRIES.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(item.subject)}`}
                  className="card card-hover flex h-full flex-col card-pad"
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                    {item.label}
                  </p>
                  <h3 className="display-3 mt-4">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-paper-300">
                    {item.body}
                  </p>
                  <span className="arrow-link mt-6 pt-1">
                    {item.subject} <span aria-hidden="true">→</span>
                  </span>
                </a>
              </Reveal>
            ))}

            {/* Sixth tile balances the grid and repeats the direct details. */}
            <Reveal delay={300}>
              <div className="card flex h-full flex-col card-pad">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                  Direct contact
                </p>
                <h3 className="display-3 mt-4">Email or call</h3>
                <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-paper-300">
                  Not sure which category fits? Write or call and the team will
                  route your message to the right person.
                </p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <a href={`mailto:${SITE.email}`} className="arrow-link">
                    {SITE.email} <span aria-hidden="true">→</span>
                  </a>
                  <a href={SITE.phoneHref} className="arrow-link">
                    {SITE.phone} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- What to ask */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Where Things Stand"
              title="The current state of play."
              tone="blue"
              lede="The status of the things people ask about most often — updated as the opening programme is confirmed."
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="proposed">Proposed pilot pricing</StatusBadge>
              <StatusBadge tone="neutral">Championship 2026</StatusBadge>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {STATUS_ROWS.map((row) => (
                <li
                  key={row.ask}
                  className="flex flex-col gap-3 bg-ink-900/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-[1rem] font-medium text-paper-100">
                    {row.ask}
                  </span>
                  <StatusBadge tone={row.tone}>{row.answer}</StatusBadge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- Partnerships */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Partner Opportunities"
                title="The types of partners we are exploring."
                lede={PARTNER_LABEL}
                tone="blue"
              />
              <div className="md:pb-2">
                <StatusBadge tone="neutral">No partners confirmed yet</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_CATEGORIES.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
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

          <Reveal delay={200}>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[1rem] text-paper-300">
              <StatusBadge tone="neutral">Partnership status</StatusBadge>
              Partnership opportunities are under establishment — no partner
              logos or confirmed partners are published until agreements are
              signed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Venue & hours */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <SectionDragon side="right" />
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Venue"
              title="Northcliff, Randburg."
              lede="Indicative venue hours are listed below. Final opening hours are confirmed with the opening programme and membership enrolment."
            />
            <div className="mt-8 card card-pad">
              <ul className="divide-y divide-white/[0.08]">
                {SITE.hours.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="text-[1rem] text-paper-200">
                      {row.label}
                    </span>
                    <span className="text-[1rem] font-medium text-azure-400">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <StatusBadge tone="neutral">Indicative hours</StatusBadge>
              <StatusBadge tone="soon">{SITE.statusLine}</StatusBadge>
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
