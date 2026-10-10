export const SITE = {
  name: "Avatars Realm",
  legalName: "Avatars Realm (Pty) Ltd",
  tagline: "Esports Academy & Gaming Arena",
  description:
    "Avatars Realm is an established esports academy and gaming arena in Northcliff, Randburg — coaching subscriptions, open arena play, junior programmes, team bootcamps and a competitive event programme.",
  locale: "en-ZA",
  url: "https://www.avatarsrealm.co.za",
  email: "info@avatarsrealm.co.za",
  phone: "+27 84 906 7711",
  phoneHref: "tel:+27849067711",
  address: "9 Madge Ave, Northcliff, Randburg",
  founded: "Est. 2023",
  hours: [
    { label: "Monday – Thursday", value: "12:00 – 21:00" },
    { label: "Friday", value: "12:00 – 23:00" },
    { label: "Saturday – Sunday", value: "09:00 – 23:00" },
    { label: "School holidays", value: "09:00 – 21:00 daily" },
  ],
  currency: "R",
} as const;

/**
 * Every route in the launch scope. There is deliberately no Partnerships,
 * Privacy or Terms page — all three are excluded from this release.
 */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Esports Academy", href: "/esports-academy/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Events", href: "/events/" },
  { label: "Championship 2026", href: "/open-esports-championship-2026/" },
  { label: "Contact", href: "/contact/" },
] as const;

/**
 * Status vocabulary used across the site.
 */
export const STATUS = {
  open: "Open",
  accepting: "Accepting Members",
  registration: "Open for Registration",
  upcoming: "Upcoming",
  walkins: "Walk-ins Welcome",
} as const;
