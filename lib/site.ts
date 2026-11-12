export const SITE = {
  name: "Avatars Realm",
  legalName: "Avatars Realm (Pty) Ltd",
  fullName: "Avatars Realm Esports Academy & Gaming Arena",
  tagline: "Train. Play. Compete. Belong.",
  description:
    "Avatars Realm Esports Academy & Gaming Arena — structured esports programmes for Beginner, Intermediate, Advanced and Pro players, a gaming lounge with hourly access and monthly memberships, Realm Points rewards, community leagues and quarterly tournaments.",
  locale: "en-ZA",
  url: "https://www.avatarsrealm.co.za",
  email: "info@avatarsrealm.co.za",
  /* The old venue wording is obsolete per the Kayleen handoff —
     the exact location is still to be confirmed. */
  address: "Planned facility north of Johannesburg — exact location to be confirmed",
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
  /* About sits directly after Home, per the November 2026 handoff. */
  { label: "About", href: "/about/" },
  { label: "Academy Programmes", href: "/academy-programmes/" },
  { label: "Memberships & Lounge", href: "/memberships/" },
  { label: "Arena & Events", href: "/arena-events/" },
  /* The championship tab now carries the league, the quarterly tournaments
     and the event enquiries — see the Kayleen developer handoff. */
  { label: "League - Tournaments - Events", href: "/open-esports-championship-2026/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
] as const;
