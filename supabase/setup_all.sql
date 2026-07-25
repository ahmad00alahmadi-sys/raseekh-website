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
create unique index if not exists client_requests_fingerprint_uidx on public.client_requests (fingerprint)
  where coalesce(fingerprint, '') <> '';
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
create policy "raseekh_settings_public_read" on public.site_settings for select to anon, authenticated using (
  key in ('public_notify', 'public_catalog')
);
create policy "raseekh_settings_admin_write" on public.site_settings for insert to authenticated with check (
  key in ('public_notify', 'public_catalog')
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
create policy "raseekh_settings_admin_update" on public.site_settings for update to authenticated
  using (
    key in ('public_notify', 'public_catalog')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  )
  with check (
    key in ('public_notify', 'public_catalog')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  );
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

-- ===== profiles =====
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text default '',
  phone text default '',
  email text default '',
  updated_at timestamptz default now()
);
alter table public.profiles add column if not exists company text default '';
alter table public.profiles enable row level security;
drop policy if exists "raseekh_profiles_select_own" on public.profiles;
drop policy if exists "raseekh_profiles_upsert_own" on public.profiles;
drop policy if exists "raseekh_profiles_update_own" on public.profiles;
drop policy if exists "raseekh_profiles_select_admin" on public.profiles;
create policy "raseekh_profiles_select_own" on public.profiles for select to authenticated using (
  id = auth.uid()
);
create policy "raseekh_profiles_upsert_own" on public.profiles for insert to authenticated with check (
  id = auth.uid()
);
create policy "raseekh_profiles_update_own" on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());
create policy "raseekh_profiles_select_admin" on public.profiles for select to authenticated using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
grant select, insert, update on table public.profiles to authenticated;

-- ===== payments =====
create table if not exists public.payments (
  id text primary key,
  created_at timestamptz not null default now(),
  method text default 'card',
  total numeric default 0,
  items integer default 1,
  note text default '',
  name text default '',
  email text default '',
  user_id text default '',
  source text default 'site',
  payment_id text default '',
  fingerprint text default '',
  payload jsonb default '{}'::jsonb
);
create index if not exists payments_created_at_idx on public.payments (created_at desc);
create unique index if not exists payments_payment_id_uidx on public.payments (payment_id)
  where coalesce(payment_id, '') <> '';
create unique index if not exists payments_fingerprint_uidx on public.payments (fingerprint)
  where coalesce(fingerprint, '') <> '';
alter table public.payments enable row level security;
drop policy if exists "raseekh_payments_insert" on public.payments;
drop policy if exists "raseekh_payments_select_own" on public.payments;
drop policy if exists "raseekh_payments_select_admin" on public.payments;
-- Pay page requires sign-in — never allow anonymous forged payment rows.
create policy "raseekh_payments_insert" on public.payments for insert to authenticated with check (
  coalesce(user_id, '') = coalesce(auth.uid()::text, '')
  or lower(coalesce(email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
);
drop policy if exists "raseekh_payments_insert_admin" on public.payments;
create policy "raseekh_payments_insert_admin" on public.payments for insert to authenticated with check (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
create policy "raseekh_payments_select_own" on public.payments for select to authenticated using (
  lower(coalesce(email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or coalesce(user_id, '') = coalesce(auth.uid()::text, '')
);
create policy "raseekh_payments_select_admin" on public.payments for select to authenticated using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
revoke all on table public.payments from anon;
grant select, insert on table public.payments to authenticated;
