import type { ReactNode } from "react";

import Reveal from "@/components/Reveal";

type Step = {
  title: string;
  body: string;
  icon: ReactNode;
};

const ICONS = {
  train: (
    <>
      <path d="M2.5 6.8 12 3.2l9.5 3.6L12 10.4 2.5 6.8Z" />
      <path d="M6.5 9.2v4.4c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9V9.2" />
      <path d="M21.5 6.8v5.6" />
    </>
  ),
  play: (
    <>
      <rect x="2.2" y="7" width="19.6" height="10" rx="5" />
      <path d="M7 10.2v3.6M5.2 12h3.6" />
      <path d="M15.6 11.2h.01M18.4 13.4h.01" />
    </>
  ),
  compete: (
    <>
      <path d="M8 3.6h8v5.2a4 4 0 0 1-8 0V3.6Z" />
      <path d="M8 5.2H5.2a3.2 3.2 0 0 0 3.1 3.6M16 5.2h2.8a3.2 3.2 0 0 1-3.1 3.6" />
      <path d="M12 12.9v3.6M9 19.9h6M10.3 19.9a1.7 1.7 0 0 1 3.4 0" />
    </>
  ),
  belong: (
    <>
      <circle cx="9.2" cy="8.2" r="3.2" />
      <path d="M3.2 19.8a6 6 0 0 1 12 0" />
      <path d="M16.2 5.6a3.2 3.2 0 0 1 0 5.4" />
      <path d="M17.4 14.4a5.7 5.7 0 0 1 3.4 5.4" />
    </>
  ),
} as const;

/** Four-step strip that replaces the old scrolling marquee under the hero. */
const STEPS: Step[] = [
  {
    title: "Train",
    body: "Structured academy programmes with coaching, review and a clear outcome at every stage.",
    icon: ICONS.train,
  },
  {
    title: "Play",
    body: "Affordable lounge sessions, prepaid packs and monthly memberships for casual play.",
    icon: ICONS.play,
  },
  {
    title: "Compete",
    body: "Monthly league windows, prize-pool tournaments and the Open Esports Championship.",
    icon: ICONS.compete,
  },
  {
    title: "Belong",
    body: "A home venue, a squad and a community that gives you a reason to come back.",
    icon: ICONS.belong,
  },
];

/**
 * Train → Play → Compete → Belong: four one-line steps directly beneath the
 * hero. Renders as a 4 / 2 / 1 column strip; purely informational, so the
 * icons are decorative and hidden from assistive technology.
 */
export default function JourneyStrip() {
  return (
    <section
      aria-label="How Avatars Realm works: train, play, compete, belong"
      className="relative border-b border-white/[0.08] bg-ink-950"
    >
      <div className="container-page">
        <ol className="grid grid-cols-1 gap-px overflow-hidden bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="bg-ink-950 px-6 py-7 lg:px-7 lg:py-8">
              <Reveal delay={index * 60}>
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 flex-none items-center justify-center rounded border border-flame-600/40 bg-flame-600/10 text-flame-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      {step.icon}
                    </svg>
                  </span>
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="ml-auto hidden text-paper-500 lg:block"
                    >
                      →
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 text-[1.125rem] font-semibold text-paper-50">
                  {step.title}
                </p>
                <p className="mt-2 text-[1rem] leading-relaxed text-paper-300">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
