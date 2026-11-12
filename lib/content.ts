/**
 * Editorial content for the site, written to the Website Repositioning &
 * Modification Brief.
 *
 * Positioning: Avatars Realm is presented as an academy and arena proposition
 * with a visible commercial model. Prices are published as owner-approved
 * month-to-month rates, without pilot-pricing disclaimers or availability
 * notices (November 2026 handoff).
 */

export type Status = {
  label: string;
  /** amber = proposed · blue = planned · purple = to be announced · grey = fact. */
  tone: "live" | "soon" | "neutral" | "proposed" | "coming";
};

export const UPCOMING: Status = { label: "Upcoming", tone: "coming" };

/**
 * League cadence is monthly everywhere. Seasonal was deliberately retired so
 * no card can carry a cadence that competes with the published league rhythm.
 */
export const MONTHLY: Status = { label: "Monthly", tone: "soon" };

/** For programme items whose cadence or dates are not yet published. */
export const TBC: Status = { label: "Windows TBC", tone: "coming" };

export const ONGOING: Status = { label: "Ongoing", tone: "neutral" };

/* --------------------------------------------------------------------------
   The four pathways — Learn, Play, Compete, Progress (brief §3 and §5).
   -------------------------------------------------------------------------- */

export const PATHWAYS = [
  {
    title: "Learn",
    tagline: "Structured academy programmes",
    description:
      "Beginner, Intermediate, Advanced and Pro programmes with coaching, review sessions and a clear outcome at the end of every stage.",
    href: "/academy-programmes/",
    cta: "View programmes",
  },
  {
    title: "Play",
    tagline: "Affordable lounge access",
    description:
      "Competitive-spec stations at simple hourly rates, prepaid gaming packs and monthly memberships that make the first visit easy.",
    href: "/memberships/",
    cta: "See lounge access",
  },
  {
    title: "Compete",
    tagline: "Leagues and quarterly tournaments",
    description:
      "A recurring league with standings and Realm Points, plus four headline tournament windows across the year.",
    href: "/arena-events/",
    cta: "Explore the arena",
  },
] as const;

/* --------------------------------------------------------------------------
   Academy programmes (brief §6).
   -------------------------------------------------------------------------- */

/**
 * Academy programmes are billed as a single monthly fee — never as a large
 * total price. `price` is the monthly fee and `period` is the billing unit
 * shown beside it; every programme runs month-to-month (November 2026
 * owner-approved rates).
 */
export type Programme = {
  id: string;
  name: string;
  headline: string;
  copy: string;
  /** Empty until the owner supplies entry criteria (Advanced). */
  bestFor: string;
  period: string;
  price: string;
  includes: readonly string[];
};

