import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import TournamentCard from "@/components/TournamentCard";
import { TOURNAMENTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Open Esports Championship 2026",
  description:
    "The planned Open Esports Championship 2026 from Avatars Realm — EA Sports FC 25, Call of Duty BO6, Valorant, PUBG Mobile and Free Fire MAX. Dates, venue, rules and registration are subject to confirmation.",
};

const DETAILS = [
  { label: "Dates", value: "Subject to confirmation" },
  { label: "Venue", value: "Subject to confirmation" },
  { label: "Rules", value: "Subject to confirmation" },
  { label: "Registration", value: "Subject to confirmation" },
];

const EXPECT = [
  {
    title: "Five titles, three platforms",
    body: "Console, PC and mobile competition sitting inside a single championship programme.",
  },
  {
    title: "Open format",
    body: "Built to be accessible to a broad field of players rather than an invited few.",
  },
  {
    title: "A complete match day",
    body: "A structured running order designed around fair play, clear communication and good spectating.",
  },
];

export default function ChampionshipPage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
        <Image
          src="/images/event-crowd.jpg"
          alt="Players competing on stage at a live gaming event"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/88 to-ink-950/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/75"
        />
        <GridBackdrop className="opacity-70" />

        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-flame-700/25 blur-[120px]"
        />
        <RedArc className="pointer-events-none absolute -top-28 -left-24 h-[32rem] w-[32rem] opacity-80" />
        <DragonWatermark className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] text-white/[0.055]" />

        <div className="container-page relative py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Flagship Tournament</p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="display-1 mt-6">
                Open Esports
                <br />
                <span className="text-gradient">Championship 2026</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="lede mt-6 max-w-2xl">
                A planned open championship spanning five titles across console,
                PC and mobile — designed to be the centrepiece of the Avatars
                Realm event programme.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <StatusBadge tone="planned">Planned</StatusBadge>
                <StatusBadge tone="planned">Subject to Confirmation</StatusBadge>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact/" size="lg">
                  Contact the team
                </Button>
                <Button href="#titles" variant="outline" size="lg">
                  View the titles
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Key details */}
      <section className="border-b border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((item) => (
            <div key={item.label} className="bg-navy-950 px-6 py-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
                {item.label}
              </p>
              <p className="mt-2.5 text-[0.9375rem] font-medium text-azure-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- Titles */}
      <section id="titles" className="section relative overflow-hidden">
        <DragonWatermark className="pointer-events-none absolute -top-20 -right-16 h-[26rem] w-[26rem] text-white/[0.035]" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Tournament Titles"
                title="Five ways to compete."
                lede="The planned title list for the championship. Formats may be adjusted while the event is being finalised."
              />
              <div className="md:pb-2">
                <StatusBadge tone="planned">Line-up provisional</StatusBadge>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOURNAMENTS.map((tournament, index) => (
              <Reveal key={tournament.title} delay={index * 60}>
                <TournamentCard
                  title={tournament.title}
                  format={tournament.format}
                  note={tournament.note}
                  index={index}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Expect */}
      <section className="section-tight border-y border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="What to Expect"
              title="A championship built to feel professional."
              tone="blue"
              lede="Even while the details are provisional, the intent is fixed: a well-run, clearly communicated tournament that players want to return to."
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="planned">Planned</StatusBadge>
              <StatusBadge tone="neutral">Not yet open for registration</StatusBadge>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="max-w-2xl space-y-6">
              {EXPECT.map((item, index) => (
                <li key={item.title} className="flex gap-5">
                  <span className="mt-0.5 font-mono text-[0.75rem] tracking-[0.2em] text-flame-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-paper-50">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Atmosphere */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Tournament Atmosphere"
              title="Competition people can feel."
              lede="Photography from competitive gaming environments of the kind the championship is being designed around."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                src: "/images/duo-competition.jpg",
                alt: "Two players focused on a competitive match",
              },
              {
                src: "/images/arena-chairs.jpg",
                alt: "Gaming chairs lined up for a competition",
              },
              {
                src: "/images/community-play.jpg",
                alt: "Group of players at a gaming event",
              },
              {
                src: "/images/player-setup.jpg",
                alt: "Player at a dual-monitor gaming setup",
              },
            ].map((image, index) => (
              <Reveal key={image.src} delay={index * 60}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 card card-pad">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <h3 className="text-[1.05rem] font-semibold text-paper-50">
                    What is not being published yet
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper-300">
                    Prize information, budgets, ticketing, registration windows,
                    confirmed venues and confirmed dates are all withheld until
                    they are approved. No payment or player registration takes
                    place on this website.
                  </p>
                </div>
                <StatusBadge tone="planned">Subject to Confirmation</StatusBadge>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Championship 2026"
        title="Follow the championship as it is confirmed."
        body="Registration is not open. Contact us to register your interest as a player, team, volunteer or potential partner, and we will share confirmed details as they are released."
        primary={{ label: "Contact Avatars Realm", href: "/contact/" }}
        secondary={{ label: "See all events", href: "/events/" }}
      />
    </>
  );
}
