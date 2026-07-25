-- Run once in Supabase SQL Editor so client quote requests sync across devices.
-- Dashboard → SQL → New query → paste → Run

create table if not exists public.client_requests (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  name text default '',
  phone text default '',
  email text default '',
  company text default '',
  title text default '',
  message text default '',
  type text default 'site',
  source text default 'site',
  status text not null default 'new',
  user_id text default '',
  fingerprint text default '',
  payload jsonb default '{}'::jsonb
);

create index if not exists client_requests_created_at_idx on public.client_requests (created_at desc);
create index if not exists client_requests_status_idx on public.client_requests (status);

alter table public.client_requests enable row level security;

drop policy if exists "raseekh_requests_insert" on public.client_requests;
drop policy if exists "raseekh_requests_select" on public.client_requests;
drop policy if exists "raseekh_requests_update" on public.client_requests;

-- Public quote form can create rows
create policy "raseekh_requests_insert"
  on public.client_requests for insert
  to anon, authenticated
  with check (true);

-- Signed-in admin/client can read (admin sees all; tighten later with roles if needed)
create policy "raseekh_requests_select"
  on public.client_requests for select
  to authenticated
  using (true);

-- Signed-in users can update status
create policy "raseekh_requests_update"
  on public.client_requests for update
  to authenticated
  using (true)
  with check (true);
