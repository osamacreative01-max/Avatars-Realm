/**
 * Editorial content for the site, written to the Website Repositioning &
 * Modification Brief.
 *
 * Positioning: Avatars Realm is presented as an academy and arena proposition
 * with a visible commercial model. The venue is pre-launch, so the public
 * status line is "Opening programme and membership enrolment to be announced"
 * and every price carries the pilot-pricing note.
 */

export type Status = {
  label: string;
  tone: "live" | "soon" | "neutral";
};

export const ANNOUNCING: Status = {
  label: "Enrolment opening soon",
  tone: "soon",
};

export const PILOT_PRICING: Status = {
  label: "Proposed pilot pricing",
  tone: "neutral",
};

export const UPCOMING: Status = { label: "Upcoming", tone: "soon" };

/**
 * League cadence is monthly everywhere. Seasonal was deliberately retired so
 * no card can carry a cadence that competes with the published league rhythm.
 */
export const MONTHLY: Status = { label: "Monthly", tone: "soon" };

/** For programme items whose cadence or dates are not yet published. */
export const TBC: Status = { label: "Windows TBC", tone: "neutral" };

export const ONGOING: Status = { label: "Ongoing", tone: "neutral" };

/* --------------------------------------------------------------------------
   The four pathways — Learn, Play, Compete, Progress (brief §3 and §5).
   -------------------------------------------------------------------------- */

export const PATHWAYS = [
  {
    title: "Learn",
    tagline: "Structured academy programmes",
    description:
      "Beginner, Intermediate and Pro programmes with coaching, review sessions and a clear outcome at the end of every stage.",
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
  {
    title: "Progress",
    tagline: "Coaching, content and career pathways",
    description:
      "Coaching, creator sessions and future career and industry pathways that keep players moving beyond casual play.",
    href: "/about/",
    cta: "See the pathway",
  },
] as const;

/* --------------------------------------------------------------------------
   Academy programmes (brief §6).
   -------------------------------------------------------------------------- */

/**
 * Academy programmes are sold on a monthly fee over a longer commitment —
 * never on a large total price. `price` is always the monthly fee, and the
 * full programme total is kept as supporting information only.
 */
export const PROGRAMMES = [
  {
    id: "beginner",
    name: "Beginner",
    headline: "A three-month foundation pathway",
    copy: "A three-month foundation pathway for new and developing players. The first four weeks establish the fundamentals, and further performance assessments then determine progression, support requirements and readiness for Intermediate-level training.",
    bestFor: "New players, casual players and learners building fundamentals.",
    duration: "3 months",
    commitment: "three-month",
    period: "per month",
    price: "1,500",
    total: "R4,500",
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
    headline: "A six-month development pathway",
    copy: "A six-month development pathway for players ready to turn practice into reliable match performance and prepare for league competition.",
    bestFor:
      "Players ready for structured improvement and regular competitive preparation.",
    duration: "6 months",
    commitment: "six-month",
    period: "per month",
    price: "2,200",
    total: "R13,200",
    includes: [
      "Advanced mechanics and match review",
      "Role development and team communication",
      "Structured, intensive development sessions",
      "Preparation for league participation",
      "Regular performance assessments",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    headline: "A twelve-month performance pathway",
    copy: "A twelve-month performance pathway for committed players seeking disciplined training, advanced review and sustained competition preparation.",
    bestFor:
      "High-commitment players targeting advanced competition and a performance pathway.",
    duration: "12 months",
    commitment: "twelve-month",
    period: "per month",
    price: "1,800",
    total: "R21,600",
    includes: [
      "Disciplined high-performance schedule",
      "Advanced coaching and individual review",
      "Ongoing performance assessments",
      "Organised competition preparation",
      "Pathway assessment at the end of the year",
    ],
  },
] as const;

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
    body: "Enter league play and quarterly tournaments, with the Pro programme preparing the highest-commitment players.",
  },
  {
    step: "Belong",
    body: "Earn Realm Points, build a reputation on the ladder and grow toward coaching, content and career pathways.",
  },
] as const;

/* --------------------------------------------------------------------------
   Memberships and gaming lounge (brief §7).
   -------------------------------------------------------------------------- */

