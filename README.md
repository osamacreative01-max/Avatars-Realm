# Avatars Realm website

Marketing site for Avatars Realm Esports Academy & Gaming Arena, built with
Next.js (App Router) and Tailwind CSS.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Node.js 20.9 or newer is required.

## Environment variables

The contact and interest forms deliver enquiries through Web3Forms. Create a
`.env.local` file in the project root (never committed) with:

```
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

The same variable must be added to the hosting provider's environment settings
before the forms will send. Without it the forms show a friendly "sending is
temporarily unavailable" message and log the missing key on the server.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

The site uses server routes (`/api/contact`, `/api/interest`), so it needs a
Node-capable host — Vercel or Netlify are the simplest options. A static host
cannot run the form endpoints.

1. Import this repository into the hosting provider.
2. Set `WEB3FORMS_ACCESS_KEY` in the project's environment variables.
3. Deploy, then test both forms on the deployed URL.
4. Point the domain's DNS at the host. The current `avatarsrealm.co.za` site is
   a GoDaddy Website Builder site, so the DNS records must be updated in the
   GoDaddy account that owns the domain.

## Structure

- `app/` — routes, layout, global styles and the two form API routes
- `components/` — shared UI
- `lib/content.ts` — all page copy and programme/event data
- `lib/site.ts` — site name, contact details, navigation and opening hours
- `public/` — images, logo and the downloadable brochure
