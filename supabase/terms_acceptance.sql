-- Optional: run in Supabase SQL Editor so terms acceptance syncs across devices.

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

create policy "raseekh_terms_select_own"
  on public.terms_acceptance for select
  to authenticated
  using (true);

create policy "raseekh_terms_upsert_own"
  on public.terms_acceptance for insert
  to authenticated
  with check (true);

create policy "raseekh_terms_update_own"
  on public.terms_acceptance for update
  to authenticated
  using (true)
  with check (true);
