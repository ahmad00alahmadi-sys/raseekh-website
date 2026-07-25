-- Run in Supabase SQL Editor so notify email/webhook and public catalog sync across browsers.

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

-- Public visitors need notify config + published catalog.
create policy "raseekh_settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (key in ('public_notify', 'public_catalog'));

create policy "raseekh_settings_admin_write"
  on public.site_settings for insert
  to authenticated
  with check (
    key in ('public_notify', 'public_catalog')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  );

create policy "raseekh_settings_admin_update"
  on public.site_settings for update
  to authenticated
  using (
    key in ('public_notify', 'public_catalog')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  )
  with check (
    key in ('public_notify', 'public_catalog')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  );

grant usage on schema public to anon, authenticated;
grant select on table public.site_settings to anon, authenticated;
grant insert, update on table public.site_settings to authenticated;
