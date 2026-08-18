alter table public.company
	drop constraint if exists company_id_fkey;

update public.applications
set company_id = null
where company_id is not null
	and not exists (
		select 1 from public.company where company.id = applications.company_id
	);

alter table public.applications
	add constraint applications_company_id_fkey
	foreign key (company_id) references public.company (id);
