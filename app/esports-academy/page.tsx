import type { Metadata } from "next";
import Image from "next/image";

import AreaCard from "@/components/AreaCard";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { ACADEMY_AREAS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Esports Academy",
  description:
    "The proposed Avatars Realm Esports Academy Starter Edition — 10–20 PC stations, academy space, small arena, gaming lounge and streaming zone. Currently in development.",
};

const TRAINING = [
  {
    title: "Structured practice",
    body: "Training blocks with a clear purpose, rather than open-ended play — warm-up, focus work, review.",
  },
  {
    title: "Coaching conversations",
    body: "Feedback delivered directly and constructively, so improvement is visible between sessions.",
  },
  {
    title: "Review and reflection",
    body: "Looking back at performance as a discipline in its own right, not only playing forward.",
  },
  {
    title: "Competitive exposure",
    body: "Pathways from practice into showcases and small-format competition when conditions allow.",
  },
];

export default function EsportsAcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="Esports Academy"
        title={
          <>
            The proposed
            <br />
            Starter Edition.
          </>
        }
        lede="A future academy concept for structured learning, practice and community — presented as a design that is still being developed, not a facility that is open."
        status={{ label: "In Development", tone: "dev" }}
        image={{
          src: "/images/pc-stations.jpg",
          alt: "Row of illuminated gaming PCs at competitive stations",
        }}
      />

      {/* ------------------------------------------------------- Status notice */}
      <section className="border-b border-white/[0.07] bg-flame-700/10">
        <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-[0.9375rem] text-paper-100">
            <StatusBadge tone="dev">In Development</StatusBadge>
            <span>
              The academy is not open. There is no registration, booking or
              student account available.
            </span>
          </p>
          <a href="#starter-edition" className="arrow-link self-start">
            See the concept <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* ---------------------------------------------------- Starter Edition */}
      <section id="starter-edition" className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Proposed Starter Edition"
              title="Five spaces, one connected environment."
              lede="The Starter Edition is the first proposed shape of the academy: a compact, purpose-built setting where training, competition and community sit side by side."
            />
          </Reveal>

          <div className="mt-6">
            <StatusBadge tone="neutral">
              Concept only — not an operating facility
            </StatusBadge>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACADEMY_AREAS.map((area, index) => (
              <Reveal key={area.title} delay={(index % 3) * 70}>
                <AreaCard
                  title={area.title}
                  description={area.description}
                  image={area.image}
                  alt={area.alt}
                  index={index}
                />
              </Reveal>
            ))}

            {/* Sixth tile: status, keeping the grid balanced. */}
            <Reveal delay={140}>
              <div className="card flex h-full flex-col justify-between card-pad">
                <div>
                  <StatusBadge tone="dev">In Development</StatusBadge>
                  <h3 className="display-3 mt-5">Still being specified.</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
                    Layout, equipment, capacity and opening arrangements have
                    not been finalised. When they are, they will be published
                    here as confirmed information.
                  </p>
                </div>
                <div className="mt-7">
                  <Button href="/contact/" variant="primary" size="sm">
                    Register your interest
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Vision */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <DragonWatermark className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem] text-white/[0.04]" />

        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Academy Vision"
              title="Development before display."
              lede="The academy exists to make improvement routine. Our vision is an environment where players arrive with a purpose, leave with something measurable, and want to come back."
            />
            <div className="measure mt-8 space-y-5 text-[1rem] leading-relaxed text-paper-300">
              <p>
                We are designing around consistency rather than spectacle: a
                repeatable training rhythm, a space that supports concentration,
                and a culture where asking for feedback is normal.
              </p>
              <p>
                Community and competitive development are treated as the same
                journey. Players should be able to move from casual play into
                structured practice, and from structured practice into
                competition, without a gap in support.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatusBadge tone="dev">In Development</StatusBadge>
              <StatusBadge tone="neutral">Proposed Starter Edition</StatusBadge>
            </div>
          </Reveal>

          <Reveal delay={90} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/player-headset.jpg"
                alt="Player wearing a headset during an online match"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent"
              />
            </div>
            <RedArc className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rotate-90" />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ Training env */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Learning & Training"
              title="The training environment we are designing for."
              lede="Four principles shape how sessions would work once the academy moves from concept to delivery."
              tone="blue"
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {TRAINING.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full bg-ink-900 p-7 transition-colors duration-200 hover:bg-ink-800">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-azure-400">
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

      {/* -------------------------------------------------------- Community */}
      <section className="section-tight border-y border-white/[0.07] bg-navy-950">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/duo-competition.jpg"
                alt="Two players focused on a competitive gaming session"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Community & Esports Development"
              title="A scene, not just a schedule."
              lede="The wider direction is a sustainable local esports community — one that keeps players engaged between events and gives families and partners something credible to point at."
            />

            <ul className="mt-8 max-w-2xl space-y-5">
              {[
                {
                  title: "Community first",
                  body: "Regular, low-friction ways for players to take part before any competitive pressure is applied.",
                },
                {
                  title: "Progression that is visible",
                  body: "Clear steps from participation to practice to competition, so development is easy to recognise.",
                },
                {
                  title: "Future potential",
                  body: "Room to grow into additional titles, larger formats and further academy tiers as the organisation matures.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-azure-500"
                  />
                  <div>
                    <h3 className="text-[0.95rem] font-semibold text-paper-50">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-paper-300">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Academy enquiries"
        title="Interested in the academy as it develops?"
        body="There is no registration open yet. Tell us who you are and what you are looking for, and we will keep you updated as the Starter Edition moves forward."
        primary={{ label: "Contact Avatars Realm", href: "/contact/" }}
        secondary={{ label: "See the events programme", href: "/events/" }}
      />
    </>
  );
}