/** Hourly and prepaid lounge access — the lowest-friction entry point. */
export const LOUNGE_RATES = [
  {
    label: "Walk-in off-peak gaming",
    price: "50",
    unit: "per hour",
    note: "Low-friction weekday and daytime access.",
  },
  {
    label: "Walk-in peak gaming",
    price: "70",
    unit: "per hour",
    note: "Evenings, weekends and high-demand periods.",
  },
  {
    label: "Student / school-hour rate",
    price: "40",
    unit: "per hour",
    note: "Encourages daytime participation and youth access.",
  },
  {
    label: "5-hour gaming pack",
    price: "225",
    unit: "prepaid",
    note: "Simple prepaid bundle with a small saving.",
  },
  {
    label: "10-hour gaming pack",
    price: "400",
    unit: "prepaid",
    note: "Higher-retention bundle for regular players.",
  },
] as const;

/** Monthly memberships, including the institutional offer. */
export const MEMBERSHIPS = [
  {
    id: "social",
    name: "Social Pass",
    price: "399",
    period: "per month",
    included: "8 off-peak gaming hours",
    featured: false,
    note: null,
    includes: [
      "8 off-peak gaming hours each month",
      "Community session access",
      "Member booking priority",
    ],
    reward: "1.0× Realm Points; member pricing on selected food, drinks and events.",
  },
  {
    id: "competitive",
    name: "Competitive Pass",
    price: "899",
    period: "per month",
    included: "24 gaming hours",
    featured: true,
    note: null,
    includes: [
      "24 gaming hours each month",
      "Priority pod booking",
      "2 group coaching sessions",
    ],
    reward:
      "1.25× Realm Points; league eligibility; discounted quarterly tournament entry.",
  },
  {
    id: "pro-pathway",
    name: "Pro Pathway",
    price: "1,999",
    period: "per month",
    included: "50 gaming hours",
    featured: false,
    includes: [
      "50 gaming hours, or an approved off-peak model",
      "1 individual coaching session",
      "Monthly performance review",
    ],
    reward:
      "1.5× Realm Points; priority league placement; tournament discounts; pathway assessment.",
    note: "Sold as a capped credit model — not unlimited access — to protect the lounge experience at peak times.",
  },
  {
    id: "institution",
    name: "Institution / School",
    price: "12,500",
    period: "per term",
    included: "Up to 20 learners",
    featured: false,
    note: null,
    includes: [
      "Up to 20 learners per term",
      "Scheduled sessions",
      "Curriculum-aligned academy activity",
    ],
    reward:
      "Institutional reporting, a group leaderboard and a term-end showcase opportunity.",
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
    description:
      "Competitive-spec stations for casual play, structured practice, scrimmages and league matches.",
    image: "/images/pc-stations.jpg",
    alt: "Row of illuminated gaming PCs at competitive stations",
  },
  {
    title: "Academy Rooms",
    description:
      "Dedicated spaces for Beginner, Intermediate and Pro sessions, game analysis and coaching.",
    image: "/images/player-setup.jpg",
    alt: "Player at a dual-monitor gaming setup wearing a headset",
  },
  {
    title: "Arena / Stage",
    description:
      "A visible competition environment for finals, showcases, watch parties, broadcasts and quarterly tournaments.",
    image: "/images/arena-stage.png",
    alt: "Competition stage with large screens and arena lighting",
  },
  {
    title: "Social Lounge",
    description:
      "A welcoming area where players, families and community members spend time between sessions.",
    image: "/images/community-play.jpg",
    alt: "Group of players at a community gaming session",
  },
  {
    title: "Streaming & Content Corner",
    description:
      "A future-ready space for commentary, creator sessions, broadcast preparation and event coverage.",
    image: "/images/esports-setup.jpg",
    alt: "RGB-lit competitive gaming stations ready for streaming",
  },
  {
    title: "Food & Beverage",
    description:
      "Affordable refreshments designed to support longer visits and a stronger social experience.",
    image: "/images/arena-chairs.jpg",
    alt: "Seating area inside a gaming venue",
  },
  {
    title: "Merchandise / Partner Zone",
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
    "Title rotation across EA Sports FC 25, Call of Duty BO6, Valorant, PUBG Mobile and Free Fire MAX.",
  ],
} as const;

/**
 * The four headline tournament windows. They are labelled by sequence, not by
 * a fixed calendar quarter — the opening programme has not been published, so a
 * hard-coded 2026 quarter plan would already be out of date.
 */
export const QUARTERLY_TOURNAMENTS = [
  {
    slot: "Window 1",
    direction: "Open community launch tournament",
    detail: "EA Sports FC 25 and mobile showcase.",
  },
  {
    slot: "Window 2",
    direction: "Team competition",
    detail: "Valorant or Call of Duty BO6.",
  },
  {
    slot: "Window 3",
    direction: "Mobile and grassroots tournament",
    detail: "PUBG Mobile and Free Fire MAX.",
  },
  {
    slot: "Window 4",
    direction: "Year-end championship finals",
    detail: "Multi-title Arena showcase.",
  },
] as const;

