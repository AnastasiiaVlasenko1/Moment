-- Monthly Review Builder — database schema, privacy rules, and screenshot storage.
--
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste this whole
-- file → Run. Safe to re-run (uses IF NOT EXISTS / idempotent policy drops).
--
-- What it creates:
--   • projects table + moments table (mirroring src/types/review.ts)
--   • Row Level Security so each signed-in user sees ONLY their own rows
--   • a private "screenshots" storage bucket + owner-only access rules

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.projects (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  name       text not null,
  color      text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.moments (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  text       text not null default '',
  url        text,
  image_path text,                        -- path in the "screenshots" bucket (replaces old IndexedDB imageId)
  project_id uuid references public.projects (id) on delete set null,  -- matches unassignProject behavior
  category   text not null check (category in ('interesting','challenge','achievement','learning','mood')),
  date       date not null,               -- the day the moment is filed under ("yyyy-mm-dd")
  created_at timestamptz not null default now()
);

-- Helpful indexes for the queries the app makes (by owner, by month/date).
create index if not exists moments_user_date_idx on public.moments (user_id, date);
create index if not exists projects_user_idx on public.projects (user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: "you may only touch your own rows"
-- ---------------------------------------------------------------------------

alter table public.projects enable row level security;
alter table public.moments  enable row level security;

drop policy if exists "own projects" on public.projects;
create policy "own projects" on public.projects
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "own moments" on public.moments;
create policy "own moments" on public.moments
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Screenshot storage (private bucket; files live under a per-user folder)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('screenshots', 'screenshots', false)
on conflict (id) do nothing;

-- Files are stored as "<user_id>/<filename>", so the first path segment must
-- equal the caller's id. This gives each user a private folder.
drop policy if exists "own screenshots read"   on storage.objects;
drop policy if exists "own screenshots write"  on storage.objects;
drop policy if exists "own screenshots delete" on storage.objects;

create policy "own screenshots read" on storage.objects
  for select using (
    bucket_id = 'screenshots' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "own screenshots write" on storage.objects
  for insert with check (
    bucket_id = 'screenshots' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "own screenshots delete" on storage.objects
  for delete using (
    bucket_id = 'screenshots' and (storage.foldername(name))[1] = auth.uid()::text
  );
