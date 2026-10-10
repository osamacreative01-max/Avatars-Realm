/**
 * Editorial content for the site.
 *
 * Avatars Realm is presented as an operating academy and arena: facilities are
 * open, programmes are running and prices are published. Only genuinely
 * future items (the 2026 championship) carry an "Upcoming" status.
 */

export type Status = {
  label: string;
  tone: "live" | "soon" | "neutral";
};

export const LIVE: Status = { label: "Open", tone: "live" };

export const ACCEPTING: Status = { label: "Accepting Members", tone: "live" };

export const UPCOMING: Status = { label: "Upcoming", tone: "soon" };

export const SEASONAL: Status = { label: "Seasonal", tone: "soon" };

export const ONGOING: Status = { label: "Runs Weekly", tone: "neutral" };

/** The five spaces that make up the academy and arena floor. */
export const ACADEMY_AREAS = [
  {
    title: "20 PC Stations",
    description:
      "A bank of competitive-spec machines — 240Hz displays, mechanical boards and team comms — used for training blocks, scrimmages and ranked practice.",
    image: "/images/pc-stations.jpg",
    alt: "Row of illuminated gaming PCs at competitive stations",
  },
  {
    title: "Academy Studio",
    description:
      "A dedicated classroom for structured learning, VOD review and coaching conversations, with a projector for team sessions.",
    image: "/images/player-setup.jpg",
    alt: "Player at a dual-monitor gaming setup wearing a headset",
  },
  {
    title: "Main Arena",
    description:
      "A 120-seat competition stage with a live broadcast desk, used for showcases, finals and ticketed events.",
    image: "/images/arena-pc-room.png",
    alt: "Gaming PCs and headsets in a dark esports room",
  },
  {
    title: "Gaming Lounge",
    description:
      "An informal floor for community play, drop-in sessions and downtime between matches — consoles, couches and a snack bar.",
    image: "/images/community-play.jpg",
    alt: "Group of players at a gaming event",
  },
  {
    title: "Streaming Zone",
    description:
      "Six sound-treated broadcast booths for content, commentary, creator sessions and event coverage.",
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
 * Event programme. The academy strands run continuously; the championship is
 * the one genuinely future-facing item and carries an "Upcoming" status.
 */
export const EVENTS = [
  {
    title: "Open Esports Championship 2026",
    description:
      "Our flagship championship across five titles, returning for its next edition as the centrepiece of the Avatars Realm event programme.",
    status: UPCOMING,
    href: "/open-esports-championship-2026/",
    image: "/images/arena-stage.png",
    alt: "Pro teams competing on a stadium stage",
  },
  {
    title: "Academy Showcases",
    description:
      "A monthly ticketed showcase on the main arena stage, where academy members present progress in front of a live crowd.",
    status: LIVE,
    href: "/esports-academy/",
    image: "/images/2-male-gamers-high-fiving.jpg",
    alt: "Two gamers celebrating with a high five",
  },
  {
    title: "Community Play Sessions",
    description:
      "Weekly open sessions on the arena floor — casual ladders, free-play and meet-ups that keep the local scene connected.",
    status: ONGOING,
    href: "/contact/",
    image: "/images/community-gaming.webp",
    alt: "Community gamers playing together at a LAN setup",
  },
] as const;

/* --------------------------------------------------------------------------
   Pricing — published in South African Rand.
   -------------------------------------------------------------------------- */

/** Academy course subscriptions, billed monthly. */
export const SUBSCRIPTIONS = [
  {
    id: "starter",
    name: "Starter",
    price: "450",
    period: "per month",
    summary:
      "For players building a practice habit with structured coaching one step away.",
    featured: false,
    includes: [
      "2 coached training blocks per week",
      "Access to the arena floor outside sessions",
      "Monthly skills assessment",
      "Community Discord and ladder access",
      "10% off arena day passes",
    ],
  },
  {
    id: "competitor",
    name: "Competitor",
    price: "850",
    period: "per month",
    summary:
      "Our core membership — the full training rhythm for players chasing ranked improvement.",
    featured: true,
    includes: [
      "4 coached training blocks per week",
      "Weekly one-to-one coaching review",
      "Unlimited arena floor access",
      "Team scrimmages and in-house leagues",
      "VOD review sessions every fortnight",
      "15% off arena day passes and bootcamps",
    ],
  },
  {
    id: "elite",
    name: "Elite Squad",
    price: "1 400",
    period: "per month",
    summary:
      "Squad-level preparation for competitive rosters with dedicated coaching staff.",
    featured: false,
    includes: [
      "6 coached sessions per week, including scrims",
      "Dedicated head coach and analyst support",
      "Unlimited arena floor and streaming zone access",
      "Priority seeding in all arena tournaments",
      "Match-day preparation and opponent study",
      "Free entry to every academy showcase",
    ],
  },
] as const;

/** Drop-in arena pricing — no membership required. */
export const ARENA_RATES = [
  {
    label: "PC station",
    price: "45",
    unit: "per hour",
    note: "240Hz setup, full peripheral library included.",
  },
  {
    label: "Day pass",
    price: "150",
    unit: "per day",
    note: "Unlimited open play from open to close.",
  },
  {
    label: "10-hour play card",
    price: "380",
    unit: "one-off",
    note: "Valid for six months, shareable with a friend.",
  },
  {
    label: "Console bay",
    price: "60",
    unit: "per hour",
    note: "Two players, controller and headset supplied.",
  },
  {
    label: "Gaming lounge",
    price: "30",
    unit: "per hour",
    note: "Couch play, free Wi-Fi and snack bar access.",
  },
  {
    label: "Streaming booth",
    price: "80",
    unit: "per hour",
    note: "Sound-treated booth with capture gear and lighting.",
  },
] as const;

/** Junior and school-holiday programmes. */
export const JUNIOR_PROGRAMMES = [
  {
    title: "Saturday Juniors",
    age: "Ages 8 – 13",
    price: "650",
    unit: "per month",
    note: "Four Saturday mornings of fundamentals, teamwork and supervised play.",
  },
  {
    title: "Holiday Bootcamp",
    age: "Ages 10 – 16",
    price: "1 200",
    unit: "per week",
    note: "Weekday day-camps during school holidays: coaching, VOD review and a Friday showcase.",
  },
  {
    title: "School Squad Programme",
    age: "Grades 4 – 12",
    price: "On request",
    unit: "per term",
    note: "Term-length coaching for school teams, run at our venue or yours.",
  },
] as const;

/** Team, school and corporate bookings. */
export const TEAM_BOOKINGS = [
  {
    title: "Team bootcamp block",
    price: "3 500",
    unit: "per 4-hour block",
    note: "Full team floor with scrim servers, coaching desk and review room.",
  },
  {
    title: "School or club session",
    price: "1 800",
    unit: "per 2-hour block",
    note: "Up to 20 players across PC stations, with a supervised warm-up and mini-tournament.",
  },
  {
    title: "Corporate tournament",
    price: "From 6 500",
    unit: "per event",
    note: "Staff tournament production on the main arena stage, including brackets, commentary and prizes.",
  },
] as const;

export const PRICING_FAQ = [
  {
    question: "Do I need a membership to use the arena?",
    answer:
      "No. The arena floor is open to everyone at the published drop-in rates. Subscriptions add coached sessions, unlimited floor access and member discounts on top.",
  },
  {
    question: "Can I cancel a subscription?",
    answer:
      "Yes — subscriptions run month to month and can be cancelled with seven days' notice. There is no joining fee.",
  },
  {
    question: "Which game should I choose?",
    answer:
      "Members are placed in a track during a free intake session. You can switch tracks once per month.",
  },
  {
    question: "Is equipment included?",
    answer:
      "All PC stations, consoles, headsets and peripherals are supplied. You are welcome to bring your own keyboard and mouse.",
  },
  {
    question: "How do I pay?",
    answer:
      "Card, EFT and SnapScan are accepted at reception. Subscriptions can be set up as a monthly debit order.",
  },
  {
    question: "Do you offer trials?",
    answer:
      "Every new member gets one free coached intake session and a free hour on the arena floor before committing.",
  },
] as const;

/** The weekly coaching rhythm shown on the academy page. */
export const WEEKLY_RHYTHM = [
  {
    day: "Monday",
    session: "Aim & mechanics lab",
    detail: "Individual fundamentals with coached drills and measurable targets.",
  },
  {
    day: "Tuesday",
    session: "Team tactics",
    detail: "Comms, executes and map protocols for squad-based titles.",
  },
  {
    day: "Wednesday",
    session: "VOD review",
    detail: "Film sessions on member matches with written feedback.",
  },
  {
    day: "Thursday",
    session: "Ranked climb block",
    detail: "Supervised ladder time with coaching available on the floor.",
  },
  {
    day: "Friday",
    session: "In-house league",
    detail: "Competitive fixtures across the week's training themes.",
  },
  {
    day: "Saturday",
    session: "Showcase day",
    detail: "Monthly arena showcase plus open community play.",
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
    title: "Say what is true",
    description:
      "Prices, schedules and capacity are published as they are, with no fine print.",
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
      "Runs Avatars Realm end to end — the academy programme, the arena floor and the event calendar.",
    note: "Director, Avatars Realm (Pty) Ltd.",
  },
  {
    role: "Head of Coaching",
    name: null as string | null,
    focus:
      "Owns the training curriculum, coach development and member progression across all three subscription tracks.",
    note: "Name and profile to be published once approved.",
  },
] as const;
