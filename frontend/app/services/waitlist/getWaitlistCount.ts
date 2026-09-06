import { WAITLIST_COUNT_FALLBACK } from '@/app/config/site';

export async function getWaitlistCount(): Promise<number> {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

	if (!url || !key) return WAITLIST_COUNT_FALLBACK;

	try {
		const res = await fetch(`${url}/rest/v1/waitlist?select=email`, {
			method: 'HEAD',
			headers: {
				apikey: key,
				Authorization: `Bearer ${key}`,
				Prefer: 'count=exact',
				Range: '0-0',
			},
			next: { revalidate: 600 },
		});

		const total = res.headers.get('content-range')?.split('/').at(-1);
		const parsed = total ? Number(total) : NaN;

		return Number.isFinite(parsed) && parsed > 0
			? parsed
			: WAITLIST_COUNT_FALLBACK;
	} catch {
		return WAITLIST_COUNT_FALLBACK;
	}
}
