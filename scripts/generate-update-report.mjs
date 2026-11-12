/**
 * Builds the client-facing "Website Update Report" PDF.
 *
 * It drives the locally running production server (npm run start) with the
 * system Chrome install, captures one screenshot per implemented change,
 * writes a self-contained HTML report beside them and prints it to PDF with
 * the same browser.
 *
 * Usage:
 *   npm run build && npm run start          (terminal 1)
 *   node scripts/generate-update-report.mjs (terminal 2)
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = path.join(ROOT, "report-assets");
const BASE = "http://localhost:3000";
const PDF_PATH = path.join(ROOT, "Avatars-Realm-Website-Update-Report.pdf");
const HTML_PATH = path.join(ASSETS, "report.html");

/** Screenshots are captured at 2x so the PDF stays sharp when zoomed. */
const SHOT = { type: "jpeg", quality: 88 };

const browser = await chromium.launch({ channel: "chrome", headless: true });

const desktop = await browser.newContext({
  viewport: { width: 1440, height: 993 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});
const page = await desktop.newPage();

await mkdir(ASSETS, { recursive: true });

async function open(route) {
  await page.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
  // Splash/entrance animations settle before anything is captured.
  await page.waitForTimeout(1600);
}

async function shoot(file, locator) {
  await locator.scrollIntoViewIfNeeded();
  // Scroll-reveal transitions finish before the frame is taken.
  await page.waitForTimeout(900);
  await locator.screenshot({ path: path.join(ASSETS, file), ...SHOT });
  console.log(`  ok   ${file}`);
}

const failures = [];

async function capture(file, route, makeLocator) {
  try {
    await open(route);
    await shoot(file, await makeLocator());
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
    console.log(`  FAIL ${file} - ${error.message}`);
  }
}

console.log("Capturing screenshots...");

/* 1 - navigation ---------------------------------------------------------- */
await capture("01-navigation.jpg", "/", () =>
  page.locator('header nav[aria-label="Primary"]'),
);

/* 2 - home hero (availability plate removed) ------------------------------ */
await capture("02-home-hero.jpg", "/", () => page.locator(".hero-card").first());

/* 3 - home programme cards ------------------------------------------------ */
await capture(
  "03-home-programmes.jpg",
  "/",
  () => page.locator("section", { hasText: "Our Month-to-month programmes" }).first(),
);

/* 4 - academy: single four-card section ---------------------------------- */
await capture(
  "04-academy-programmes.jpg",
  "/academy-programmes/",
  () => page.locator("section", { hasText: "Four programmes, one progression." }).first(),
);

/* 5 - advanced card (placeholder, no invented copy) ----------------------- */
await capture(
  "05-academy-advanced-card.jpg",
  "/academy-programmes/",
  () => page.locator(".card", { hasText: "Programme details to be confirmed" }).first(),
);

/* 6 - interest form modal with the programme selector --------------------- */
try {
  await open("/academy-programmes/");
  const section = page
    .locator("section", { hasText: "Four programmes, one progression." })
    .first();
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await section.getByRole("button", { name: /I'm Interested/i }).first().click();
  const dialog = page.locator('[role="dialog"]');
  await dialog.waitFor({ state: "visible", timeout: 10000 });
  await page.waitForTimeout(900);
  await shoot("06-interest-form.jpg", dialog);
  await page.locator('[aria-label="Close"]').first().click();
} catch (error) {
  failures.push(`06-interest-form.jpg: ${error.message}`);
  console.log(`  FAIL 06-interest-form.jpg - ${error.message}`);
}

/* 7-9 - About page -------------------------------------------------------- */
await capture(
  "07-about-geng-partnership.jpg",
  "/about/",
  () => page.locator("section", { hasText: "The Gen.G partnership" }).first(),
);
await capture("08-about-inclusivity.jpg", "/about/", () =>
  page.locator("#inclusivity"),
);
await capture(
  "09-about-leadership.jpg",
  "/about/",
  () => page.locator("section", { hasText: "The people behind it." }).first(),
);

/* 10-12 - memberships ----------------------------------------------------- */
await capture(
  "10-memberships-summary.jpg",
  "/memberships/",
  () => page.locator("section", { hasText: "From R25 per hour" }).first(),
);
await capture("11-memberships-rates.jpg", "/memberships/", () =>
  page.locator("#rates"),
);
await capture(
  "12-memberships-passes.jpg",
  "/memberships/",
  () => page.locator("#memberships div.mt-12").first(),
);

/* 13 - FAQ pricing -------------------------------------------------------- */
await capture("13-faq-pricing.jpg", "/faq/", () =>
  page.locator("ul", { hasText: "How is a programme paid for?" }).first(),
);

/* 14 - contact status ----------------------------------------------------- */
await capture(
  "14-contact-status.jpg",
  "/contact/",
  () => page.locator("section", { hasText: "The current state of play." }).first(),
);

/* 15 - Feel the Action, desktop ------------------------------------------- */
await capture(
  "15-feel-the-action-desktop.jpg",
  "/open-esports-championship-2026/",
  () => page.locator("section", { hasText: "Feel the Action." }).first(),
);

/* 16 - Feel the Action, mobile -------------------------------------------- */
try {
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const mpage = await mobile.newPage();
  await mpage.goto(`${BASE}/open-esports-championship-2026/`, {
    waitUntil: "load",
    timeout: 60000,
  });
  await mpage.waitForTimeout(1600);
  const strip = mpage.locator("section", { hasText: "Feel the Action." }).first();
  await strip.scrollIntoViewIfNeeded();
  await mpage.waitForTimeout(900);
  await strip.screenshot({
    path: path.join(ASSETS, "16-feel-the-action-mobile.jpg"),
    ...SHOT,
  });
  console.log("  ok   16-feel-the-action-mobile.jpg");
  await mobile.close();
} catch (error) {
  failures.push(`16-feel-the-action-mobile.jpg: ${error.message}`);
  console.log(`  FAIL 16-feel-the-action-mobile.jpg - ${error.message}`);
}

await browser.close();

/* ------------------------------------------------------------------ report */

const FIGURES = [
  {
    n: 1,
    img: "01-navigation.jpg",
    title: "Navigation - About moved directly after Home",
    change: [
      "Before: Home &rarr; Academy Programmes &rarr; About &rarr; Memberships &amp; Lounge &hellip;",
      "After: Home &rarr; About &rarr; Academy Programmes &rarr; Memberships &amp; Lounge &hellip; - the same order is used in the footer menu, and every page path is unchanged.",
    ],
    caption:
      "Figure 1 - The primary navigation now opens Home &rarr; About, per change item 2 of the handoff.",
  },
  {
    n: 2,
    img: "02-home-hero.jpg",
    title: "Home hero - availability notice removed",
    change: [
      "Before: the hero carried a status plate reading &ldquo;Opening programme to be announced&rdquo;.",
      "After: the plate is gone; the photograph and card padding were adjusted (hero-card--plain) so the layout still reads as a full hero.",
    ],
    caption:
      "Figure 2 - Home hero without the opening-notice plate (handoff item 1).",
  },
  {
    n: 3,
    img: "03-home-programmes.jpg",
    title: "Home - four month-to-month programme cards",
    change: [
      "Before: three cards (Beginner R1,500 &middot; Intermediate R2,200 &middot; Pro R1,800) each tagged &ldquo;Proposed pilot pricing&rdquo;.",
      "After: four cards - Beginner R950 &middot; Intermediate R1,200 &middot; Advanced R1,500 &middot; Pro R1,800 - each tagged &ldquo;Month-to-month&rdquo;. No durations, totals or pilot-pricing labels remain.",
    ],
    caption:
      "Figure 3 - Home programme strip matches the four approved rates (handoff items 1 and 3).",
  },
  {
    n: 4,
    img: "04-academy-programmes.jpg",
    title: "Academy - one programme section with four cards",
    change: [
      "Before: a top price strip, a three-stage Beginner/Intermediate/Pro summary and the detailed cards repeated the same programmes.",
      "After: one section only - &ldquo;Our Month-to-month programmes / Four programmes, one progression.&rdquo; - with the four cards in the approved order; the hero reads &ldquo;4 ways to get into the game&rdquo;. The stepper component was deleted.",
    ],
    caption:
      "Figure 4 - Academy page shows the programmes once (handoff item 3).",
  },
  {
    n: 5,
    img: "05-academy-advanced-card.jpg",
    title: "Advanced card - placeholder instead of invented copy",
    change: [
      "Advanced is published at R1,500 per month with the month-to-month label.",
      "No curriculum, inclusions or entry criteria were invented: the card asks for the owner's approved description, curriculum and entry criteria to be published here.",
    ],
    caption:
      "Figure 5 - Advanced card awaits the owner's approved description (handoff item 3).",
  },
  {
    n: 6,
    img: "06-interest-form.jpg",
    title: "Interest form - required programme / competition selector",
    change: [
      "Added a required single-select &ldquo;Programme / competition interest&rdquo; - Beginner; Intermediate; Advanced; Pro; Championship / League - before the existing multi-select &ldquo;Games of interest&rdquo;.",
      "Programme cards pre-select their own programme; the Championship entry point pre-selects &ldquo;Championship / League&rdquo;.",
      "Both answers are validated and delivered together to info@avatarsrealm.co.za, with matching labels in the email and server-side validation.",
    ],
    caption:
      "Figure 6 - The interest modal opens with the card's programme pre-selected (handoff item 4).",
  },
  {
    n: 7,
    img: "07-about-geng-partnership.jpg",
    title: "About - visitor-facing Gen.G partnership story",
    change: [
      "Before: &ldquo;Powered by Gen.G. Gen.G branding is featured through Avatars Realm's partner agreement.&rdquo;",
      "After: the Gen.G logo and the exact line &ldquo;The GOLD standard in Esports&rdquo; sit directly above the approved partnership paragraph, followed by the exact supporting sentence: &ldquo;Gen.G supports Avatars Realm through coach training and curriculum guidance; Avatars Realm delivers its own programmes and player-development experience.&rdquo; No permission or branding-disclaimer wording remains.",
    ],
    caption:
      "Figure 7 - Gen.G section with the approved copy, verbatim (handoff item 5).",
  },
  {
    n: 8,
    img: "08-about-inclusivity.jpg",
    title: "About - inclusivity and access vision",
    change: [
      "New section carrying the exact approved vision paragraph about open access, community and government partnerships - published verbatim, with no added claims.",
    ],
    caption: "Figure 8 - Inclusivity &amp; access section (handoff item 5).",
  },
  {
    n: 9,
    img: "09-about-leadership.jpg",
    title: "About - leadership, Kayleen Bessit added",
    change: [
      "Before: a &ldquo;Head of Coaching&rdquo; card with &ldquo;Name and profile to be published once approved&rdquo; / &ldquo;TBA&rdquo; placeholder wording.",
      "After: Ricardo Bessit (Founder and Director) and Kayleen Bessit, listed as &ldquo;Marketing and Communications Head&rdquo;, with her approved biography. All TBA and placeholder wording was removed.",
    ],
    caption: "Figure 9 - Leadership cards (handoff item 5).",
  },
  {
    n: 10,
    img: "10-memberships-summary.jpg",
    title: "Memberships - summary strip updated",
    change: [
      "Before: &ldquo;From R40 per hour &middot; From R399 per month &middot; Proposed pilot rates&rdquo;.",
      "After: &ldquo;From R25 per hour &middot; From R180 per month &middot; Realm Points on every paid hour &middot; 5 hours from R135&rdquo;.",
    ],
    caption: "Figure 10 - Rate summary under the hero (handoff items 1 and 6).",
  },
  {
    n: 11,
    img: "11-memberships-rates.jpg",
    title: "Lounge - owner-confirmed hourly and prepaid rates",
    change: [
      "Before: off-peak R50 &middot; peak R70 &middot; student R40, packs R225 / R400, shown under a &ldquo;Proposed pilot pricing&rdquo; badge.",
      "After: student R25 &middot; walk-in off-peak R30 &middot; walk-in peak R50 per hour, and 5-hour pack R135 (versus R150) / 10-hour pack R250 (versus R300) with the saving shown. The pilot badge is removed.",
    ],
    caption: "Figure 11 - Hourly and prepaid lounge access (handoff item 6).",
  },
  {
    n: 12,
    img: "12-memberships-passes.jpg",
    title: "Memberships - four approved passes",
    change: [
      "Before: Social R399 &middot; Competitive R899 &middot; Pro Pathway R1,999.",
      "After: Social Pass R180 &middot; Social Pass Plus R340 &middot; Competitive Pass R600 &middot; Pro Lounge Pass R1,100, each shown against its walk-in equivalent, in a four-column row. The Institution / School offer is kept, including its capped-credit note.",
    ],
    caption: "Figure 12 - Monthly membership passes (handoff item 6).",
  },
  {
    n: 13,
    img: "13-faq-pricing.jpg",
    title: "FAQ - pricing answers corrected, disclaimers removed",
    change: [
      "Before: &ldquo;Are these final prices? No. Every price on this site is proposed pilot pricing &hellip;&rdquo; and a payment answer quoting R1,500 / R2,200 / R1,800.",
      "After: the &ldquo;Are these final prices?&rdquo; item is deleted; the payment answer lists Beginner R950 &middot; Intermediate R1,200 &middot; Advanced R1,500 &middot; Pro R1,800, all month-to-month. No reply-time promise appears anywhere in the FAQ.",
    ],
    caption: "Figure 13 - FAQ pricing block (handoff item 8).",
  },
  {
    n: 14,
    img: "14-contact-status.jpg",
    title: "Contact - status table and enquiry copy",
    change: [
      "Before: &ldquo;Enrolment opening soon&rdquo;, &ldquo;Pilot pricing published&rdquo;, a &ldquo;Replies within one business day&rdquo; hero badge and reply-time bullet.",
      "After: &ldquo;Month-to-month programmes published&rdquo;, &ldquo;Rates published&rdquo;, updated enquiry cards covering four programmes and four passes, and no response-time claim. Venue wording stays &ldquo;Planned facility north of Johannesburg &mdash; exact location to be confirmed&rdquo;.",
    ],
    caption: "Figure 14 - Where things stand (handoff items 1 and 8).",
  },
  {
    n: 15,
    img: "15-feel-the-action-desktop.jpg",
    title: "Feel the Action - clear landscape imagery (desktop)",
    change: [
      "Before: four narrow 4:5 portrait cards with tight crops where faces and the scene were hard to make out.",
      "After: three larger 4:3 landscape images with centred crops, no aggressive zoom, and descriptive alt text that identifies the imagery as representative rather than venue photography.",
    ],
    caption:
      "Figure 15 - &ldquo;Feel the Action&rdquo; strip at 1440 px desktop width (handoff item 7).",
  },
  {
    n: 16,
    img: "16-feel-the-action-mobile.jpg",
    title: "Feel the Action - clear landscape imagery (mobile)",
    change: [
      "The same three images stack at mobile width; subjects stay visible with no aggressive cropping, matching the acceptance check &ldquo;Feel the Action images are visibly clear at desktop and mobile sizes&rdquo;.",
    ],
    caption:
      "Figure 16 - The strip at a 390 px mobile viewport (handoff item 7).",
  },
];

const itemsHtml = FIGURES.map(
  (f) => `
  <section class="item">
    <h2><span class="num">${f.n}</span>${f.title}</h2>
    <div class="change">
      <p class="label">What was updated here</p>
      <ul>${f.change.map((line) => `<li>${line}</li>`).join("")}</ul>
    </div>
    <figure>
      <img src="${f.img}" alt="${f.caption.replace(/"/g, "&quot;")}">
      <figcaption>${f.caption}</figcaption>
    </figure>
  </section>`,
).join("");

const reportHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Avatars Realm - Website Update Report</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 0;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color: #16161d; background: #fff;
    font-size: 10.5pt; line-height: 1.55;
  }
  .cover { padding-top: 46mm; }
  .brand {
    font-size: 10pt; letter-spacing: .22em; text-transform: uppercase;
    color: #b3121f; font-weight: 700;
  }
  h1 { font-size: 30pt; line-height: 1.15; margin: 10px 0 6px; letter-spacing: -0.01em; }
  .subtitle { font-size: 14pt; color: #444; margin: 0 0 26px; }
  .rule { height: 4px; width: 90px; background: linear-gradient(90deg,#b3121f,#e11225 55%,#f0c419); margin: 22px 0; }
  table.meta { border-collapse: collapse; font-size: 10pt; margin-top: 8px; }
  table.meta td { padding: 5px 14px 5px 0; vertical-align: top; }
  table.meta td:first-child { color: #6b6b74; text-transform: uppercase; letter-spacing: .08em; font-size: 8.5pt; padding-top: 7px; }
  .summary { margin-top: 30px; background: #f5f6fa; border-left: 4px solid #e11225; padding: 14px 18px; }
  .summary h3 { margin: 0 0 8px; font-size: 11pt; }
  .summary ul { margin: 0; padding-left: 18px; }
  .ok { color: #0f7a3d; font-weight: 600; }
  .item { page-break-before: always; padding-top: 4mm; }
  .item:first-of-type { page-break-before: auto; }
  h2 {
    font-size: 15.5pt; margin: 0 0 10px; letter-spacing: -0.01em;
    border-bottom: 1px solid #e6e6ec; padding-bottom: 8px;
  }
  h2 .num {
    display: inline-block; min-width: 26px; height: 26px; line-height: 26px;
    text-align: center; background: #16161d; color: #fff; border-radius: 6px;
    font-size: 10pt; margin-right: 9px; vertical-align: 2px;
  }
  .change { background: #f5f6fa; border-left: 4px solid #f0c419; padding: 10px 16px; margin: 0 0 14px; }
  .change .label { margin: 0 0 6px; font-size: 8.5pt; letter-spacing: .12em; text-transform: uppercase; color: #7a7a85; font-weight: 700; }
  .change ul { margin: 0; padding-left: 17px; }
  .change li { margin-bottom: 5px; }
  .change li:last-child { margin-bottom: 0; }
  figure { margin: 0; page-break-inside: avoid; }
  /* Tall captures (academy list, modal, FAQ list, mobile strip) are scaled
     to fit one A4 page instead of being split across a page break. */
  figure img {
    max-width: 100%; max-height: 185mm; width: auto;
    border: 1px solid #d9d9e1; border-radius: 6px; display: block; margin: 0 auto;
  }
  figcaption { font-size: 9pt; color: #6b6b74; margin-top: 7px; }
  .checks { page-break-before: always; padding-top: 4mm; }
  .checks h3 { font-size: 11.5pt; margin: 20px 0 8px; }
  .checks ul { padding-left: 18px; }
  .checks li { margin-bottom: 7px; }
  .final { margin-top: 22px; background: #16161d; color: #f2f2f5; padding: 16px 20px; border-radius: 8px; }
  .final h3 { margin: 0 0 8px; color: #fff; }
  .final ul { margin: 0; padding-left: 18px; }
</style>
</head>
<body>

<section class="cover">
  <p class="brand">Avatars Realm Esports Academy &amp; Gaming Arena</p>
  <h1>Website Update Report</h1>
  <p class="subtitle">Implementation of the November 2026 Website Change Handoff</p>
  <div class="rule"></div>
  <table class="meta">
    <tr><td>Reviewed</td><td>12 November 2026 handoff &mdash; applied to the site codebase</td></tr>
    <tr><td>Report date</td><td>12 November 2026</td></tr>
    <tr><td>Repository</td><td>https://github.com/osamacreative01-max/Avatars-Realm</td></tr>
    <tr><td>Branch / commit</td><td>main &mdash; 3637980 (handoff changes) and 2ac0ae3 (CTA fix + report tooling), both pushed</td></tr>
    <tr><td>Scope</td><td>Content, navigation, imagery and copy only &mdash; the dark/red/gold theme, responsive behaviour and informational-site scope were preserved.</td></tr>
  </table>

  <div class="summary">
    <h3>Summary of this update</h3>
    <ul>
      <li>Four month-to-month programmes published (Beginner R950 &middot; Intermediate R1,200 &middot; Advanced R1,500 &middot; Pro R1,800), replacing three programmes with pilot-pricing labels, course durations and totals.</li>
      <li>Owner-approved lounge rates, prepaid packs and four membership passes applied.</li>
      <li>Required &ldquo;Programme / competition interest&rdquo; selector added to the interest form; both answers delivered to info@avatarsrealm.co.za.</li>
      <li>About page rewritten: Gen.G partnership story, inclusivity vision and Kayleen Bessit's leadership profile &mdash; exact approved copy, verbatim.</li>
      <li>All pilot-pricing disclaimers, opening/enrolment notices and one-business-day reply promises removed site-wide.</li>
      <li>&ldquo;Feel the Action&rdquo; imagery replaced with three clear landscape photographs (desktop and mobile checked).</li>
      <li>Verification: <span class="ok">typecheck passed &middot; lint passed &middot; production build passed (13/13 pages)</span>, pushed to <strong>origin/main</strong>.</li>
    </ul>
  </div>
</section>

${itemsHtml}

<section class="checks">
  <h2><span class="num">&#10003;</span>Verification and delivery</h2>
  <div class="change">
    <p class="label">Acceptance checks from the handoff</p>
    <ul>
      <li>Academy shows four programmes once, every card labelled month-to-month: Beginner R950 &middot; Intermediate R1,200 &middot; Advanced R1,500 &middot; Pro R1,800. <span class="ok">passed</span></li>
      <li>No course duration, total course price or &ldquo;proposed pilot pricing&rdquo; label remains on public pricing displays. <span class="ok">passed</span></li>
      <li>Home programme cards use the same four prices and month-to-month status. <span class="ok">passed</span></li>
      <li>Interest form captures the programme/competition choice together with one or more games and sends both to info@avatarsrealm.co.za. <span class="ok">passed</span></li>
      <li>About appears immediately after Home in the desktop navigation and the footer. <span class="ok">passed</span></li>
      <li>About describes Gen.G training/curriculum approval, the inclusive-access vision and Kayleen's role; no permission disclaimer or Head of Coaching TBA remains. <span class="ok">passed</span></li>
      <li>Membership hourly rates read R25 student, R30 off-peak, R50 peak; membership prices sit below the equivalent walk-in cost. <span class="ok">passed</span></li>
      <li>No &ldquo;opening programme / membership enrolment to be announced&rdquo; notice and no one-business-day reply promise remains. <span class="ok">passed</span></li>
      <li>Feel the Action images are visibly clear at desktop and mobile sizes. <span class="ok">passed</span></li>
      <li>No booking, payment, CRM, analytics, membership-system or SEO integration was introduced. <span class="ok">passed</span></li>
    </ul>
  </div>

  <h3>Checks run before pushing</h3>
  <ul>
    <li><code>npm run typecheck</code> (tsc --noEmit) &mdash; passed</li>
    <li><code>npm run lint</code> (eslint) &mdash; passed</li>
    <li><code>npm run build</code> (Next.js production build) &mdash; passed, 13/13 pages generated</li>
    <li>Repository-wide word sweeps for &ldquo;pilot&rdquo;, &ldquo;business day&rdquo;, &ldquo;statusLine&rdquo;, &ldquo;Enrolment opening&rdquo;, &ldquo;Head of Coaching&rdquo;, &ldquo;TBA&rdquo; and the old price points &mdash; no public-page matches</li>
  </ul>

  <div class="final">
    <h3>Delivered</h3>
    <ul>
      <li>Committed as <strong>3637980</strong> &mdash; &ldquo;Apply November 2026 handoff: 4 programmes, new rates, Gen.G/About copy, form field, wording cleanup&rdquo; (18 files changed), plus <strong>2ac0ae3</strong> for the membership CTA fit and this report generator.</li>
      <li>Pushed to <strong>origin/main</strong> of https://github.com/osamacreative01-max/Avatars-Realm.</li>
      <li>Venue wording kept as &ldquo;Planned facility north of Johannesburg &mdash; exact location to be confirmed&rdquo;; no Northcliff/Randburg reference or map pin added.</li>
      <li>Still pending from the owner: the approved Advanced programme description, curriculum and entry criteria for the placeholder card.</li>
    </ul>
  </div>
</section>

</body>
</html>`;

await writeFile(HTML_PATH, reportHtml, "utf8");
console.log(`\nReport HTML written to ${HTML_PATH}`);

const pdfBrowser = await chromium.launch({ channel: "chrome", headless: true });
const pdfPage = await pdfBrowser.newPage();
await pdfPage.goto(`file:///${HTML_PATH.replace(/\\/g, "/")}`, {
  waitUntil: "load",
});
await pdfPage.waitForTimeout(500);
await pdfPage.pdf({
  path: PDF_PATH,
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "16mm", left: "12mm", right: "12mm" },
  displayHeaderFooter: true,
  headerTemplate:
    '<div style="font-size:7.5pt;color:#8a8a93;width:100%;padding:0 12mm;font-family:Segoe UI,Arial,sans-serif;">Avatars Realm &mdash; Website Update Report &middot; November 2026 handoff</div>',
  footerTemplate:
    '<div style="font-size:7.5pt;color:#8a8a93;width:100%;padding:0 12mm;font-family:Segoe UI,Arial,sans-serif;display:flex;justify-content:space-between;"><span>github.com/osamacreative01-max/Avatars-Realm &middot; commit 2ac0ae3</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
});
await pdfBrowser.close();

console.log(`PDF written to ${PDF_PATH}`);
if (failures.length) {
  console.log("\nFailed captures:");
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("All screenshots captured.");
}
