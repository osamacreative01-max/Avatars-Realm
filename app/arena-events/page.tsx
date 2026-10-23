import type { Metadata } from "next";
import Image from "next/image";

import Button from "@/components/Button";
import { SectionDragon } from "@/components/Marks";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import { ARENA_ZONES } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

/* The community league, quarterly tournaments, calendar, championship block
   and event-enquiries CTA were moved off this page per the Kayleen handoff:
   the league now sits with the academy programmes, and the quarterly windows,
   championship and event enquiries live on the League - Tournaments - Events
   page. What remains here is the arena itself. */

export const metadata: Metadata = pageMetadata({
  path: "/arena-events/",
  title: "Arena & Events",
  description:
    "The Avatars Realm arena — PC zone, academy rooms, stage, social lounge, content corner and food & beverage: a complete gaming experience centre north of Johannesburg.",
  image: "/images/audience.jpg",
});

export default function ArenaEventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Arena & Events"
        title={
          <>
            Get in the Game
            <br />
            and feel the energy.
          </>
        }
        lede="From high-performance gaming setups and coaching spaces to live competitions, social hangouts and content creation, the Realm brings every side of gaming together under one roof."
        status={{ label: SITE.statusLine, tone: "coming" }}
        image={{
          src: "/images/page-banners/arena-and-events.jpg",
          alt: "Players competing side by side at lit gaming stations",
        }}
      >
        <Button href="/open-esports-championship-2026/#quarterly" size="lg">
          Tournament windows
        </Button>
        <Button href="/contact/" variant="outline" size="lg">
          Register your interest
        </Button>
      </PageHero>

      {/* ------------------------------------------------------------ Zones */}
      {/* The "Arena Experience" heading was removed — the zone images lead. */}
      <section className="section relative overflow-hidden">
        <SectionDragon side="right" />
        <div className="container-page relative">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARENA_ZONES.map((zone, index) => (
              <Reveal key={zone.title} delay={(index % 3) * 70}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="card-media relative aspect-[4/3]">
                    <Image
                      src={zone.image}
                      alt={zone.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <StatusBadge
                        tone={zone.status === "Future" ? "soon" : "neutral"}
                      >
                        {zone.status}
                      </StatusBadge>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="display-3">{zone.title}</h3>
                    <p className="mt-3 text-[1rem] leading-relaxed text-paper-300">
                      {zone.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Eighth tile balances the grid and converts the section. */}
            <Reveal delay={140} className="lg:col-span-2">
              <div className="card flex h-full flex-col justify-between card-pad">
                <div>
                  <StatusBadge tone="coming">
                    Opening programme to be announced
                  </StatusBadge>
                  <h3 className="display-3 mt-5">Come and see it.</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-paper-300">
                    Some zones open with the launch programme, others are
                    future-ready. Register your interest and be first to know
                    what opens, and when.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/contact/" variant="primary" size="sm">
                    Register interest
                  </Button>
                  <Button href="/memberships/" variant="outline" size="sm">
                    Lounge rates
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
