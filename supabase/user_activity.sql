-- Optional: run in Supabase SQL Editor for cross-device login/active stats.

create table if not exists public.user_activity (
  user_key text primary key,
  user_id text default '',
  email text default '',
  name text default '',
  role text default 'client',
  first_login_at timestamptz,
  last_login_at timestamptz,
  last_seen_at timestamptz,
  login_count integer default 0,
  updated_at timestamptz default now()
);

alter table public.user_activity enable row level security;

drop policy if exists "raseekh_activity_upsert" on public.user_activity;
drop policy if exists "raseekh_activity_update" on public.user_activity;
drop policy if exists "raseekh_activity_select" on public.user_activity;

create policy "raseekh_activity_upsert"
  on public.user_activity for insert
  to authenticated
  with check (true);

create policy "raseekh_activity_update"
  on public.user_activity for update
  to authenticated
  using (true)
  with check (true);

create policy "raseekh_activity_select"
  on public.user_activity for select
  to authenticated
  using (true);
