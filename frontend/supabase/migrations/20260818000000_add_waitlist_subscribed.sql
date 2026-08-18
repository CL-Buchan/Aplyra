alter table public.waitlist
	add column if not exists subscribed boolean not null default true;
