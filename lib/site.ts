export const SITE = {
  name: "Avatars Realm",
  legalName: "Avatars Realm (Pty) Ltd",
  fullName: "Avatars Realm Esports Academy & Gaming Arena",
  tagline: "Train. Play. Compete. Belong.",
  description:
    "Avatars Realm Esports Academy & Gaming Arena — structured esports programmes for Beginner, Intermediate and Pro players, a gaming lounge with hourly access and monthly memberships, Realm Points rewards, community leagues and quarterly tournaments.",
  /** Public status line. Must match reality — see brief §15. */
  statusLine: "Opening programme and membership enrolment to be announced.",
  /** Applied to every published price until they are confirmed. */
  pilotNote:
    "Proposed pilot pricing — not final or binding. Final rates are confirmed with the opening programme.",
  locale: "en-ZA",
  url: "https://www.avatarsrealm.co.za",
  email: "info@avatarsrealm.co.za",
  phone: "+27 84 906 7711",
  phoneHref: "tel:+27849067711",
  address: "9 Madge Ave, Northcliff, Randburg",
  founded: "Est. 2023",
  /** Indicative only until the opening programme is published. */
  hours: [
    { label: "Monday – Thursday", value: "12:00 – 21:00" },
    { label: "Friday", value: "12:00 – 23:00" },
    { label: "Saturday – Sunday", value: "09:00 – 23:00" },
    { label: "School holidays", value: "09:00 – 21:00 daily" },
  ],
  currency: "R",
} as const;

/**
 * Every route in the launch scope, labelled as directed by the
 * repositioning brief (§14). There is deliberately no Partnerships,
 * Privacy or Terms page — all three are excluded from this release.
 */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Academy Programmes", href: "/academy-programmes/" },
  { label: "Memberships & Lounge", href: "/memberships/" },
  { label: "Arena & Events", href: "/arena-events/" },
  { label: "Open Championship 2026", href: "/open-esports-championship-2026/" },
  { label: "Contact", href: "/contact/" },
] as const;
