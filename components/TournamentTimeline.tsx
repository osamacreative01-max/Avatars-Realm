import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import { QUARTERLY_TOURNAMENTS } from "@/lib/content";

/**
 * The tournament calendar as a timeline: a horizontal rail of four windows on
 * desktop, stacking to a single-column list on mobile. Every window carries a
 * purple "Date TBC" tag until dates are published, so no slot can read as
 * confirmed.
 */
export default function TournamentTimeline() {
  return (
    <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
      {QUARTERLY_TOURNAMENTS.map((item, index) => (
        <li key={item.slot} className="relative flex flex-col">
          <Reveal delay={index * 70} className="flex h-full flex-col">
            {/* Timeline rail: dot marks the window, rule runs to the next one. */}
            <div aria-hidden="true" className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 flex-none rounded-full bg-flame-500 ring-4 ring-flame-600/20" />
              <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-white/[0.06]" />
            </div>

            <p className="mt-5 font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
              {item.slot}
            </p>

            <div className="mt-3">
              <StatusBadge tone="coming">Date TBC</StatusBadge>
            </div>

            <p className="mt-4 text-[1rem] leading-snug font-semibold text-paper-50">
              {item.direction}
            </p>
            <p className="mt-2 text-[1rem] leading-relaxed text-paper-300">
              {item.detail}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
