import Link from "next/link";

import Logo from "@/components/Logo";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-80 w-80 rounded-full bg-flame-700/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-24 h-96 w-96 rounded-full bg-azure-700/10 blur-3xl"
      />

      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10">
        <div className="max-w-md">
          <Logo />
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-paper-300">
            Avatars Realm is an emerging esports and gaming organisation. We are
            developing an academy and a competitive event programme, and we
            publish details only once they are confirmed.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="arrow-link mt-6 inline-flex"
          >
            {SITE.email}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] text-paper-200 transition-colors hover:text-flame-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper-400">
            Get in touch
          </h2>
          <ul className="mt-5 space-y-3 text-[0.9375rem] text-paper-200">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-flame-400"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.phoneHref}
                className="transition-colors hover:text-flame-400"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="text-paper-400">{SITE.address}</li>
            <li className="text-paper-400">
              Partnership opportunities are under establishment.
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="status status-planned">Planned</span>
            <span className="status status-dev">In Development</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.8125rem] text-paper-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-paper-400">
            Website content is provisional and subject to confirmation.
          </p>
        </div>
      </div>
    </footer>
  );
}
