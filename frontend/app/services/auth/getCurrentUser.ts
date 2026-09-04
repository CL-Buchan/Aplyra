import { createClient } from '@/app/services/supabase/server';

/**
 * Returns the currently authenticated Supabase user, or `null` if there is no
 * valid session. Safe to call from any Server Component, Server Action or Route
 * Handler — it reads the session from cookies, no HTTP round trip.
 */
export async function getCurrentUser() {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user?.id || user.role !== 'authenticated') return null;

	return user;
}
