import type { Metadata } from "next";

import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import GenGLockup from "@/components/GenGLockup";
import { GridBackdrop, RedArc, SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { LEADERSHIP, PROGRESSION } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/about/",
  title: "About",
  description:
    "Avatars Realm (Pty) Ltd is building a new home for esports in South Africa, north of Johannesburg — its progression pathway, leadership and community direction. Powered by Gen.G.",
  image: "/images/community-play.jpg",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Bringing World-Class
            <br />
            Esports to SA.
          </>
        }
        lede={
          <>
            <span className="block">
              Avatars Realm is building a new home for esports in South Africa —
              where gaming talent is developed, skills are sharpened and
              competition creates opportunity.
            </span>
            <span className="mt-4 block">
              Our ambition is bigger than the game. We want to help grow the
              next generation of esports talent and create more opportunities
              for people to participate in, progress through and contribute to
              the gaming industry.
            </span>
          </>
        }
        image={{
          src: "/images/page-banners/about.jpg",
          alt: "Rows of gaming PCs lit in purple across the arena floor",
        }}
      >
        <Button href="/academy-programmes/" size="lg">
          Explore Programmes
        </Button>
        <ContactForm
          label="Contact us"
          variant="outline"
          size="lg"
          defaultSubject="General enquiry"
        />
      </PageHero>

      {/* -------------------------------------------------- Gen.G partner */}
      {/* Logo sits directly above the approved partnership copy, with the
          exact supporting line from the November 2026 handoff. No permission
          or branding-agreement wording is shown to visitors. */}
      <section className="section-tight relative overflow-hidden border-b border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <div className="container-page relative">
          <Reveal className="flex flex-col items-center gap-6 text-center">
            <GenGLockup size="md" />
            <h2 className="display-3">The Gen.G partnership</h2>
            <p className="measure text-[1.0625rem] leading-relaxed text-paper-200">
              Avatars Realm&apos;s partnership with Gen.G — the{" "}
              <span className="font-semibold text-[#f0c419]">GOLD</span>{" "}
              standard in Esports — helps us bring a world-class esports
              learning experience to South Africa. Avatars Realm coaches have
              been trained by Gen.G, and Avatars Realm has received approval to
              use Gen.G&apos;s curriculum. Together, this expertise will support
              structured development for players at every stage, from learning
              the fundamentals to preparing for competition.
            </p>
            <p className="measure text-[1rem] leading-relaxed text-paper-300">
              Gen.G supports Avatars Realm through coach training and
              curriculum guidance; Avatars Realm delivers its own programmes
              and player-development experience.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Pathway */}
      <section id="pathway" className="section relative overflow-hidden">
        <SectionDragon side="left" />
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Development Pathway"
              title="Start as a beginner. Grow toward competition."
              tone="blue"
              lede="Education and competition are treated as connected. A player can begin with casual play and move through programmes, leagues and tournaments at their own pace."
            />
            <div className="mt-8">
              <Button href="/academy-programmes/">View programmes</Button>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-lg border border-white/[0.08]">
              {PROGRESSION.map((step) => (
                <li
                  key={step.step}
                  className="grid gap-2 bg-ink-900/60 px-6 py-5 sm:grid-cols-[7rem_1fr] sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
                    {step.step}
                  </span>
                  <span className="text-[1rem] leading-relaxed text-paper-300">
                    {step.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- Inclusivity */}
      {/* Exact vision paragraph from the November 2026 handoff — verbatim. */}
      <section
        id="inclusivity"
        className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950"
      >
        <GridBackdrop className="opacity-40" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Inclusivity & Access"
              title="Esports open to more people."
              tone="blue"
            />
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-paper-200">
              We believe esports should be open to more people. Avatars Realm
              aims to create an accessible place where players from different
              backgrounds can learn, play and take part in organised
              competition. We intend to work with government and other
              community partners to widen access, build inclusive participation
              pathways and help more young people engage with the
              opportunities around esports.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- People */}
      <section className="section-tight relative overflow-hidden border-y border-white/[0.07] bg-navy-950">
        <GridBackdrop className="opacity-40" />
        <RedArc className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 -scale-x-100 opacity-70" />

        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="The people behind it."
              lede="A small leadership team runs the organisation day to day, with coaching capacity confirmed before each programme intake."
            />

            <div className="mt-8 max-w-3xl space-y-4">
              {LEADERSHIP.map((person) => (
                <div key={person.role} className="card card-pad">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded border border-white/15 bg-white/[0.04] text-[0.65rem] font-semibold tracking-[0.06em] text-paper-400"
                    >
                      {person.name
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <h3 className="text-[1rem] font-semibold text-paper-50">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-flame-400">
                        {person.role}
                      </p>
                      <p className="measure mt-2 text-[1rem] leading-relaxed text-paper-300">
                        {person.focus}
                      </p>
                      {/* No placeholder / "to be announced" wording — a note
                          only renders when one is published. */}
                      {person.note ? (
                        <p className="mt-3 text-[0.8125rem] text-paper-400 italic">
                          {person.note}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Contact"
        title="Talk to the team."
        body="Ask a question about programmes, memberships, school groups or partnerships — the team reads every enquiry and confirms details as they are published."
        primary={{ label: "Contact us", contact: true, subject: "General enquiry" }}
        secondary={{
          label: "League - Tournaments - Events",
          href: "/open-esports-championship-2026/",
        }}
      />
    </>
  );
}
