-- Anonymous site visitor counter (owner dashboard only).
-- Safe to re-run. Prefer setup_all.sql for full installs.

create table if not exists public.site_visits (
  id text primary key default 'global',
  total bigint not null default 0,
  today_count bigint not null default 0,
  today_key text not null default '',
  updated_at timestamptz default now()
);
insert into public.site_visits (id, total, today_count, today_key)
values ('global', 0, 0, to_char((now() at time zone 'Asia/Riyadh'), 'YYYY-MM-DD'))
on conflict (id) do nothing;
alter table public.site_visits enable row level security;
drop policy if exists "raseekh_visits_select_admin" on public.site_visits;
create policy "raseekh_visits_select_admin" on public.site_visits for select to authenticated using (
  lower(coalesce(auth.jwt() ->> 'email', '')) = 'ahmad00alahmadi@gmail.com'
);
grant select on table public.site_visits to authenticated;
revoke all on table public.site_visits from anon;

create or replace function public.raseekh_bump_visit()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  d text := to_char((now() at time zone 'Asia/Riyadh'), 'YYYY-MM-DD');
begin
  insert into public.site_visits (id, total, today_count, today_key, updated_at)
  values ('global', 1, 1, d, now())
  on conflict (id) do update set
    total = public.site_visits.total + 1,
    today_count = case
      when public.site_visits.today_key = d then public.site_visits.today_count + 1
      else 1
    end,
    today_key = d,
    updated_at = now();
end;
$$;
revoke all on function public.raseekh_bump_visit() from public;
grant execute on function public.raseekh_bump_visit() to anon, authenticated;
