import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
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
    "Contact Avatars Realm (Pty) Ltd — programme, membership, lounge, league, event and partnership enquiries for the Avatars Realm Esports Academy & Gaming Arena, north of Johannesburg.",
  image: "/images/esports-setup.jpg",
});

/** Enquiry prompts the brief asks the contact page to carry (§4). */
const ENQUIRIES = [
  {
    label: "Programme enquiries",
    title: "Academy programmes",
    body: "Beginner, Intermediate and Pro — monthly fees, commitment periods and start dates.",
    subject: "Academy programmes",
  },
  {
    label: "Membership enquiries",
    title: "Memberships & gaming lounge",
    body: "Social, Competitive and Pro Pathway memberships, hourly rates and gaming packs.",
    subject: "Memberships & lounge",
  },
  {
    label: "Venue & event enquiries",
    title: "League, tournaments & hosting",
    body: "League entry, quarterly tournaments, watch parties and event hosting at the arena.",
    subject: "League, tournaments & events",
  },
  {
    label: "Group enquiries",
    title: "Schools & institutions",
    body: "Curriculum-aligned academy activity for up to 20 learners per term.",
    subject: "Schools & groups",
  },
  {
    label: "Partnership enquiries",
    title: "Partner opportunities",
    body: "Technology, equipment, education, food and beverage, production and community collaborations.",
    subject: "Partnerships",
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
        lede="Whether you are a player, a parent, a school, a team or a business — send the team a message below. We reply within one business day."
        status={{ label: "Replies within one business day", tone: "live" }}
        image={{
          src: "/images/esports-setup.jpg",
          alt: "A row of gaming stations and red racing seats lit in blue and red",
        }}
      >
        <ContactForm
          label="Send us a message"
          size="lg"
          defaultSubject="General enquiry"
        />
        <Button href="#contact-form" variant="outline" size="lg">
          Go to the form
        </Button>
      </PageHero>

      {/* ------------------------------------------------------ Contact form */}
      {/* The general contact form lives on the page itself. Visitors complete
          it here — nothing sends them to an external email application. */}
      <section id="contact-form" className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Tell us what you need."
              lede="Add your name, surname, email, contact number and a message. The form sends your details straight to the team, so you do not need to open an email application."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Every message reaches the team directly.",
                "We reply within one business day using the details you give us.",
                "For game interest, use the I'm Interested, Game On! form on the Home and Academy pages.",
              ].map((line) => (
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
          </Reveal>

          <Reveal delay={90}>
            <ContactForm inline defaultSubject="General enquiry" />
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
              lede="Pick the closest subject and the contact form opens with it selected — you can change it before sending."
              tone="blue"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ENQUIRIES.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="card flex h-full flex-col card-pad">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                    {item.label}
                  </p>
                  <h3 className="display-3 mt-4">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-paper-300">
                    {item.body}
                  </p>
                  <div className="mt-6">
                    <ContactForm
                      label={item.subject}
                      variant="link"
                      defaultSubject={item.subject}
                    />
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Sixth tile balances the grid and repeats the general route. */}
            <Reveal delay={300}>
              <div className="card flex h-full flex-col card-pad">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                  Direct contact
                </p>
                <h3 className="display-3 mt-4">Not sure where to start?</h3>
                <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-paper-300">
                  Send a general message and the team will route it to the right
                  person.
                </p>
                <div className="mt-6">
                  <ContactForm
                    label="Send a general message"
                    variant="link"
                    defaultSubject="General enquiry"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Status */}
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
              title="North of Johannesburg."
              lede="Planned facility — exact location to be confirmed. Indicative venue hours are listed below. Final opening hours are confirmed with the opening programme and membership enrolment."
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
