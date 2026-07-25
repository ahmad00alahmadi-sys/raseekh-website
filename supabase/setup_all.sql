-- One-shot setup for Raseekh cloud sync.
-- Supabase → SQL → New query → paste this whole file → Run

-- ===== client_requests =====
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
drop policy if exists "raseekh_requests_select_own" on public.client_requests;
drop policy if exists "raseekh_requests_select_admin" on public.client_requests;
drop policy if exists "raseekh_requests_update" on public.client_requests;
drop policy if exists "raseekh_requests_update_admin" on public.client_requests;
create policy "raseekh_requests_insert" on public.client_requests for insert to anon, authenticated with check (true);
create policy "raseekh_requests_select_own" on public.client_requests for select to authenticated using (
  lower(coalesce(email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
);
create policy "raseekh_requests_select_admin" on public.client_requests for select to authenticated using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
create policy "raseekh_requests_update_admin" on public.client_requests for update to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com')
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com');
grant usage on schema public to anon, authenticated;
grant select, insert on table public.client_requests to anon, authenticated;
grant update on table public.client_requests to authenticated;

-- ===== site_settings =====
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "raseekh_settings_public_read" on public.site_settings;
drop policy if exists "raseekh_settings_auth_write" on public.site_settings;
drop policy if exists "raseekh_settings_auth_update" on public.site_settings;
drop policy if exists "raseekh_settings_admin_write" on public.site_settings;
drop policy if exists "raseekh_settings_admin_update" on public.site_settings;
create policy "raseekh_settings_public_read" on public.site_settings for select to anon, authenticated using (key = 'public_notify');
create policy "raseekh_settings_admin_write" on public.site_settings for insert to authenticated with check (
  key = 'public_notify' and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
create policy "raseekh_settings_admin_update" on public.site_settings for update to authenticated
  using (key = 'public_notify' and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com')
  with check (key = 'public_notify' and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com');
grant select on table public.site_settings to anon, authenticated;
grant insert, update on table public.site_settings to authenticated;

-- ===== user_activity =====
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
drop policy if exists "raseekh_activity_insert_own" on public.user_activity;
drop policy if exists "raseekh_activity_update_own" on public.user_activity;
drop policy if exists "raseekh_activity_select_own" on public.user_activity;
drop policy if exists "raseekh_activity_select_admin" on public.user_activity;
create policy "raseekh_activity_insert_own" on public.user_activity for insert to authenticated with check (
  lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
);
create policy "raseekh_activity_update_own" on public.user_activity for update to authenticated
  using (
    lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
  )
  with check (
    lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
  );
create policy "raseekh_activity_select_own" on public.user_activity for select to authenticated using (
  lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
);
create policy "raseekh_activity_select_admin" on public.user_activity for select to authenticated using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
grant select, insert, update on table public.user_activity to authenticated;

-- ===== terms_acceptance =====
create table if not exists public.terms_acceptance (
  user_key text primary key,
  user_id text default '',
  email text default '',
  version text not null,
  accepted_at timestamptz default now()
);
alter table public.terms_acceptance enable row level security;
drop policy if exists "raseekh_terms_select_own" on public.terms_acceptance;
drop policy if exists "raseekh_terms_upsert_own" on public.terms_acceptance;
drop policy if exists "raseekh_terms_update_own" on public.terms_acceptance;
create policy "raseekh_terms_select_own" on public.terms_acceptance for select to authenticated using (
  lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
);
create policy "raseekh_terms_upsert_own" on public.terms_acceptance for insert to authenticated with check (
  lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
);
create policy "raseekh_terms_update_own" on public.terms_acceptance for update to authenticated
  using (
    lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
  )
  with check (
    lower(coalesce(email, user_key, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
  );
grant select, insert, update on table public.terms_acceptance to authenticated;