export const PROGRAMMES: readonly Programme[] = [
  {
    id: "beginner",
    name: "Beginner",
    /* Billing reads as month-to-month, with no fixed duration — directed by
       the Kayleen handoff. */
    headline: "A foundation pathway",
    copy: "A foundation pathway for new and developing players. The first four weeks establish the fundamentals, and further performance assessments then determine progression, support requirements and readiness for Intermediate-level training.",
    bestFor: "New players, casual players and learners building fundamentals.",
    period: "per month",
    price: "950",
    includes: [
      "A four-week foundation phase",
      "Foundations, game settings and safe practice habits",
      "Teamwork and communication basics",
      "Regular introductory coaching and feedback",
      "Performance assessments that guide the next step",
    ],
  },
  {
    id: "intermediate",
    name: "Intermediate",
    /* Billing reads as month-to-month, with no fixed duration — Kayleen handoff. */
    headline: "A development pathway",
    copy: "A development pathway for players ready to turn practice into reliable match performance and prepare for league competition.",
    bestFor:
      "Players ready for structured improvement and regular competitive preparation.",
    period: "per month",
    price: "1,200",
    includes: [
      "Advanced mechanics and match review",
      "Role development and team communication",
      "Structured, intensive development sessions",
      "Preparation for league participation",
      "Regular performance assessments",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    /* Owner supplied the name and rate only. No curriculum, inclusions or
       entry criteria are approved yet — nothing is invented here; the card
       asks for the owner's short approved description instead. */
    headline: "Programme details to be confirmed",
    copy: "The Advanced programme sits between Intermediate and Pro. The owner's approved description, curriculum and entry criteria will be published here once confirmed.",
    bestFor: "",
    period: "per month",
    price: "1,500",
    includes: [],
  },
  {
    id: "pro",
    name: "Pro",
    headline: "A performance pathway",
    copy: "A performance pathway for players seeking disciplined training, advanced review and sustained competition preparation.",
    bestFor:
      "Advanced players targeting high-level competition and a performance pathway.",
    period: "per month",
    price: "1,800",
    includes: [
      "Disciplined high-performance schedule",
      "Advanced coaching and individual review",
      "Ongoing performance assessments",
      "Organised competition preparation",
      "Pathway assessment at the end of the year",
    ],
  },
];

/** How a player moves through the ecosystem (brief §3 and §6). */
export const PROGRESSION = [
  {
    step: "Start",
    body: "Walk in for lounge play or begin with the Beginner programme — no competitive experience is needed.",
  },
  {
    step: "Develop",
    body: "Move into the Intermediate programme: structured sessions, review and role development.",
  },
  {
    step: "Compete",
    body: "Enter league play and quarterly tournaments, with the Advanced and Pro programmes preparing the most committed players.",
  },
  {
    step: "Belong",
    body: "Earn Realm Points, build a reputation on the ladder and grow toward coaching, content and career pathways.",
  },
] as const;

/* --------------------------------------------------------------------------
   Memberships and gaming lounge (brief §7).
   -------------------------------------------------------------------------- */

/** Hourly and prepaid lounge access — the lowest-friction entry point.
    Owner-confirmed November 2026 rates; pack savings are measured against
    the R30 off-peak walk-in rate. */
export const LOUNGE_RATES = [
  {
    label: "Walk-in off-peak gaming",
    price: "30",
    unit: "per hour",
    note: "Low-friction weekday and daytime access.",
  },
  {
    label: "Walk-in peak gaming",
    price: "50",
    unit: "per hour",
    note: "Evenings, weekends and high-demand periods.",
  },
  {
    label: "Student / school-hour rate",
    price: "25",
    unit: "per hour",
    note: "Encourages daytime participation and youth access.",
  },
  {
    label: "5-hour gaming pack",
    price: "135",
    unit: "prepaid",
    note: "Off-peak hours — versus R150 at the R30 walk-in rate.",
  },
  {
    label: "10-hour gaming pack",
    price: "250",
    unit: "prepaid",
    note: "Off-peak hours — versus R300 at the R30 walk-in rate.",
  },
] as const;

/** Monthly memberships, including the institutional offer. Owner-approved
    November 2026 prices, each discounted against the equivalent walk-in value. */
export const MEMBERSHIPS = [
  {
    id: "social",
    name: "Social Pass",
    price: "180",
    period: "per month",
    featured: false,
    includes: ["8 off-peak gaming hours each month"],
    note: "Below the R240 walk-in equivalent for the same hours.",
    reward: "1.0× Realm Points; member pricing on selected food, drinks and events.",
  },
  {
    id: "social-plus",
    name: "Social Pass Plus",
    price: "340",
    period: "per month",
    featured: false,
    includes: ["8 gaming hours each month, usable any time"],
    note: "Subject to peak booking availability.",
    reward: "1.0× Realm Points; member pricing on selected food, drinks and events.",
  },
  {
    id: "competitive",
    name: "Competitive Pass",
    price: "600",
    period: "per month",
    featured: true,
    includes: ["24 gaming hours each month"],
    note: "Below the equivalent R720 at the off-peak walk-in rate.",
    reward:
      "1.25× Realm Points; league eligibility; discounted quarterly tournament entry.",
  },
  {
    id: "pro-lounge",
    name: "Pro Lounge Pass",
    price: "1,100",
    period: "per month",
    featured: false,
    includes: ["50 capped gaming hours each month"],
    note: "Below the R1,500 off-peak walk-in equivalent.",
    reward:
      "1.5× Realm Points; priority league placement; tournament discounts; pathway assessment.",
  },
  {
    id: "institution",
    name: "Institution / School",
    price: "12,500",
    period: "per term",
    featured: false,
    includes: [
      "Up to 20 learners per term",
      "Scheduled sessions",
      "Curriculum-aligned academy activity",
    ],
    reward:
      "Institutional reporting, a group leaderboard and a term-end showcase opportunity.",
    note: "Sold as a capped credit model — not unlimited access — to protect the lounge experience at peak times.",
  },
] as const;

/* --------------------------------------------------------------------------
   Realm Points / XP (brief §8).
   -------------------------------------------------------------------------- */

export const REALM_POINTS = {
  headline: "Play more, progress further.",
  copy: "Every visit can contribute to your Realm Points balance, league journey and access to member benefits.",
  status:
    "Realm Points / XP is a proposed loyalty and participation system. Earning and redemption rules remain proposed until they are finalised.",
  rules: [
    "Every paid gaming hour generates Realm Points or XP.",
    "Membership tiers apply different earning multipliers — for example 1.0×, 1.25× and 1.5×.",
    "Extra points are earned for coaching sessions, league matches, quarterly tournaments, community sessions and approved learning activities.",
    "Points may be redeemed for booking priority, guest passes, food and drink discounts, merchandise discounts, coaching credits, tournament discounts, badges and end-of-season recognition.",
    "Points never create an in-game competitive advantage — they reward loyalty, development and participation outside the match itself.",
    "Manufacturer and production-company benefits are future or partner-enabled features, not confirmed benefits.",
  ],
} as const;

/* --------------------------------------------------------------------------
   Lounge and arena experience (brief §9).
   -------------------------------------------------------------------------- */

export const ARENA_ZONES = [
  {
    title: "PC Gaming Zone",
    status: "Open at launch",
    description:
      "Competitive-spec stations for casual play, structured practice, scrimmages and league matches.",
    image: "/images/pc-stations.jpg",
    alt: "Row of illuminated gaming PCs at competitive stations",
  },
  {
    title: "Academy Rooms",
    status: "Open at launch",
    description:
      "Dedicated spaces for Beginner, Intermediate, Advanced and Pro sessions, game analysis and coaching.",
    image: "/images/player-setup.jpg",
    alt: "Player at a dual-monitor gaming setup wearing a headset",
  },
  {
    title: "Arena / Stage",
    status: "Open at launch",
    description:
      "A visible competition environment for finals, showcases, watch parties, broadcasts and quarterly tournaments.",
    image: "/images/arena-stage.png",
    alt: "Competition stage with large screens and arena lighting",
  },
  {
    title: "Social Lounge",
    status: "Open at launch",
    description:
      "A welcoming area where players, families and community members spend time between sessions.",
    image: "/images/community-play.jpg",
    alt: "Group of players at a community gaming session",
  },
  {
    title: "Streaming & Content Corner",
    status: "Future",
    description:
      "A future-ready space for commentary, creator sessions, broadcast preparation and event coverage.",
    image: "/images/esports-setup.jpg",
    alt: "RGB-lit competitive gaming stations ready for streaming",
  },
  {
    title: "Food & Beverage",
    status: "Open at launch",
    description:
      "Affordable refreshments designed to support longer visits and a stronger social experience.",
    image: "/images/arena-chairs.jpg",
    alt: "Seating area inside a gaming venue",
  },
  {
    title: "Merchandise / Partner Zone",
    status: "Future",
    description:
      "Future space for approved Avatars Realm merchandise, equipment demonstrations and manufacturer activations.",
    image: "/images/gaming-gear.jpg",
    alt: "Gaming peripherals and equipment on display",
  },
] as const;

/* --------------------------------------------------------------------------
   League and quarterly tournaments (brief §10).
   -------------------------------------------------------------------------- */

export const LEAGUE = {
  copy: "League play gives members a recurring reason to return. Players accumulate results across a season, build rivalries, earn Realm Points and work toward finals or showcase matches.",
  frequency: "Monthly league windows across a season.",
  structure: [
    "Monthly league windows across a season, published in advance.",
    "Separate divisions for Social, Competitive and Pro participants.",
    "A published match rhythm with clear rules and standings.",
    "Points for participation, match results, sportsmanship and verified development activity.",
    "Season finals or a showcase event in the Arena.",
    "Title rotation across a planned line-up of EA Sports FC 26, Call of Duty BO6, Valorant, PUBG Mobile and League of Legends.",
  ],
} as const;

/**
 * The four headline tournament windows. They are labelled by sequence, not by
 * a fixed calendar quarter — the opening programme has not been published, so a
 * hard-coded 2026 quarter plan would already be out of date.
 *
 * Window 4 IS the Open Esports Championship 2026 — it is the season-closing
 * window, not a second year-end event.
 */
export const QUARTERLY_TOURNAMENTS = [
  {
    slot: "Window 1",
    direction: "Open community launch tournament",
    detail: "EA Sports FC 26 and mobile showcase.",
  },
  {
    slot: "Window 2",
    direction: "Team competition",
    detail: "Valorant or Call of Duty BO6.",
  },
  {
    slot: "Window 3",
    direction: "Mobile and grassroots tournament",
    detail: "PUBG Mobile and League of Legends.",
  },
  {
    slot: "Window 4",
    direction: "Season finals — the Open Esports Championship",
    detail:
      "The flagship championship closes the season on the Arena stage. See the championship page for titles, divisions and format.",
  },
] as const;

export const QUARTERLY_COPY =
  "Across a season, Avatars Realm plans four headline tournaments that give the community a major moment to train toward — combining open and member divisions, academy showcases, spectator experiences, food and beverage, merchandise and future brand activations.";

/** Publishing caveat shown beside the tournament windows. */
export const QUARTERLY_NOTE =
  "Exact dates, capacity and the final game schedule are still to be confirmed, and are published on this site once approved.";

/* --------------------------------------------------------------------------
   A full day at the venue — the journey told as one visit (brief §16).
   Kept on the About page only, so the homepage stays short.
   -------------------------------------------------------------------------- */

export const FULL_DAY = [
  {
    title: "Book a low-cost gaming session",
    body: "An hour off-peak, or a prepaid pack — the easiest way onto the floor.",
  },
  {
    title: "Stay for food and community play",
    body: "Refreshments, the social lounge and drop-in play between sessions.",
  },
  {
    title: "Attend a coaching block",
    body: "A Beginner, Intermediate, Advanced or Pro session with review and feedback.",
  },
  {
    title: "Earn Realm Points",
    body: "Every paid hour, coaching block and league match adds to your balance.",
  },
  {
    title: "Follow the league table",
    body: "Monthly league windows, standings and rivalries across the season.",
  },
  {
    title: "Return for a quarterly tournament",
    body: "Four headline moments a year, with the championship anchoring the calendar.",
  },
  {
    title: "Progress from Beginner to Pro",
    body: "From your first session to organised competition — one connected journey.",
  },
] as const;

/* --------------------------------------------------------------------------
   Championship (brief §11).
   -------------------------------------------------------------------------- */

/**
 * The five confirmed titles, each with its website angle.
 *
 * `href` is optional and empty for now: the Home championship chips stay
 * plain, non-clickable items until a per-title registration page exists.
 */
export type Tournament = {
  title: string;
  format: string;
  note: string;
  href?: string;
};

export const TOURNAMENTS: readonly Tournament[] = [
  {
    title: "EA Sports FC 26",
    format: "1v1",
    note: "Accessible individual competition and a strong entry point for casual-to-competitive progression.",
  },
  {
    title: "Call of Duty BO6",
    format: "4v4",
    note: "Team communication, roles and objective play.",
  },
  {
    title: "Valorant",
    format: "5v5",
    note: "Tactical teamwork and structured competitive preparation.",
  },
  {
    title: "PUBG Mobile",
    format: "Squad",
    note: "Mobile community participation and squad coordination.",
  },
  {
    title: "League of Legends",
    format: "5v5",
    note: "Deep team strategy, distinct roles and objective control across a match.",
  },
];

export const CHAMPIONSHIP = {
  headline: "The Arena's flagship multi-title championship.",
  copy: "The Open Esports Championship 2026 brings Academy, lounge and community players into one multi-title competition experience. Dates, registration and final event details will be announced as they are confirmed.",
  prizePool: "Indicative prize pool: R90,000, subject to confirmation.",
} as const;

/** How a player moves from interest to the arena finals (brief §11). */
export const TOURNAMENT_JOURNEY = [
  {
    step: "Register interest",
    body: "Players, teams, volunteers and media contacts send an enquiry through the website — registration opens with the announced dates.",
  },
  {
    step: "Confirm your entry",
    body: "Formats, eligibility and division placement are confirmed with the published entry details, along with entry fees and closing dates.",
  },
  {
    step: "Qualify & compete",
    body: "Planned open and member divisions play across the five titles, with brackets and running order published ahead of the event.",
  },
  {
    step: "Finals in the Arena",
    body: "The closing matches run on the Arena stage with spectators, commentary and coverage — the moment the season builds toward.",
  },
] as const;

/* --------------------------------------------------------------------------
   Partner opportunities (brief §12).
   -------------------------------------------------------------------------- */

export const PARTNER_LABEL =
  "Partner opportunities are under establishment. We are exploring technology, equipment, education, food and beverage, production and community collaborations.";

export const PARTNER_CATEGORIES = [
  {
    title: "Gaming hardware & peripherals",
    body: "Equipment, demonstrations and member rewards.",
  },
  {
    title: "Production & broadcast",
    body: "Arena screens, streaming and event coverage.",
  },
  {
    title: "Food & beverage",
    body: "Affordable refreshments that support longer visits.",
  },
  {
    title: "Data & performance technology",
    body: "Analytics, player feedback and team matching — planned and partner-enabled.",
  },
  {
    title: "Education, schools & institutions",
    body: "Curriculum, digital skills and learner programmes.",
  },
  {
    title: "Apparel & merchandise",
    body: "Team identity and community products.",
  },
] as const;

/* --------------------------------------------------------------------------
   Questions (brief §15 validation points, answered honestly).
   -------------------------------------------------------------------------- */

export const PRICING_FAQ = [
  {
    question: "Do I need a membership to play?",
    answer:
      "No. The gaming lounge is the easiest way in — walk in at the published hourly rates or buy a prepaid gaming pack. Memberships add gaming hours, coaching, booking priority and Realm Points.",
  },
  {
    question: "How is a programme paid for?",
    answer:
      "Monthly, month-to-month. Beginner is R950 per month, Intermediate is R1,200 per month, Advanced is R1,500 per month and Pro is R1,800 per month.",
  },
  {
    question: "What are Realm Points?",
    answer:
      "Realm Points are a proposed loyalty and participation system, earned through paid gaming hours, coaching, league matches and tournaments. Membership tiers would multiply what you earn, and points would unlock booking priority, discounts, guest passes and recognition — never an in-game advantage. The earning and redemption rules remain proposed until finalised.",
  },
  {
    question: "Which programme is right for me?",
    answer:
      "Most people start with the Beginner programme, whatever their experience. The first four weeks establish fundamentals, and performance assessments then guide progression. The team will place you after an introductory conversation, and you can move up as your review points improve.",
  },
  {
    question: "Is equipment included?",
    answer:
      "Yes — competitive-spec PCs, headsets and peripherals are supplied at every station. You are welcome to bring your own keyboard and mouse.",
  },
  {
    question: "When do leagues and tournaments start?",
    answer:
      "Monthly league windows and four quarterly tournament windows run through the year. Members get priority placement and discounted tournament entry.",
  },
  {
    question: "How do I secure a place?",
    answer:
      "Use the contact form to register your interest in a programme, a membership or a school group booking — the enquiry reaches the team directly at info@avatarsrealm.co.za.",
  },
] as const;

/* --------------------------------------------------------------------------
   Organisation.
   -------------------------------------------------------------------------- */

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
      "Proposed prices, capacity and status are published as they are, with no fine print.",
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
    name: "Ricardo Bessit" as string,
    focus:
      "Runs Avatars Realm end to end — the academy programme, the arena floor and the event calendar.",
    note: "Director, Avatars Realm (Pty) Ltd.",
  },
  {
    role: "Marketing and Communications Head",
    name: "Kayleen Bessit" as string,
    focus:
      "Kayleen Bessit leads Avatars Realm's marketing and communications direction. She brings experience from Telesure, KFC Africa and MAST, a Vodacom subsidiary, to the way the organisation presents its programmes, builds community relationships and communicates the opportunities in esports. At Avatars Realm, she is responsible for shaping the brand voice, public communications and outreach that support broader awareness and inclusive access.",
    note: "",
  },
] as const;
