-- Run in Supabase SQL Editor so notify email/webhook stay admin-only,
-- while catalog / testimonials / public WhatsApp stay readable by visitors.

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
drop policy if exists "raseekh_settings_admin_read_notify" on public.site_settings;

-- Safe public keys only (no notify email / webhook secrets).
create policy "raseekh_settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (key in ('public_catalog', 'public_testimonials', 'public_contact'));

-- Notify secrets: owner JWT only (never anon).
create policy "raseekh_settings_admin_read_notify"
  on public.site_settings for select
  to authenticated
  using (
    key = 'public_notify'
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  );

create policy "raseekh_settings_admin_write"
  on public.site_settings for insert
  to authenticated
  with check (
    key in ('public_notify', 'public_catalog', 'public_testimonials', 'public_contact')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  );

create policy "raseekh_settings_admin_update"
  on public.site_settings for update
  to authenticated
  using (
    key in ('public_notify', 'public_catalog', 'public_testimonials', 'public_contact')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  )
  with check (
    key in ('public_notify', 'public_catalog', 'public_testimonials', 'public_contact')
    and lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
  );

-- Migrate WhatsApp (public business number) out of the secret notify blob when present.
insert into public.site_settings (key, value, updated_at)
select
  'public_contact',
  jsonb_build_object('whatsapp', coalesce(value->>'whatsapp', value->>'phone', '')),
  now()
from public.site_settings
where key = 'public_notify'
  and coalesce(nullif(value->>'whatsapp', ''), nullif(value->>'phone', '')) is not null
on conflict (key) do update
  set value = excluded.value,
      updated_at = excluded.updated_at
where coalesce(public.site_settings.value->>'whatsapp', '') = '';

grant usage on schema public to anon, authenticated;
grant select on table public.site_settings to anon, authenticated;
grant insert, update on table public.site_settings to authenticated;