export const QUARTERLY_COPY =
  "Across a season, Avatars Realm stages four headline tournaments that give the community a major moment to train toward — combining open divisions, member divisions, academy showcases, spectator experiences, food and beverage, merchandise and future brand activations.";

/** Publishing caveat shown beside the tournament windows. */
export const QUARTERLY_NOTE =
  "Exact dates, capacity and the final game schedule are confirmed with the opening programme.";

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
    body: "A Beginner, Intermediate or Pro session with review and feedback.",
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
   The arena & events listing shown on the Arena & Events page.
   -------------------------------------------------------------------------- */

export const ARENA_EVENTS = [
  {
    title: "Community League",
    description:
      "Monthly league windows with divisions, standings and Realm Points — the recurring reason to come back.",
    status: MONTHLY,
    href: "/arena-events/#league",
    image: "/images/team-play.jpg",
    alt: "Esports team playing together at their stations",
    ctaLabel: "How the league works",
  },
  {
    title: "Quarterly Tournaments",
    description:
      "Four headline tournament windows per year, with title rotation and member and non-member divisions.",
    status: TBC,
    href: "/arena-events/#quarterly",
    image: "/images/duo-competition.jpg",
    alt: "Two players competing side by side during a match",
    ctaLabel: "See the tournament windows",
  },
  {
    title: "Open Esports Championship 2026",
    description:
      "The flagship named championship across five titles, sitting inside the wider recurring event programme.",
    status: UPCOMING,
    href: "/open-esports-championship-2026/",
    image: "/images/arena-stage.png",
    alt: "Pro teams competing on a stadium stage",
    ctaLabel: "Championship details",
  },
  {
    title: "Watch Parties & Community Sessions",
    description:
      "Viewing parties, open play and community sessions that keep the scene connected between competitive windows.",
    status: ONGOING,
    href: "/contact/",
    image: "/images/community-gaming.webp",
    alt: "Community gamers playing together at a LAN setup",
    ctaLabel: "Register your interest",
  },
] as const;

/* --------------------------------------------------------------------------
   Championship (brief §11).
   -------------------------------------------------------------------------- */

/** The five confirmed titles, each with its website angle. */
export const TOURNAMENTS = [
  {
    title: "EA Sports FC 25",
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
    title: "Free Fire MAX",
    format: "Solo Battle Royale",
    note: "Fast, accessible solo competition with a broad mobile audience.",
  },
] as const;

export const CHAMPIONSHIP = {
  headline: "The Arena's flagship multi-title championship.",
  copy: "The Open Esports Championship 2026 brings Academy, lounge and community players into one multi-title competition experience. Dates, registration and final event details will be announced as they are confirmed.",
  prizePool: "Indicative prize pool: R90,000, subject to confirmation.",
} as const;

/** How a player moves from interest to the arena finals (brief §11). */
export const TOURNAMENT_JOURNEY = [
  {
    step: "Register interest",
    body: "Players, teams, volunteers and media contacts email the team — registration opens with the announced dates.",
  },
  {
    step: "Confirm your entry",
    body: "Formats, eligibility and division placement are confirmed, with entry fees and closing dates published at the same time.",
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
      "Monthly. Each programme is billed as a monthly fee across its commitment period — Beginner is R1,500 per month over three months, Intermediate is R2,200 per month over six months and Pro is R1,800 per month over twelve months. Every fee remains proposed pilot pricing until confirmed.",
  },
  {
    question: "Are these final prices?",
    answer:
      "No. Every price on this site is proposed pilot pricing. Final rates are confirmed against station capacity, operating costs and the opening programme before enrolment opens.",
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
      "Monthly league windows and the four quarterly tournament windows are announced with the opening programme. Members get priority placement and discounted tournament entry.",
  },
  {
    question: "How do I secure a place?",
    answer:
      "Email the team to register your interest in a programme, a membership or a school group booking. Enrolment opens with the announced opening programme.",
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
    name: "Ricardo Bessit" as string | null,
    focus:
      "Runs Avatars Realm end to end — the academy programme, the arena floor and the event calendar.",
    note: "Director, Avatars Realm (Pty) Ltd.",
  },
  {
    role: "Head of Coaching",
    name: null as string | null,
    focus:
      "Owns the training curriculum, coach development and member progression across the Beginner, Intermediate and Pro programmes.",
    note: "Name and profile to be published once approved.",
  },
] as const;
