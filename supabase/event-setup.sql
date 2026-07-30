-- ============================================================================
-- NarraNexus /event page — Supabase schema
-- ----------------------------------------------------------------------------
-- Run once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
--
-- Security model: the page uses the public publishable key (anon role) directly
-- from the browser. RLS grants anon INSERT ONLY — participants can submit but
-- cannot read anyone's data (including their own). You review submissions in the
-- Supabase Dashboard (Table Editor / Storage). Identity is a self-reported
-- nickname + a client-generated participant_id stored in the browser.
-- ============================================================================

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.event_checkins (
  id             uuid primary key default gen_random_uuid(),
  participant_id uuid not null,
  nickname       text not null,
  contact        text,
  created_at     timestamptz not null default now()
);

create table if not exists public.event_task_submissions (
  id             uuid primary key default gen_random_uuid(),
  participant_id uuid not null,
  nickname       text not null,
  task_number    int  not null check (task_number between 1 and 6),
  content        text,
  image_urls     text[] not null default '{}',
  created_at     timestamptz not null default now()
);

create table if not exists public.event_feedback (
  id             uuid primary key default gen_random_uuid(),
  participant_id uuid not null,
  nickname       text not null,
  content        text,
  image_urls     text[] not null default '{}',
  created_at     timestamptz not null default now()
);

-- ── Row Level Security: INSERT-only for the anon (publishable-key) role ───────

alter table public.event_checkins         enable row level security;
alter table public.event_task_submissions enable row level security;
alter table public.event_feedback         enable row level security;

drop policy if exists "anon insert checkins" on public.event_checkins;
create policy "anon insert checkins"
  on public.event_checkins for insert to anon with check (true);

drop policy if exists "anon insert task submissions" on public.event_task_submissions;
create policy "anon insert task submissions"
  on public.event_task_submissions for insert to anon with check (true);

drop policy if exists "anon insert feedback" on public.event_feedback;
create policy "anon insert feedback"
  on public.event_feedback for insert to anon with check (true);

-- ── Storage bucket for task / feedback images ────────────────────────────────

insert into storage.buckets (id, name, public)
values ('event-uploads', 'event-uploads', true)
on conflict (id) do nothing;

-- anon may upload into the bucket, and the bucket is public-read so the stored
-- public URLs resolve.
drop policy if exists "anon upload event images" on storage.objects;
create policy "anon upload event images"
  on storage.objects for insert to anon
  with check (bucket_id = 'event-uploads');

drop policy if exists "public read event images" on storage.objects;
create policy "public read event images"
  on storage.objects for select to anon
  using (bucket_id = 'event-uploads');
