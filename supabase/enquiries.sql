-- Avatars Realm — enquiries table
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
--
-- Every contact-form and "I'm Interested, Game On!" submission is stored here
-- by the website's API routes, and the /admin dashboard reads it back.

create table if not exists public.enquiries (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  form        text not null check (form in ('contact', 'interest')),
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'closed')),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,     -- contact form: chosen subject
  programme   text,     -- interest form: programme / competition
  games       text,     -- interest form: games, comma separated
  message     text,     -- contact form: the visitor's message
  page        text      -- page the form was sent from
);

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);

-- Row Level Security on, with no policies: the public (anon) key can neither
-- read nor write this table. The website uses the service-role key on the
-- server only, which bypasses RLS.
alter table public.enquiries enable row level security;
