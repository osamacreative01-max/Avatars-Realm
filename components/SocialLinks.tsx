import { SITE } from "@/lib/site";

type Network = (typeof SITE.socials)[number]["network"];

function Icon({ network }: { network: Network }) {
  if (network === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.77a5.72 5.72 0 1 0 4.91 5.66V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48z" />
    </svg>
  );
}

/**
 * Links to the official Instagram and TikTok profiles. `compact` shows icon
 * buttons only (footer); the default also shows the network and handle.
 */
export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "flex gap-3" : "flex flex-wrap gap-3"}>
      {SITE.socials.map((social) => (
        <li key={social.network}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={compact ? `${SITE.name} on ${social.label}` : undefined}
            className={
              compact
                ? "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper-200 transition-colors hover:border-flame-500 hover:text-flame-400"
                : "flex items-center gap-3 rounded-lg border border-white/15 px-4 py-3 text-paper-100 transition-colors hover:border-flame-500 hover:text-flame-400"
            }
          >
            <Icon network={social.network} />
            {compact ? null : (
              <span className="text-[0.9375rem]">
                <span className="font-semibold">{social.label}</span>{" "}
                <span className="text-paper-400">{social.handle}</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
