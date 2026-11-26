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

The contact and interest forms deliver enquiries through Web3Forms. The API
routes (`/api/contact`, `/api/interest`) validate and rate-limit each enquiry
and return the ready-made submission; the visitor's browser then sends it to
Web3Forms, because Web3Forms blocks server-to-server requests.

The Web3Forms access key is a public form identifier and ships in
`lib/web3forms.ts`, so no hosting setup is needed. To send to a different
Web3Forms inbox, set `WEB3FORMS_ACCESS_KEY` in `.env.local` or the hosting
provider's environment settings; it overrides the built-in key.

## Enquiries dashboard (Supabase)

Every valid contact and "I'm Interested, Game On!" submission is also saved
to a Supabase table, and the team can view, filter, mark and export them at
`/admin/`.

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard open **SQL Editor**, paste
   `supabase/enquiries.sql` and run it once.
3. From **Project Settings → API**, copy the Project URL and the
   `service_role` key.
4. Add these environment variables in Vercel (and `.env.local` for local
   development), then redeploy:

   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ADMIN_PASSWORD=choose-a-strong-password
   ```

5. Open `/admin/`, sign in with `ADMIN_PASSWORD`, and use **Download
   spreadsheet (CSV)** to open the enquiries in Excel or Google Sheets.

The service-role key bypasses Row Level Security, so it lives only in server
environment variables. Without the Supabase variables, the forms still email
every enquiry; they just are not stored.

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
2. (Optional) Set `WEB3FORMS_ACCESS_KEY` to override the built-in key.
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
