export const SITE = {
  name: "Avatars Realm",
  legalName: "Avatars Realm (Pty) Ltd",
  tagline: "Esports Academy & Gaming Arena",
  description:
    "Avatars Realm is an emerging esports and gaming organisation building an academy and a competitive event programme, including the planned Open Esports Championship 2026.",
  locale: "en-ZA",
  url: "https://www.avatarsrealm.co.za",
  email: "info@avatarsrealm.co.za",
  phone: "+27 84 906 7711",
  phoneHref: "tel:+27849067711",
  address: "9 Madge Ave, Northcliff, Randburg",
  founded: "In development",
} as const;

/**
 * Every route in the launch scope. There is deliberately no Partnerships,
 * Privacy or Terms page — all three are excluded from this release.
 */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Esports Academy", href: "/esports-academy/" },
  { label: "Events", href: "/events/" },
  { label: "Open Esports Championship 2026", href: "/open-esports-championship-2026/" },
  { label: "Contact", href: "/contact/" },
] as const;

/**
 * Status vocabulary. Unconfirmed information must always carry one of these.
 */
export const STATUS = {
  development: "In Development",
  proposed: "Proposed",
  planned: "Planned",
  subject: "Subject to Confirmation",
} as const;
