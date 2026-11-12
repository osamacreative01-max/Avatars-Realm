import Reveal from "@/components/Reveal";
import { PROGRAMMES } from "@/lib/content";

/**
 * Beginner → Intermediate → Pro as one at-a-glance progression: three steps
 * that read before the visitor opens a single card. The bars are deliberately
 * equal — every programme is billed month-to-month, so no step is presented
 * as longer than another.
 */
export default function ProgrammeStepper() {
  return (
    <Reveal delay={80}>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-3">
        {PROGRAMMES.map((programme, index) => (
          <li key={programme.id} className="flex flex-col bg-ink-900 p-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.75rem] tracking-[0.2em] text-flame-400 uppercase">
                {`Step ${String(index + 1).padStart(2, "0")}`}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-white/[0.12]" />
            </div>

            <p className="mt-4 text-[1.0625rem] font-semibold text-paper-50">
              {programme.name} Programme
            </p>

            {/* Equal bars: billing is month-to-month across all three steps. */}
            <div
              aria-hidden="true"
              className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]"
            >
              <div className="h-full w-full rounded-full bg-gradient-to-r from-flame-600 to-flame-400" />
            </div>

            <p className="mt-3 text-[0.875rem] text-paper-400">
              R{programme.price} per month
            </p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
