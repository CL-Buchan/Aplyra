with ranked as (
	select
		id,
		name,
		min(id) over (partition by name) as keep_id
	from public.company
	where name is not null
)
update public.applications a
set company_id = r.keep_id
from ranked r
where a.company_id = r.id
	and r.id <> r.keep_id;

delete from public.company c
using (
	select id, min(id) over (partition by name) as keep_id
	from public.company
	where name is not null
) d
where c.id = d.id
	and d.id <> d.keep_id;

do $$
begin
	if not exists (
		select 1 from pg_constraint where conname = 'company_name_key'
	) then
		alter table public.company
			add constraint company_name_key unique (name);
	end if;
end $$;

alter table public.company enable row level security;

drop policy if exists "Authenticated can read companies" on public.company;
create policy "Authenticated can read companies"
	on public.company for select
	to authenticated
	using (true);

drop policy if exists "Authenticated can add companies" on public.company;
create policy "Authenticated can add companies"
	on public.company for insert
	to authenticated
	with check (true);

grant select, insert on public.company to authenticated;
grant usage, select on sequence public.company_id_seq to authenticated;
