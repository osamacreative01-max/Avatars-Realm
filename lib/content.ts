/**
 * Editorial content for the site.
 *
 * Nothing here may state that a future concept is operational. Every item that
 * is not confirmed carries an explicit status.
 */

export type Status = {
  label: string;
  tone: "dev" | "planned" | "neutral";
};

export const IN_DEVELOPMENT: Status = {
  label: "In Development",
  tone: "dev",
};

export const PROPOSED: Status = { label: "Proposed", tone: "neutral" };

export const PLANNED: Status = { label: "Planned", tone: "planned" };

export const SUBJECT: Status = {
  label: "Subject to Confirmation",
  tone: "planned",
};

/** Proposed Starter Edition — never described as open or operating. */
export const ACADEMY_AREAS = [
  {
    title: "10–20 PC Stations",
    description:
      "A proposed bank of competitive-spec machines for training blocks, scrimmages and ranked practice.",
    image: "/images/pc-stations.jpg",
    alt: "Row of illuminated gaming PCs at competitive stations",
  },
  {
    title: "Academy Space",
    description:
      "A dedicated room for structured learning, review sessions and coaching conversations.",
    image: "/images/player-setup.jpg",
    alt: "Player at a dual-monitor gaming setup wearing a headset",
  },
  {
    title: "Small Arena",
    description:
      "A compact stage area intended for showcases, finals and small-format competition.",
    image: "/images/arena-pc-room.png",
    alt: "Gaming PCs and headsets in a dark esports room",
  },
  {
    title: "Gaming Lounge",
    description:
      "An informal space for community play, drop-in sessions and downtime between matches.",
    image: "/images/community-play.jpg",
    alt: "Group of players at a gaming event",
  },
  {
    title: "Streaming Zone",
    description:
      "A planned broadcast corner for content, commentary and event coverage.",
    image: "/images/gaming-gear.jpg",
    alt: "Gaming equipment in a darkened room",
  },
] as const;

/** Tournament titles confirmed in the client specification. */
export const TOURNAMENTS = [
  {
    title: "EA Sports FC 25",
    format: "1v1",
    note: "Solo duels decided match by match.",
  },
  {
    title: "Call of Duty BO6",
    format: "4v4",
    note: "Squad-based objective play.",
  },
  {
    title: "Valorant",
    format: "5v5",
    note: "Full team tactical competition.",
  },
  {
    title: "PUBG Mobile",
    format: "Squad",
    note: "Mobile squad battle royale.",
  },
  {
    title: "Free Fire MAX",
    format: "Solo Battle Royale",
    note: "Last-player-standing solo run.",
  },
] as const;

/**
 * Event programme. Dates, venues and registration are deliberately absent —
 * they are published only once the client confirms them.
 */
export const EVENTS = [
  {
    title: "Open Esports Championship 2026",
    description:
      "The flagship planned championship across five titles, presented as the centrepiece of the Avatars Realm event programme.",
    status: SUBJECT,
    href: "/open-esports-championship-2026/",
    image: "/images/arena-stage.png",
    alt: "Pro teams competing on a stadium stage",
  },
  {
    title: "Academy Showcases",
    description:
      "Proposed session-based showcases where academy participants would present progress in a structured, supportive setting.",
    status: PROPOSED,
    href: "/esports-academy/",
    image: "/images/2-male-gamers-high-fiving.jpg",
    alt: "Two gamers celebrating with a high five",
  },
  {
    title: "Community Play Sessions",
    description:
      "Proposed open sessions intended to grow a local gaming community around the organisation.",
    status: PROPOSED,
    href: "/contact/",
    image: "/images/community-gaming.webp",
    alt: "Community gamers playing together at a LAN setup",
  },
] as const;

export const VALUES = [
  {
    title: "Compete with respect",
    description:
      "Fair play, good sportsmanship and conduct that holds up under pressure.",
  },
  {
    title: "Develop first",
    description:
      "Improvement over hype — coaching, practice and honest feedback before headlines.",
  },
  {
    title: "Build in the open",
    description:
      "We describe what is ready as ready, and what is planned as planned.",
  },
  {
    title: "Community over spectacle",
    description:
      "A sustainable scene for players, families and partners, not a one-off show.",
  },
] as const;

export const LEADERSHIP = [
  {
    role: "Founder and Director",
    name: "Ricardo Bessit" as string | null,
    focus:
      "Sets the direction for Avatars Realm, from the academy concept through to the event programme.",
    note: "Director, Avatars Realm (Pty) Ltd.",
  },
  {
    role: "Marketing and Communications Lead",
    name: null as string | null,
    focus:
      "Owns brand, messaging and the public record — ensuring every published detail is confirmed before it goes live.",
    note: "Name and profile to be published once approved.",
  },
] as const;
